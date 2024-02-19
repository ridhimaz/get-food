const express =require('express');
const app=express();
const port=3000;

const mongoDB= require("./db");
mongoDB();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.json())
app.use('/api',require("./Routes/CreateUser"))
app.use('/api',require("./Routes/DisplayData"))
app.use('/api',require("./Routes/OrderData"))
app.get("/", (req,res)=>{
    res.send("hello world")
})

app.listen(port,()=>{
    console.log(`Listening on port ${port}`)
})
