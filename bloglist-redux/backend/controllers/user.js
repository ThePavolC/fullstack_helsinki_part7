const userRouter = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

userRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs", {
    url: 1,
    title: 1,
    author: 1,
    id: 1,
  });
  response.json(users.map((user) => user.toJSON()));
});

userRouter.post("/", async (request, response) => {
  const { username, name, password } = request.body;
  if (username === undefined && name === undefined && password === undefined) {
    return response.status(400).end();
  }

  if (password.length < 3) {
    return response
      .status(400)
      .json({ error: "Password must be more than 3 characters." })
      .end();
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    password: passwordHash,
  });

  const newUser = await user.save();
  response.status(201).json(newUser);
});

userRouter.delete("/:id", async (request, response) => {
  await User.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

module.exports = userRouter;
