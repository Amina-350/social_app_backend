const express=require("express");
const dbconnection=require('./Utilty/dbconnection')
const app=express();
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
// Middleware
app.use(cors());
dbconnection();
// using express json
app.use(express.json());
app.use('/api',(req,res)=>{
    console.log("hello");
})

module.exports=app;
