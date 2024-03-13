const Post = require("../models/posts");

const getPosts = async (req, res) => {
  try {
    const findPosts = await Post.find();
    res.status(200).json(findPosts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};


module.exports = { getPosts };
