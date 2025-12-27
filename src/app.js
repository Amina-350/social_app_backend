const express=require("express");
const dbconnection=require('./Utilty/dbconnection')
const app=express();
const cors = require("cors");
const dotenv = require("dotenv");
const UserRoute=require('./Routes/UserRoute');
const router = express.Router();
dotenv.config();
// Middleware
app.use(cors());
dbconnection();
// using express json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/user',UserRoute);
app.get('/api/usera', (req, res) => {
  res.send("heello");
});

// Simple POST API for testing
app.post("/test", (req, res) => {
  try {
    const data = req.body;

    // Example: throw error if body is empty
    if (!data || Object.keys(data).length === 0) {
      throw new Error("Request body is empty");
    }

    res.status(201).json({
      message: "POST request received successfully",
      receivedData: data,
    });
  } catch (error) {
    // Catch any error and send proper response
    res.status(400).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
});



module.exports=app;
