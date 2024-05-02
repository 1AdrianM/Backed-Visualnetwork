const mongoose = require('mongoose')
const Schema =  mongoose.Schema

const PostScheme = new Schema({
postedBy:{
    type: [Schema.Types.ObjectId],
    ref:'User',
    required:true
},

description:{type: String , required:true},


likes: {
    type: [Schema.Types.ObjectId],
    ref: 'User',
    default:[]
},
media:{
    type:String,
    default: ""
},
bookmarked :{
    type: Boolean,
    default: false
},
commentedBy :[
    {
    	userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        text: {
            type: String,
            required: true,
        },
        userProfilePic: {
            type: String,
        },
        username: {
            type: String,
        },
    }
]

}
,
{
timestamps:true    
})
module.exports = mongoose.model( 'Post', PostScheme)