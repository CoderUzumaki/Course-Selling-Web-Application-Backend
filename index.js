const express = require("express");
const mongoose = require("mongoose");
const {route:userSignUp} = require("./routes/signup.js");
const {router:userLogin} = require("./routes/login.js");
require("dotenv").config();

async function connect(){
    await mongoose.connect(process.env.MOONGOOSE_STRING);
}
connect();


const app = new express();


app.use("/user/signup",userSignUp);
app.use("/user/login",userLogin);



app.listen(3000);