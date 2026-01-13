const mongoose = require("mongoose");

const dbconnection = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/mydatabase', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("the error is:",error.message);
 
  }
};

module.exports = dbconnection;
