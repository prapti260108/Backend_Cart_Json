const product = require("../model/productModel");
const multer = require("multer");
const path = require("path");

// Multer Storage Configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

// File Filter
const fileFilter = (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Only JPEG, PNG, and JPG files are allowed"), false);
    }
};

// Multer Upload Middleware
const upload = multer({ storage: storage, fileFilter: fileFilter });

// Add a new product with Image Upload
exports.addProduct = async (req, res) => {
    try {
        const { userId, title, price, description } = req.body;
        const image = req.file ? req.file.filename : null;

        const newProduct = new product({
            title,
            price,
            description,
            userId,
            image
        });
        await newProduct.save();

        res.json({ message: "Product added successfully", product: newProduct });
    } catch (error) {
        res.status(500).json({ message: "Error adding product", error: error.message });
    }
};

// Get all products
exports.getAllProduct = async (req, res) => {
    try {
        const allProduct = await product.find();
        res.status(200).json(allProduct);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        await product.findByIdAndDelete(id);
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

// Update a product
exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, price, description } = req.body;
        const image = req.file ? req.file.filename : null;

        const updateData = { title, price, description };
        if (image) updateData.image = image;

        await product.findByIdAndUpdate(id, updateData);
        res.status(200).json({ message: "Product updated successfully" });
    } catch (err) {
        res.status(500).json({ message: "Internal server error" });
    }
};


exports.DeleteAllProduct = async (req, res) => {
    try {
        await product.deleteMany();
        res.status(200).json({ message: "All products deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

// Export multer upload middleware
exports.upload = upload;