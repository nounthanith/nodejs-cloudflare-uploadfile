const { Router } = require("express");
const { getAllSales } = require("./sales.controller");
const { protected } = require("../shared/protected");
const { authorize } = require("../shared/authorize");
const { role } = require("../utils/role");

const router = Router();

router.get("/sales", protected, authorize([role.ADMIN]), getAllSales);
