const jwt = require("jsonwebtoken")

const authenticate = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];  // Bearer <token>
console.log(token)  

    if (!token) {
        return res.status(401).send({ message: "Authentication required" });
    }

    try {

        const decoded = jwt.verify(token, "secretkey");
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).send({message:"Invalid or expired token"});
    }
};

module.exports = { authenticate };