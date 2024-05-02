const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ConversationScheme = new Schema({
    Participants:{
        type: [{
        types:Schema.Types.ObjectId,
        ref:"User"
    }],
    },
    lastMessage: {
        text: String,
        sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        seen: {
            type: Boolean,
            default: false,
        },
    },
},
{
    timestamps: true  // Saves createdAt and updatedAt as dates. Creates them in ISO 8601 format y
})
module.exports = mongoose.model( 'Conversation', ConversationScheme );