import React from "react";
import { useSelector } from "react-redux";

import Blog from "./Blog";

const BlogList = () => {
  const blogs = useSelector(({ blogs }) => blogs);

  return (
    <div id="blogsContainer">
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default BlogList;
