const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const {userLoginModel,userSignupModel} = require("./dbUser.js");
require("dotenv").config();


const router = new express.Router();


router.use(express.json());

async function auth(req,res,next){
    
    try {
        const user = await userSignupModel.findOne({
            username:req.body.username
        })
        if(!user){
            res.staus(400).json({
                message:"Wrong username"
            })
        }
        let verify = await bcrypt.compare(req.body.password,user.password);
        if(verify){
            req.body.userId = user._id;
            next();
        }
        else{
            res.staus(400).json({
                message:"Wrong Password"
            })
        }
    } catch (error) {
        console.log(error);
    }
}
router.get("/",(req,res)=>{
    res.render();
})

router.post("/",auth,(req,res)=>{
    const token = jwt.sign(req.body.userId.toString(),process.env.JWT_SECRET);
    res.setHeader("token",token);
    res.cookie("user",token);
    res.status(200).json({
        message:"Logged in Successfully"
    })
})


module.exports = {router};