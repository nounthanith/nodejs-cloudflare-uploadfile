const bcryptjs = require("bcryptjs");
const UserModel = require("./users.model");
const jwt = require("jsonwebtoken");

exports.createUser = async (req, res) => {
  if (!req.body?.username || !req.body?.password)
    return res.status(400).send({ err: "Username and password are required" });

  const hashPassword = await bcryptjs.hash(req.body.password, 10);

  const newUser = await UserModel.create({
    ...req.body,
    password: hashPassword,
  });

  res.send({
    message: "User created successfully",
    data: newUser,
  });
};

exports.loginUser = async (req, res) => {
  if (!req.body?.username || !req.body?.password)
    return res.status(400).send({ err: "Username and password are required" });

  const user = await UserModel.findOne({ username: req.body.username }).select(
    "+password"
  );

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

exports.getProfile = async (req, res) => {
  const user = await UserModel.findById(req.user.id);

  if (!user) return res.status(404).send({ err: "User not found" });

  res.send({
    message: "User profile fetched successfully",
    data: user,
  });
};

exports.logoutUser = async (req, res) => {
  res.status(200).send({
    message: "User logged out successfully",
  });
};

exports.getAllUsers = async (req, res) => {
  const search = req.query.search || null;
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const role = req.query.role || null;
  const skip = (page - 1) * limit;

  let queryObject = {};

  if (search) queryObject = { name: { $regex: search, $options: "i" } };

  if (role) queryObject.role = role;

  const users = await UserModel.find(queryObject)
    .sort({ _id: -1 })
    .skip(skip)
    .limit(limit);
  const totalDocs = await UserModel.countDocuments(queryObject);
  const totalPages = Math.ceil(totalDocs / limit);

  if (!users) return res.status(404).send({ err: "Users not found" });

  res.send({
    message: "Users fetched successfully",
    data: users,
    totalPages,
    totalDocs,
  });
};

exports.updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const doc = await UserModel.findByIdAndUpdate(
      id, 
      req.body,
      { new: true }   
    );

    if (!doc) return res.status(404).send({ message: "User not found" });

    res.status(200).send({
      message: "User updated successfully",
      data: doc,
    });
  } catch (error) {
    res.status(500).send({ message: "Error updating user", error: error.message });
  }
};