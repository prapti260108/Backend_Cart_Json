// nodetask26
// mongodb+srv://praptivirugama08:nodetask26@cluster0.bh2t0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

const mongoose = require("mongoose")

mongoose.connect("mongodb+srv://praptivirugama08:nodetask26@cluster0.bh2t0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")

const db = mongoose.connection;

db.on('connected',()=>{
    console.log("database is connected")
})

module.exports = db