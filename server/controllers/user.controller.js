const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  const { email, password } = req.body;

  const salt = bcrypt.genSaltSync(10);
  const hashPassword = await bcrypt.hashSync(password, salt);

  try {
    //check if user alredy existed

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ error: "User with this email already exists" });
    }

    //create user and save
    const newUser = await User.create({
      email: email,
      password: hashPassword,
    });

    const createdUser = await newUser.save();

    //generate a Toekn for user and send it
    const token = jwt.sign(
      { id: newUser._id, email: newUser.email },
      process.env.SECRET_KEY,
      { expiresIn: "2h" }
    );
    newUser.token = token;
    console.log(newUser);
    console.log(token);

    res
      .status(201)
      .json({ message: "User created successfully", user: createdUser });
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

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!(email && password)) {
      res.send(400).send("please send all fields");
    }

    // find user in DataBase and check user if exist
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "user not found in database" });
    }

    // match the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.SECRET_KEY,
      { expiresIn: "2h" }
    );
    user.token = token;

    // cookie section
    const options = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };
    res
      .status(201)
      .cookie("token", token, options)
      .json({ success: true, token });

    res
      .status(200)
      .json({ message: "User logged in successfully", user: user });
  } catch (error) {
    console.log(error, "user login error");
    throw error;
  }
};
module.exports = { registerUser, getUser, loginUser };
