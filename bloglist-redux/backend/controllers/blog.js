const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const getDecodedToken = (request) => {
  const ERROR_MSG = "token missing or invalid";
  if (!request.token) {
    throw ERROR_MSG;
  }

  let decodedToken = undefined;
  try {
    decodedToken = jwt.verify(request.token, process.env.SECRET);
  } catch (error) {
    throw ERROR_MSG;
  }

  if (!decodedToken.id) {
    throw ERROR_MSG;
  }

  return decodedToken;
};

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", {
    username: 1,
    name: 1,
    id: 1,
  });
  response.json(blogs.map((blog) => blog.toJSON()));
});

blogRouter.post("/", async (request, response) => {
  let decodedToken = undefined;
  try {
    decodedToken = getDecodedToken(request);
  } catch (error) {
    return response.status(401).json({ error });
  }

  const { title, url } = request.body;
  if (title === undefined && url === undefined) {
    return response.status(400).end();
  }

  const user = await User.findById(decodedToken.id);
  if (!user) {
    return response.status(400).json({ error: "Invalid user" }).end();
  }
  const newBlogData = { ...request.body, user: user._id };
  const blog = new Blog(newBlogData);
  const newBlog = await blog.save();

  user.blogs = user.blogs.concat(newBlog._id);
  await user.save();

  response.status(201).json(newBlog);
});

blogRouter.delete("/:id", async (request, response) => {
  let decodedToken = undefined;
  try {
    decodedToken = getDecodedToken(request);
  } catch (error) {
    return response.status(401).json({ error });
  }

  const blog = await Blog.findById(request.params.id);
  if (!blog) {
    return response.status(404).end();
  }

  if (decodedToken.id === blog.user.toString()) {
    await blog.delete();
  } else {
    return response.status(400).json({ error: "User is not an author." }).end();
  }

  response.status(204).end();
});

blogRouter.put("/:id", async (request, response) => {
  const { likes, title, author, url } = request.body;
  if (
    likes === undefined &&
    title === undefined &&
    author === undefined &&
    url === undefined
  ) {
    return response.status(400).end();
  }

  const newBlog = {
    author,
    title,
    url,
    likes,
  };
  // removing all undefined values
  const cleanedNewBlog = JSON.parse(JSON.stringify(newBlog));

  const newBlogObject = await Blog.findByIdAndUpdate(
    request.params.id,
    cleanedNewBlog,
    { new: true }
  );

  if (newBlogObject) {
    response.json(newBlogObject.toJSON());
  } else {
    response.status(400).end();
  }
});

module.exports = blogRouter;
