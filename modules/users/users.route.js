const { Router } = require("express");
const { createUser, loginUser } = require("./users.controller");


const router = Router()

router.post("/users/signup", createUser)
router.post("/users/login", loginUser)
module.exports = router
