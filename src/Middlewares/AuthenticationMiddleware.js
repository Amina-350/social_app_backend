const jwt=require('jsonwebtoken');
const SECRET_KEY = 'your_secret_key';
const AuthenticationMiddleware =(req,res,next)=>{
const token=req.headers['authorization']?.split(' ')[1];
if(!token){
  return  console.log("Authentication failed... Token not received..");
}
jwt.verify(token,SECRET_KEY,(err,user)=>{
    if(err){
       return res.status(403).json({ message: "Invalid token" });
    }
    req.user=user;
    next(); 
})
}
module.exports = { AuthenticationMiddleware };
