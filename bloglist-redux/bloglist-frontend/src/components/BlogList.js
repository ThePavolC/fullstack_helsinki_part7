import React from "react";
import { useSelector } from "react-redux";

import BlogListItem from "./BlogListItem";

const BlogList = () => {
  const blogs = useSelector(({ blogs }) => blogs);

  return (
    <div id="blogsContainer">
      {blogs.map((blog) => (
        <BlogListItem key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default BlogList;
