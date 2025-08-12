const { Router} = require("express");
const { createCategory, getAllCategories, getOneCategory, updateCategory, deleteCategory } = require("./categories.controller");
const { protected } = require("../shared/protected");
const { authorize } = require("../shared/authorize");
const { role } = require("../utils/role");

const router = Router();

router.post("/categories", protected, authorize([role.ADMIN]), createCategory);
router.get("/categories", protected, authorize([role.ADMIN, role.CASHIER]), getAllCategories);
router.get("/categories/:id", protected, authorize([role.ADMIN, role.CASHIER]), getOneCategory);
router.patch("/categories/:id", protected, authorize([role.ADMIN]), updateCategory);
router.delete("/categories/:id", protected, authorize([role.ADMIN]), deleteCategory);

module.exports = router
