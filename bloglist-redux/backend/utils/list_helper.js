const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes;
  };
  return blogs.reduce(reducer, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }

  blogs.sort((firstEl, secondEl) => (firstEl.likes < secondEl.likes ? 1 : -1));

  const { title, author, likes } = blogs[0];
  return {
    title,
    author,
    likes,
  };
};

const mostBlogs = (blogs) => {
  const blogCounter = {};
  for (var blog of blogs) {
    const { author } = blog;
    if (blogCounter.hasOwnProperty(author)) {
      blogCounter[author] = blogCounter[author] + 1;
    } else {
      blogCounter[author] = 1;
    }
  }

  const mostBlogsCount = Math.max(...Object.values(blogCounter));
  const result = Object.entries(blogCounter).find(
    ([author, count]) => count === mostBlogsCount
  );

  const [resultAuthor, resultCount] = result;

  return {
    author: resultAuthor,
    blogs: resultCount,
  };
};

const mostLikes = (blogs) => {
  const likesCounter = {};
  for (var blog of blogs) {
    const { author, likes } = blog;
    if (likesCounter.hasOwnProperty(author)) {
      likesCounter[author] = likesCounter[author] + likes;
    } else {
      likesCounter[author] = likes;
    }
  }

  const mostLikesCount = Math.max(...Object.values(likesCounter));
  const result = Object.entries(likesCounter).find(
    ([author, count]) => count === mostLikesCount
  );

  const [resultAuthor, resultCount] = result;

  return {
    author: resultAuthor,
    likes: resultCount,
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
