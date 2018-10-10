var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var TripSchema = new Schema({
    _id:{
        type: String, 
        required: true
    },
    
    stops:[{
        type: Number, 
        required: true
    }],
    driver:{
        type: Schema.Types.ObjectId, 
        ref: "User"
    },

    price:{
        type: Number, 
        required: true
    },
    dates:[{
        type: Date, 
        required: true
    }],
    
    riders:[{
        type: Schema.Types.ObjectId, 
        ref: "User"
    }]
});

var Trip = mongoose.model("Trip", TripSchema);

module.exports = Trip;