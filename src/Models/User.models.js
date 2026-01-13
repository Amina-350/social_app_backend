const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  watchHisorty: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "video",
    },
  ],
  username: {
    type: String,
  },
  email: {
    type: String,
  },
  fullname: {
    type: String,
  },
  avatar: {
    type: String,
  },
 
  coverImage: {
    type: String,
  },
  password: {
    type: String,
  },
  createdVideo:{
    
  }

},{ timestamps: true });
module.exports = mongoose.model("User", userSchema);
