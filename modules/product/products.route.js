const { Router} = require("express");
const { createProduct, getAllProducts, getOneProduct, updateProduct, deleteProduct } = require("./products.controller");

const router = Router();

router.post("/products", createProduct);
router.get("/products", getAllProducts);
router.get("/products/:id", getOneProduct);
router.patch("/products/:id", updateProduct);
router.delete("/products/:id", deleteProduct);

module.exports = router
