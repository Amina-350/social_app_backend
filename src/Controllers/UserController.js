
const User=require('../Models/User.models')


const createUser=async(req,res)=>{
try{
 const { username, email, fullname, password } = req.body;
//creat user
const user=await User.create({
     username,
      email,
      fullname,
      password,
      avatar: req.file ? req.file.path : null,
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
module.exports = { createUser };
