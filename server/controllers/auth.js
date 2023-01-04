const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");

async function registerUser(req, res) {
  const SALT_ROUNDS = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(req.body.password, SALT_ROUNDS);
  req.body.password = hashedPass;
  const newUser = new User(req.body);
  const { username } = req.body;
  try {
    // check if user already exists
    const userExists = await User.findOne({ username });
    if (userExists) {
      return res
        .status(400)
        .json({ message: "Username is already registered" });
    }
    //if userdoes not exist, save new user
    const user = await newUser.save();

    const token = jwt.sign(
      {
        username: user.username,
        id: user._id,
      },
      process.env.JWT_KEY,
      { expiresIn: "24hr" }
    );
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(500).json(error.message);
  }
}
async function loginUser(req, res) {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username: username });
    if (user) {
      const validity = await bcrypt.compare(password, user.password);
      if (!validity) {
        res.status(400).json("Wrong password");
      } else {
        const token = jwt.sign(
          {
            username: user.username,
            id: user._id,
          },
          process.env.JWT_KEY,

          { expiresIn: "24hr" }
        );
        res.status(200).json({ user, token });
      }
    } else {
      res.status(404).json("User does not exist");
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
}

module.exports = {
  registerUser,
  loginUser,
};
