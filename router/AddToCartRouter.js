const express = require("express");
const { addToCart, getCart, deleteProductFromCart } = require("../controller/AddToCartController");
const router = express.Router();


// Add to cart
router.post("/add", addToCart); 
// Get cart
router.get("/getCart/:userId", getCart); 
// Delete product from cart
router.delete("/deleteProduct/:userId/:productId", deleteProductFromCart);



module.exports = router;
