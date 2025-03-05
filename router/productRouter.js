const express = require("express");
const { addProduct, getAllProduct, deleteProduct, updateProduct, upload, DeleteAllProduct } = require("../controller/productController");
const { authenticate } = require("../Middleware/AuthMiddleware");

const router = express.Router();

// Add a new product with image upload
router.post("/addproduct", authenticate, upload.single("image"), addProduct);

// Get all products
router.get("/AllProduct", getAllProduct);

// Delete a product
router.delete("/deleteProduct/:id", deleteProduct);

// DeleteAllProduct
router.delete("/deleteAllProduct", DeleteAllProduct);

// Update a product with image upload
router.put("/updateProduct/:id", upload.single("image"), updateProduct);

module.exports = router;