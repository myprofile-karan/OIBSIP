const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  const { email, password } = req.body;

  const salt = bcrypt.genSaltSync(10);
  const hashPassword = await bcrypt.hashSync(password, salt)

  try {
    //check if user alredy existed

    const existingUser = await User.findOne({ email });   
    if (existingUser) {
      return res.status(409).json({ error: 'User with this email already exists' });
    }

    //create user and save
    const newUser = await User.create({
      email: email,
      password: hashPassword
    });

    const createdUser = await newUser.save();

    //generate a Toekn for user and send it
    const token = jwt.sign(
      {id: newUser._id, email: newUser.email},
      process.env.SECRET_KEY,
      {expiresIn: "2h"}
    )
    newUser.token = token
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
    res.json(findPosts)
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { registerUser, getUser };
