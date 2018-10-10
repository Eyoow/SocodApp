var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var MessageSchema = new Schema({
    _id:{
        type: String, 
        required: true
    },
    sender:{
        type: Schema.Types.ObjectId, 
        ref: "User"
    }, 
    recipient:{
        type: Schema.Types.ObjectId, 
        ref: "User"
    },
    body:{
        type: String,
        required: true
    }
});


var Message = mongoose.model("Message", MessageSchema);

module.exports = Message;