const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
// const postData = require("./postData.json");
const Post = require("./models/posts.js");
const fs  = require("fs")
const postsData = JSON.parse(fs.readFileSync('./postData.json', 'utf8')); 

const app = express();
const PORT = process.env.PORT || 3001;



app.use(cors());
app.use(express.json());

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log("ERR: ",err);
    throw err;
  }
})();
console.log(process.env.MONGO_URI);


// insert data to database
const insertData = async () => {
  try {
    const existingPosts = await Post.find();
    
    if (existingPosts.length === 0) {
      const createPosts = await Post.insertMany(postsData.posts);
      console.log('Post insertion successful');
      res.status(201).send("Post insertion successful");
    } else {
      console.log('Data already exists in the database. No insertion needed.');
    }
  } catch (error) {
    console.error('Data insertion error:', error);
  }
};
insertData();


// routes import
const userRouter = require("./routes/user.routes.js")
const postsRouter = require("./routes/post.routes.js")


//routes
app.use("/", userRouter);
app.use("/", postsRouter);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
