const express= require('express');
const router= express.Router();
const Order =require("../models/Orders");


router.post("/orderData", async(req,res)=>{
  let data=req.body.order_data;
  // console.log("data",data)
  await data.splice(0,0,{order_date:req.body.order_date})

  let eId=await Order.findOne({'email':req.body.email})
  if(eId==null)
  {
    // console.log("new user")
    try{
        await Order.create({
            email:req.body.email,
            order_data:[data]
        }).then(()=>res.json({success:true}))
    }
    catch(error){
    res.json({success:false})
    }
  }
  else{
    // console.log("not new user")
    try{
        await Order.findOneAndUpdate({
            email:req.body.email},
           {
            $push:{order_data: data} }).then(() => {
                res.json({ success: true })
           }
        )
    }
    catch(error){
    res.send("Server Error",error.message)
    }
  }
});

 router.post("/myOrderData",async(req,res)=>{
    try{const myData= await Order.findOne({'email':req.body.email});
    console.log("myData",myData)
    res.json({orderData:myData});}
    catch(error){
        res.send("Server Error",error.message)
    }
 })

module.exports=router;