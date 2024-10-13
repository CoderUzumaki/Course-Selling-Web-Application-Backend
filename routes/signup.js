const express = require("express");
const bcrypt = require("bcrypt");
const {userLoginModel,userSignupModel} = require("./dbUser.js");
const {userSignupZod} = require("./zodSignup.js");
const route = express.Router();


route.use(express.json());
async function validate(req,res,next){
    try {
        await userSignupZod.parse(req.body);
        next();
    } catch (error) {
        console.log(error);
        res.json({
            message:"error"
        })
    }
}

route.get("/",(req,res)=>{
    res.render();
});

route.post("/",validate,async (req,res)=>{
    try{
        await userSignupModel.create({
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            email:req.body.email,
            username:req.body.username,
            password:await bcrypt.hash(req.body.password,5)
        });
    
        res.status(200).json({
            message:"Signed Up Successfully"
        });
    }
    catch(err){
        res.json({
            message:err
        })
    }
})


module.exports = {
    route
}