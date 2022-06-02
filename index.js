const express = require("express");
const home = require("./routes/home");
const products = require("./routes/products");
const mongoose = require('mongoose');
const app = express();
var cors = require("cors");

app.use(cors());
app.use(express.json());
app.use("/home", home);
app.use("/api/products", products);
app.use("/uploads", express.static("uploads"));
app.set('view engine', 'ejs');


const dbURI = 'mongodb+srv://doaaTarek:123@cluster0.j46agni.mongodb.net/Node-tutorial?retryWrites=true&w=majority'
mongoose.connect(dbURI)
.then((result)=>{console.log("connected"); app.listen(3000, () => console.log("Listening"));}).catch((error)=>{console.log("dsdsds",error);})


