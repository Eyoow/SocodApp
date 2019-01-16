var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var TripSchema = new Schema({
 
    stops:[{
        type: Object, 
        required: true
    }],
    driver:{
        type: String, 
        ref: "User"
    },
    start:{
        type:String,
        required: true
    },
    end:{
        type:String,
        required:true
    },
    // price:{
    //     type: Number, 
    //     required: true
    // },
    dates:[{
        type: Date, 
        required: true
    }],
    
    
    max_riders:{
        type: Number, 
        required: true
    },
    
    riders:[{
        type: String, 
        ref: "User"
    }]
});

var Trip = mongoose.model("Trip", TripSchema);

module.exports = Trip;