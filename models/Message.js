var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var MessageSchema = new Schema({
    
    sender:{
        type: String, 
        ref: "User"
    }, 
    recipient:{
        type: String, 
        ref: "User"
    },
    subject:{
        type: String,
        required: true
    },
    body:{
        type: String,
        required: true
    },
    read:{
        type:Boolean,
        default: false
    }
});


var Message = mongoose.model("Message", MessageSchema);

module.exports = Message;