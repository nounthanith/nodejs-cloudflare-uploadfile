const { Router} = require("express");
const { createProduct, getAllProducts, getOneProduct, updateProduct, deleteProduct } = require("./products.controller");
const { protected } = require("../shared/protected");
const { authorize } = require("../shared/authorize");
const { role } = require("../utils/role");

const router = Router();

router.post("/products", protected, authorize([role.ADMIN]), createProduct);
router.get("/products", protected, authorize([role.ADMIN, role.CASHIER]), getAllProducts);
router.get("/products/:id", protected, authorize([role.ADMIN, role.CASHIER]), getOneProduct);
router.patch("/products/:id", protected, authorize([role.ADMIN]), updateProduct);
router.delete("/products/:id", protected, authorize([role.ADMIN]), deleteProduct);

module.exports = router
