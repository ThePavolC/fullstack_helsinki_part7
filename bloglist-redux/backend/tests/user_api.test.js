const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const User = require("../models/user");
const helper = require("./test_helper.js");

const api = supertest(app);

beforeEach(async () => {
  await User.deleteMany({});

  const userObjects = helper.initialUsers.map((user) => new User(user));
  const promiseArray = userObjects.map((user) => user.save());

  await Promise.all(promiseArray);
});

describe("getting a user", () => {
  test("users are returned as json", async () => {
    await api
      .get("/api/users")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("there are all users", async () => {
    const response = await api.get("/api/users");
    expect(response.body).toHaveLength(helper.initialUsers.length);
  });
});

describe("adding a user blog", () => {
  test("a valid user can be added", async () => {
    const newUser = {
      name: "Dave",
      username: "DaveO",
      password: "dude",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const allUsers = await helper.usersInDb();
    expect(allUsers).toHaveLength(helper.initialUsers.length + 1);

    const names = allUsers.map((n) => n.name);
    const usernames = allUsers.map((n) => n.username);
    expect(names).toContain(newUser.name);
    expect(usernames).toContain(newUser.username);
  });

  test("username must be at least 3 characters", async () => {
    const failUser = {
      name: "name",
      username: "12",
      password: "pass",
    };

    await api
      .post("/api/users")
      .send(failUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    const allUsers = await helper.usersInDb();
    expect(allUsers).toHaveLength(helper.initialUsers.length);
  });

  test("password must be at least 3 characters", async () => {
    const failUser = {
      name: "name",
      username: "username",
      password: "pa",
    };

    await api
      .post("/api/users")
      .send(failUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    const allUsers = await helper.usersInDb();
    expect(allUsers).toHaveLength(helper.initialUsers.length);
  });
});

describe("deleting a user", () => {
  test("deletes the first user", async () => {
    let users = await helper.usersInDb();
    const firstUser = users[0];

    await api.delete(`/api/users/${firstUser.id}`).expect(204);

    users = await helper.usersInDb();
    const userIds = users.map((user) => user.id);
    expect(userIds).not.toContain(firstUser.id);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
