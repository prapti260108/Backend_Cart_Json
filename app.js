const express = require("express")
const db = require("./config/db")
const userRouter = require("./router/userRouter")
const productRouter = require("./router/productRouter")
const AddToCartRouter = require("./router/AddToCartRouter");
const cors = require("cors")



const app = express()
app.use(cors())
app.use(express.json())

// user router
app.use("/user", userRouter)
// product router
app.use("/product", productRouter)
// AddToCart router
app.use("/cart", AddToCartRouter);
// for Home Page
app.get("/", (req, res) => {
    res.send("Welcome to Home Page")
})


// server connection
app.listen(6765, () => {
    console.log("server is listen on port 6765")
})