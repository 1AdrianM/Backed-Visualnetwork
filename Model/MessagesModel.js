const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageScheme = new Schema({
    conversationId:{
        type: [{
        types:Schema.Types.ObjectId,
        ref:'Conversation'
    }],
    },
    sender: { 
        type: mongoose.Schema.Types.ObjectId,
         ref: "User" 
    },
    img:{
        type: String,
         default:''
    },
    text: { 
        type: String,
         required: true
     },
    seen: {
        type:  Boolean, 
        default: false
    },
},
{
    timestamps:true
}
)

module.exports = mongoose.model( 'Message', MessageScheme );