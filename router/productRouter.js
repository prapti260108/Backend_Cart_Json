const express = require("express")
const { addProduct,getAllProduct,deleteProduct,updateProduct} = require("../controller/productController")
const {authenticate} = require("../Middleware/AuthMiddleware")
const router = express.Router()

// Add a new product
router.post("/addproduct",authenticate, addProduct)
// Get all products
router.get("/AllProduct", getAllProduct)
// Delete a product
router.delete("/deleteProduct/:id", deleteProduct)
// Update a product
router.put("/updateProduct/:id", updateProduct)

module.exports = router