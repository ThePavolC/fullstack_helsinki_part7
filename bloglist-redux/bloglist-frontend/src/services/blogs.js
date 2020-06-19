import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  //sort by likes
  response.data.sort((aBlog, bBlog) => bBlog.likes - aBlog.likes);

  return response.data;
};

const addBlog = async (content) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, content, config);
  return response.data;
};

const addLike = async (blog) => {
  const config = {
    headers: { Authorization: token },
  };
  const { id, likes } = blog;
  const content = { ...blog, likes: likes + 1 };

  const response = await axios.put(`${baseUrl}/${id}`, content, config);
  return response.data;
};

const removeBlog = async (blog) => {
  const config = {
    headers: { Authorization: token },
  };
  const { id } = blog;

  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response.data;
};

export default { getAll, addBlog, setToken, addLike, removeBlog };
