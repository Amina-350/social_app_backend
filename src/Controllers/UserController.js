
const User= require('../Models/User.models')
 const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const Vedio=require('../Models/Video.models')

const createUser=async(req,res)=>{
try{
 const {username,email,fullname,password,coverImage } = req.body;
 console.log("the username and pass is",password)
 const hashpassword=await bcrypt.hash(password,10);

//creat user
const user=await User.create({
     username,
      email,
      fullname,
      password:hashpassword,
      avatar: req.file ? req.file.path : null,
      coverImage:req.file?req.file.path:null,
})

res.send({message:"user created sucessfully"});

}
catch(error)
{
    res.status(500).json({
      success: false,
      message: "Server error",
      error:error.message,

    });

}


}

const loginUser=async(req,res)=>{
  try{
 const {username,password}=req.body;
 console.log(`the username is ${username} and password of login is ${password}`)
  const user = await User.findOne({ username });
  console.log("the user is --->",user)
 if (!user) {
 return res.status(401).json({ error: 'Authentication failed,user not found' });
 }
 const passwordmatch= await bcrypt.compare(password,user.password);
 console.log(`hashed pass is ${passwordmatch}`)
  if (!passwordmatch) {
 return res.status(401).json({ error: 'Authentication failed' });
 }
 const token = jwt.sign({ userId: user._id }, 'your-secret-key', {
 expiresIn: '1h',
 
 });
return res.status(200).json({
  success: true,
  message: "Login successful",
  token: token
});
 
  }
 catch (error) {
 res.status(500).json({
      success: false,
      error: error.message,
    });
 }



}



// get user profile

const getUserProfileById = async (req, res) => {
  try {
    const { userId } = req.params;

    // 1️⃣ Get user info (hide password)
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // 2️⃣ Get videos created by this user
    const videos = await Vedio.find({ owner: userId })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      user,
      videos,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
module.exports = { createUser,loginUser,getUserProfileById };
