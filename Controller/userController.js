const User = require("../Model/User");
const bcrypt =  require('bcrypt');
const jwt = require('jsonwebtoken');
const  asyncHandler = require("express-async-handler");
const  mongoose  = require("mongoose");


const GetUsers = asyncHandler(async(req, res)=>{
    const usuario = await Usuario.find().select('-password').lean()

    // If no users 
    if (usuario?.length == 0) {
        return res.status(400).json({ message: 'No users found' })
    }

    res.json(usuario)
})
const GetUserProfile = asyncHandler(async(req,res)=>{
const{query} = req.body
try{
let user
if(mongoose.Types.ObjectId.IsValid(query))
{
 user = await User.findOne({_id: query}).select("-password").select("-UpdateAt")
}
else{

     user = await User.findOne({username:query}).select("-password").select("-UpdateAt")
}
 if(!user){
    return res.status(404).json({message:"User not Found"})
 }
    res.status(200).json(user)
}catch(err){
    console.log(err)
    res.status().json({message:`Error in GetUserProfile, ${err}`})
}

})

const CreateUser =  asyncHandler(async(req, res)=>{
    const{Username, Email,Password }= req.body
if(!Username||!Email||!Password) res.status(401).json({message:"All fields are required"})

    const duplicate = await User.findOne({Username: Username})

if(duplicate) return res.status(409).json( { message : "Username already in use"} )

    const hshPassword = bcrypt.hash(Password, 10)

    const UserObject = {Username, Email, hshPassword}

try {
    const user = await Usuario.create(UserObject);
    return res.status(201).json({ message: `New user ${Username} created` });

} catch (error) {
    console.error('Error creating user:', error);
    return res.status(500).json({ message: 'Error creating user' });
}

})
//Completar
const UpdateUser=  asyncHandler( async(req, res)=>{

})
//
const DeleteUser=  asyncHandler(async (req,res)=>{

    const {id} = req.body

if(!id) res.status(400).send({message:"invalid User ID"})

    const  user = await User.findOne({_id:id})


if(!user) res.status(400).json({message:"User not Found"})

    const del = await user.deleteOne()

    const response = `User ${id}deleted successfully`

res.json(response, del)
})

//completar
const follow_Handling= asyncHandler(async(req,res)=>{

})
module.exports ={
    follow_Handling, 
    UpdateUser,
    CreateUser,
    DeleteUser,
    GetUsers,
    GetUserProfile
}