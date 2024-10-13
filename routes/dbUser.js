const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const userSignup = new Schema({
    firstName: String,
    lastName: String,
    email:{type:String,unique:true},
    username:{type:String,unique:true},
    password:String
});


const userLogin = new Schema({
    username:String,
    password:String
})


const userSignupModel = mongoose.model("usersignins",userSignup);
const userLoginModel = mongoose.model("userslogins",userLogin);

module.exports = {
    userLoginModel,
    userSignupModel
}