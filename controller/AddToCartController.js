const Cart = require("../model/AddToCartModel");
const product = require("../model/productModel");

exports.addToCart = async (req, res) => {
    try {
        console.log("Request Body:", req.body);  // Debugging ke liye

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

        cart.products = cart.products.filter(p => p.productId !== productId);

        await cart.save();

        res.json({ message: "Product removed from cart" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

