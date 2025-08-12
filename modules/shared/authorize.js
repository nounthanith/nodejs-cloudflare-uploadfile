exports.authorize = (role = []) => {
  return (req, res, next) => {
    const user = req.user;
    if (!user)return res.status(403).send({ err: "Unauthorized: No user found" });
    if (!role.includes(user.role))return res.status(403).send({ err: "Unauthorized: You don't have permission to access this resource" });
    next();
  };
};
