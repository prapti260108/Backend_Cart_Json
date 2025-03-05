const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,  // ✅ ObjectId use karein
        required: true,
        ref: "User"
    }, 
    products: [{ 
        productId: {
            type: mongoose.Schema.Types.ObjectId,  // ✅ ObjectId use karein
            ref: "Product"
        },
        quantity: { type: Number, default: 1 }
    }],
    couponCode: {
        type: String,
        default: null
    },
    discount: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model("Cart", CartSchema);
