const express = require("express")
const db = require("./config/db")
const userRouter = require("./router/userRouter")
const productRouter = require("./router/productRouter")
const AddToCartRouter = require("./router/AddToCartRouter");
const cookieParser = require("cookie-parser");
const cors = require("cors")



const app = express()
app.use(cookieParser());
app.use(cors())
app.use(express.json())


app.use("/uploads", express.static("uploads"));




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
app.listen(7766, () => {
    console.log("server is listen on port 7766")
})