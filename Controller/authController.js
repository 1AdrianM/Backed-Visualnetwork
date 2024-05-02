
const User = require("../Model/User");
const bcrypt =  require( "bcrypt" );
const jwt = require("jsonwebtoken");
const  asyncHandler = require("express-async-handler")

const refresh =(req, res)=>{
    const {cookie}= req.body

if(!cookie?.jwt) res.status(401).json({message:"Unathorized"})
 const refreshToken =  cookie.jwt

 jwt.verify(
    refreskToken,
    process.env.REFRESH_TOKEN,
    asyncHandler(async (error, decoded)=>{

 if(error) res.status(401).json({message:"Unathorized"})
  const FoundUser = await User.findOne({Username: decoded.Username})
  const Access_token = jwt.sign({
'UserInfo':{
    'Username':decoded.Username,
    'Password': decoded.Password
}
  },process.env.ACCESS_TOKEN,
    {expiresIn:'1h'}
  )  
})

) 
  }

  const LogIn =  asyncHandler(async(req, res)=>{
    const{Username, Password} = req.body
if(!Username||!Password) res.status(400).json({message:"invalid fields"})
    const FoundUser = await User.findOne({Username: Username})
if(!FoundUser) res.status(401).json({message: 'Unathorized'})
    const matching = await bcrypt.compare(Password, FoundUser.Password)
if(matching){
 const access_token =jwt.sign(
    {
    'UserInfo':{
        'Username': FoundUser.Username }
}
, process.env.ACCESS_TOKEN,
 {expiresIn:'60s'}
)
 const refreshToken = jwt.sign(
    {'Username': FoundUser}
    ,process.env.REFRESH_TOKEN,
    {expiresIn:'1h'}
)
  FoundUser.refreshToken = refreshToken
const result = await FoundUser.save()
console.log(result)
res.cookie('jwt',refreshToken,{HttpOnly:true, secure:true, sameSite:'None',maxAge:24*60*60*1000})
}
else{
    res.SendStatus(401)
}
})

const LogOut=  asyncHandler(async ()=>{
    const {cookie} = req.cookie
if(!cookie?.jwt) res.status(400).json({message: 'cookie invalid'})
    res.clearCookie('jwt',{HttpOnly:true,secure:true, sameSite:'None'})
    res.json({message:"Logging out, cookie cleared"})
})

module.exports ={
    LogIn,
     LogOut,
     refresh
     }