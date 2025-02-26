const user = require("../model/userModel")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")


// User signup
exports.signup = async (req,res)=>{
    try {
        const {name,email,password} = req.body
        const checkUser = await
        user.findOne({email:email})
        if(checkUser){
            return res.status(400).json({message:"User already exist"})
        }
        const hashPassword = await bcryptjs.hash(password,10)
        const newUser = new user({
            name,
            email,
            password:hashPassword
        })
        await newUser.save()
        res.status(200).json({message:"User created successfully"})
    }
    catch (error) {
        res.status(500).json({message:"Internal server error"})
    }
}

// User login
exports.login = async (req,res)=>{
    try {
        const {email,password} = req.body
        const check = await user.findOne({
            email:email
        })      
        if(!check){
            return res.status(400).json({message:"Invalid email"})
        }
        const checkPassword = await bcryptjs.compare(password,check.password)
        if(!checkPassword){
            return res.status(400).json({message:"Invalid password"})
        }
        const token = jwt.sign({id:check._id},"secretkey")
        res.status(200).json({message:"Login successfully",token})
    }
    catch (error) {
        res.status(500).json({message:"Internal server error"})
    }   
}
