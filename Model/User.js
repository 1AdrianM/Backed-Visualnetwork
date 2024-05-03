const { default: mongoose } = require("mongoose");
const  Schema = mongoose.Schema;

const UserSchema = new Schema({
profile_picture:{
    type: String, 
    default:""
},

    Username:{
    type: String,
     required: true
    },

    FullName: { 
    type : String,
    required:true},

Email:{
    type:String,
    required:true
},

Password: { 
    type : String, 
    required : true
},

birthdate : Date,

following: [{
    type: Schema.Types.ObjectId, 
    ref:'User'}],

followers: [{
    type: Schema.Types.ObjectId, 
    ref:'User'}],

 followingCount:{
    type:Number, 
    default:0
}, 
followersCount: {
    type:Number, 
    default:0
},

bio: String,

isPrivate: {
    type: Boolean,
    default: false
}, //private profile or not
RefreshToken: String,
},
{
    timestamps:true
}
)
module.exports = mongoose.model('User', UserSchema)