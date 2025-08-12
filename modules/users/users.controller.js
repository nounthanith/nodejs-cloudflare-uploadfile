const bcryptjs = require("bcryptjs");
const UserModel = require("./users.model");
const jwt = require("jsonwebtoken");

exports.createUser = async (req, res) => {
  if (!req.body?.username || !req.body?.password)
    return res.status(400).send({ err: "Username and password are required" });

  const hashPassword = await bcryptjs.hash(req.body.password, 10);

  const newUser = await UserModel.create({...req.body,password: hashPassword});

  res.send({
    message: "User created successfully",
    data: newUser,
  });
};

exports.loginUser = async (req, res) => {
  if (!req.body?.username || !req.body?.password)
    return res.status(400).send({ err: "Username and password are required" });

  const user = await UserModel.findOne({ username: req.body.username }).select("+password");

  if (!user) return res.status(401).send({ err: "User not found" });

  const isMatch = await bcryptjs.compare(req.body.password, user.password);

  if (!isMatch) return res.status(401).send({ err: "Password is incorrect" });

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );

  res.send({
    message: "User logged in successfully",
    data: {
      user: {
        _id: user._id,
        username: user.username,
        role: user.role,
      },
      token,
    },
  });
};
