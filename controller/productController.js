const product = require("../model/productModel")

// Add a new product
exports.addProduct = async (req, res) => {
    try {
        const { userId,title, price, description } = req.body;


        const newProduct = new product({ title, price, description, userId });
        await newProduct.save();

        res.json({ message: "Product added successfully", product: newProduct });
    } catch (error) {
        res.status(500).json({ message: "Error adding product", error: error.message });
    }
};

// Get all products
exports.getAllProduct = async (req,res)=>{
    try {
        const allProduct = await product.find()
        res.status(200).json(allProduct)
    } catch (error) {
        res.status(500).json({message:"Internal server error"})
    }
}      

// Delete a product
exports.deleteProduct = async (req,res)=>{
    try {
        const {id} = req.params
        await product.findByIdAndDelete(id)
        res.status(200).json({message:"Product deleted successfully"})
    } catch (error) {
        res.status(500).json({message:"Internal server error"})
    }
}

// Update a product
exports.updateProduct = async(req,res)=>{
    try{
        const {id} = req.params
        const {title,price,description} = req.body
        await product.findByIdAndUpdate(id,{title,price,description})
        res.status(200).json({message:"Product updated successfully"})
    }catch(err){
        res.status(500).json({message:"Internal server error"})
    }
}