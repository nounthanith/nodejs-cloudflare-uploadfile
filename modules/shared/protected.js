const jwt = require("jsonwebtoken");

exports.protected = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];

  if (!token) return res.status(401).send({ err: "No token provided" });

  const payload = jwt.verify(token, process.env.JWT_SECRET);

  req.user = payload;

  console.log("User Unauthorized", req.user);

  next();
};
