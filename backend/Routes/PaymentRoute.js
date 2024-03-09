const express=require("express");
const router= express.Router();
const RazorPay=require("razorpay");
require("dotenv").config();
const crypto =require("crypto")


router.post("/payment", async(req,res)=>{
  console.log("hit")
  try{
  let options = req.body;
  console.log("xxx", options);

  var instance=new RazorPay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET
   });

  const order = await instance.orders.create(options);
  

  if(!order)
  {
    return res.send("Error")
  }
  // res.status(200).json({
  //   success:true
  // })
  //console.log(order);
  res.status(200).send(order);
}
catch(err)
{
  res.send(err)
}
});

router.post("/paymentverify", async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const sha = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET);
  //order_id + "|" + razorpay_payment_id
  sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
  const digest = sha.digest("hex");
  if (digest !== razorpay_signature) {
    return res.status(400).json({ msg: "Transaction is not legit!" });
  }

  res.json({
    msg: "success",
    orderId: razorpay_order_id,
    paymentId: razorpay_payment_id,
  });
});
module.exports=router;
