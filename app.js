const express = require("express")
const db = require("./config/db")
const userRouter = require("./router/userRouter")
const productRouter = require("./router/productRouter")
const AddToCartRouter = require("./router/AddToCartRouter");

const app = express()
app.use(express.json())

// user router
app.use("/user", userRouter)
// product router
app.use("/product", productRouter)
// AddToCart router
app.use("/cart", AddToCartRouter);


// server connection
app.listen(6765, () => {
    console.log("server is listen on port 6765")
})