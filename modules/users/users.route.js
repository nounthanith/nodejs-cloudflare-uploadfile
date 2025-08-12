const { Router } = require("express");
const { createUser, loginUser, getProfile, getAllUsers, logoutUser, updateUser } = require("./users.controller");
const { protected } = require("../shared/protected");
const { authorize } = require("../shared/authorize");
const { role } = require("../utils/role");

const router = Router()

router.post("/users/signup",protected,authorize([role.ADMIN]), createUser)
router.post("/users/login", loginUser)
router.get("/users/profile",protected, getProfile)
router.get("/users",protected,authorize([role.ADMIN]), getAllUsers)
router.post("/users/logout",protected, logoutUser)
router.patch("/users/:id",protected,authorize([role.ADMIN]), updateUser)
module.exports = router
