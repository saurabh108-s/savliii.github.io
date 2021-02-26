const jwt =require("jsonwebtoken");
const sessionStorage=require('sessionstorage');

const users=require('../models/users');

exports.userSignin=(async (req,res)=>{
    try{
        var token=null;
        var message=null;
        const user=await users.findOne({username:req.body.username});
        if(user){
            if(user.Authenticate(req.body.password)){
                token=jwt.sign({_id:user._id,contact:user.contactNumber,username:user.username},process.env.JWT_SECRET,{expiresIn:"1h"});
            }else{
                message="Incorrect Password!";
                return res.render('login',{"message":message});
            }
        }
        if(token){
            sessionStorage.setItem("token", token);
            return res.redirect('/');
        }
        else{
            message="Incorrect username!";
            return res.render('login',{"message":message});
        }
    }catch(err){
        message="Something wrong,try again!!"
        return res.render('login',{"message":message});
    }
});
