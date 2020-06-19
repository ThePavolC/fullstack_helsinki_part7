const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const User = require("../models/user");
const helper = require("./test_helper.js");

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
  const blogPromiseArray = blogObjects.map((blog) => blog.save());

  await Promise.all(blogPromiseArray);

  await User.deleteMany({});

  const userObjects = helper.initialUsers.map((user) => new User(user));
  const userPromiseArray = userObjects.map((user) => user.save());

  await Promise.all(userPromiseArray);
});

describe("getting a blog", () => {
  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("there are all blogs", async () => {
    const response = await api.get("/api/blogs");
    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });

  test("test unique identifier is named id", async () => {
    const blogs = await helper.blogsInDb();
    const firstBlog = blogs[0];
    expect(firstBlog.id).toBeDefined();
  });
});

describe("adding a new blog", () => {
  test("a valid blog can be added", async () => {
    const newBlog = {
      title: "test blog",
      author: "pavol",
      url: "/blog/url",
      likes: 10,
    };
    const users = await helper.usersInDb();
    const firstUser = users[0];
    const userToken = helper.getUserToken(firstUser.username, firstUser.id);

    await api
      .post("/api/blogs")
      .set("Authorization", `bearer ${userToken}`)
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const allBlogs = await helper.blogsInDb();
    expect(allBlogs).toHaveLength(helper.initialBlogs.length + 1);

    const titles = allBlogs.map((n) => n.title);
    const authors = allBlogs.map((n) => n.author);
    expect(titles).toContain("test blog");
    expect(authors).toContain("pavol");
  });

  test("default value for likes is 0", async () => {
    const newBlog = {
      title: "test blog",
      author: "pavol",
      url: "/blog/url",
    };

    const users = await helper.usersInDb();
    const firstUser = users[0];
    const userToken = helper.getUserToken(firstUser.username, firstUser.id);

    const newBlogRecord = await api
      .post("/api/blogs")
      .set("Authorization", `bearer ${userToken}`)
      .send(newBlog);
    expect(newBlogRecord.body.likes).toBe(0);
  });

  test("returns 400 when title and url missing in POST", async () => {
    const newBlog = {
      author: "pavol",
    };

    const users = await helper.usersInDb();
    const firstUser = users[0];
    const userToken = helper.getUserToken(firstUser.username, firstUser.id);

    await api
      .post("/api/blogs")
      .set("Authorization", `bearer ${userToken}`)
      .send(newBlog)
      .expect(400);
  });

  test("returns 401 when no token", async () => {
    const newBlog = {
      author: "pavol",
    };

    await api.post("/api/blogs").send(newBlog).expect(401);
  });
});

describe("deleting a blog", () => {
  test("deletes the first blog", async () => {
    let blogs = await helper.blogsInDb();
    const firstBlog = blogs[0];

    let users = await helper.usersInDb();
    const firstUser = users[0];

    await Blog.findByIdAndUpdate(firstBlog.id, { user: firstUser.id });

    const userToken = helper.getUserToken(firstUser.username, firstUser.id);

    await api
      .delete(`/api/blogs/${firstBlog.id}`)
      .set("Authorization", `bearer ${userToken}`)
      .expect(204);

    blogs = await helper.blogsInDb();
    const blogIds = blogs.map((blog) => blog.id);
    expect(blogIds).not.toContain(firstBlog.id);
  });
});

describe("updating a blog", () => {
  test("updates likes for a blog", async () => {
    let blogs = await helper.blogsInDb();
    const firstBlog = blogs[0];

    const updatedBlog = await api
      .put(`/api/blogs/${firstBlog.id}`)
      .send({ likes: 1234 })
      .expect(200);

    expect(updatedBlog.body.likes).toBe(1234);
  });

  test("updates title for a blog", async () => {
    let blogs = await helper.blogsInDb();
    const firstBlog = blogs[0];

    const updatedBlog = await api
      .put(`/api/blogs/${firstBlog.id}`)
      .send({ title: "some lovely new title" })
      .expect(200);

    expect(updatedBlog.body.title).toBe("some lovely new title");
  });
});

afterAll(() => {
  mongoose.connection.close();
});
