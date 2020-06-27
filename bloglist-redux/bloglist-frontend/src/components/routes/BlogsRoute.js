import React from "react";

import AddBlogForm from "../AddBlogForm";
import Toggable from "../Toggable";
import BlogList from "../BlogList";

const BlogsRoute = () => (
  <>
    <Toggable buttonLabel="new blog">
      <AddBlogForm />
    </Toggable>
    <BlogList />
  </>
);
export default BlogsRoute;
