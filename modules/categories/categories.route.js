const { Router} = require("express");
const { createCategory, getAllCategories, getOneCategory, updateCategory, deleteCategory } = require("./categories.controller");

const router = Router();

router.post("/categories", createCategory);
router.get("/categories", getAllCategories);
router.get("/categories/:id", getOneCategory);
router.patch("/categories/:id", updateCategory);
router.delete("/categories/:id", deleteCategory);

module.exports = router
