var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    user_name:{
        type: String, 
        required: true
    },
    
    name:{
        type: String, 
        required: true
    },
    street_address:{
        type: String, 
        required: true
    },
    zipcode:{
        type: Number, 
        required: true
    },

    birthdate:{
        type: String, 
        required: true
    },
    email:{
        type: String, 
        required: true
    },
    // password:{
    //     type: String, 
    //     required: true
    // },
    // picture:{
    //     type: String, 
    //     required: true
    // },
    isrider:{
        type: Boolean, 
        default: false
    },

    isdriver:{
        type: Boolean, 
        default: false
    },

    gender:{
        type: String,
        required: true
    }
});

var User = mongoose.model("User", UserSchema);

module.exports = User;