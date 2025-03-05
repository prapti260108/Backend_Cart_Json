const Cart = require("../model/AddToCartModel");
const Product = require("../model/productModel");

// Add to cart
exports.addToCart = async (req, res) => {
    try {
        console.log("Request Body:", req.body);

        const { userId, products } = req.body;

        if (!userId || !products) {
            return res.status(400).json({ message: "Invalid request body" });
        }

        let cart = await Cart.findOne({ userId });

        if (!cart) {
            cart = new Cart({ userId, products: [] });
        }

        products.forEach(({ productId, quantity }) => {
            const existingProduct = cart.products.find(p => p.productId.toString() === productId.toString());
            if (existingProduct) {
                existingProduct.quantity += quantity;
            } else {
                cart.products.push({ productId, quantity });
            }
        });

        await cart.save();
        res.json({ message: "Product added to cart", cart });

    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: error.message });
    }
};

// Get cart
exports.getCart = async (req, res) => {
    try {
        const { userId } = req.params;

        const cart = await Cart.findOne({ userId }).populate("products.productId");

        if (!cart) return res.json({ message: "Cart is empty" });

        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete product from cart
exports.deleteProductFromCart = async (req, res) => {
    try {
        const { userId, productId } = req.params;

        const cart = await Cart.findOne({ userId });

        if (!cart) return res.status(400).json({ message: "Cart not found" });

        cart.products = cart.products.filter(p => p.productId.toString() !== productId.toString());

        await cart.save();

        res.json({ message: "Product removed from cart", cart });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Apply Coupon Code
exports.applyCoupon = async (req, res) => {
    try {
        const { userId, couponCode } = req.body;

        if (!userId || !couponCode) {
            return res.status(400).json({ message: "Invalid request body" });
        }

        let cart = await Cart.findOne({ userId });

        if (!cart) return res.status(400).json({ message: "Cart not found" });

        const discountPercentage = getCouponDiscount(couponCode);

        if (discountPercentage === 0) {
            return res.status(400).json({ message: "Invalid or expired coupon" });
        }

        cart.couponCode = couponCode;
        cart.discount = discountPercentage;

        await cart.save();

        res.json({ message: "Coupon applied successfully", cart });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const getCouponDiscount = (couponCode) => {
    
    const coupons = {
        "SAVE10": 10,
        "WELCOME15":15,
        "DISCOUNT20": 20,
        "OFFER30": 30,
        "SUPERDEAL":35,
        "FESTIVE50":50,
        "FREESHIP":100
    };

    return coupons[couponCode] || 0;
};