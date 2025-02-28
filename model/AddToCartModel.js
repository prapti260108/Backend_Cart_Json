const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,  // ✅ ObjectId use karein
        required: true,
        ref: "User"  // Agar User collection hai
    }, 
    products: [{ 
        productId: {
            type: mongoose.Schema.Types.ObjectId,  // ✅ ObjectId use karein
            ref: "Product"
        },
        quantity: { type: Number, default: 1 }
    }]
});

module.exports = mongoose.model("Cart", CartSchema);
