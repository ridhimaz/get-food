const express= require('express');
const router= express.Router();
const { body, validationResult } = require('express-validator');
const User=require('../models/User');
const jwt=require("jsonwebtoken")
const bcrypt=require("bcryptjs");
const jwtSecret="rutoMyvillageisHiddenleafvillage";

router.post("/createuser",[
    body('email').isEmail(),
    body('password','Incorrect password').isLength({ min: 6 })
  ],  async (req,res)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return  await res.status(400).json({ errors: errors.array() });
    }
    
    const salt= await bcrypt.genSalt(10);
    let secPassword=await bcrypt.hash(req.body.password,salt);

    try{
        await User.create({
            name:req.body.name,
            password:secPassword,
            email:req.body.email,
            location:req.body.location 
        });
        res.json({success:true});
        alert("User created!")
    }
    catch(error){
      alert("Alredy a user.")
     res.json({success:false});
    }
})


router.post("/loginuser", async (req,res)=>{ 
   
    try{
     let email=req.body.email;
        const userdata=await User.findOne({email});
        console.log(userdata);
        if(!userdata)
        {
            return res.status(400).json({ errors: "Enter correct credentials"});
        }
        let pwdCompare= await bcrypt.compare(req.body.password,userdata.password);
        if(!pwdCompare)
        {
            return res.status(400).json({ errors: "Enter correct credentials"});
        }

        const data={
          user:{
            id:userdata.id
          }
        }
        const authToken=jwt.sign(data,jwtSecret)
        return res.json({success:true, authToken:authToken});
    }
    
    catch(error){
    console.log(error);
    }
})

module.exports=router;