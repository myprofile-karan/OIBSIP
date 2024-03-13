const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  const { username, password } = req.body;

  const salt = bcrypt.genSaltSync(10);
  const hashPassword = await bcrypt.hashSync(password, salt);

  try {
    //check if user alredy existed

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res
        .status(409)
        .json({ error: "User with this username already exists" });
    }

    //create user and save
    const newUser = await User.create({
      username: username,
      password: hashPassword,
    });

    //generate a TOken for user and send it
    const token = jwt.sign(
      { id: newUser._id, username: newUser.username },
      process.env.SECRET_KEY,
      { expiresIn: "2h" }
    );
    newUser.token = token;
    await newUser.save();
    console.log(newUser);
    console.log(token);

    res.status(201).json({ message: "User created successfully", newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!(username && password)) {
      res.status(400).send("please send all fields");
    }

    // find user in DataBase and check user if exist
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: "user not found in database" });
    }

    // match the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.SECRET_KEY,
      { expiresIn: "2h" }
    );
    user.token = token;
    console.log(user, "token:", token);

    // cookie section
    const options = {
      expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };
    res
      .cookie("token", token, options)
      .json({ success: true, token });
  } catch (error) {
    console.log(error, "user login error");
    throw error;
  }
};

const checkUser = async (req, res) => {
  try {
    const { username } = req.params;

    // Query the database to check if the user with the given username exists
    const existingUser = await User.findOne({ username });

    // Send the response indicating whether the user exists
    res.json({ exists: !!existingUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getUser = async (req, res) => {
  try {
    const findPosts = await User.find();
    res.json(findPosts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
module.exports = { registerUser, getUser, loginUser, checkUser };
