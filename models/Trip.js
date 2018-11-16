var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var TripSchema = new Schema({
 
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
    
    
    max_riders:{
        type: Number, 
        required: true
    },
    
    riders:[{
        type: Schema.Types.ObjectId, 
        ref: "User"
    }]
});

var Trip = mongoose.model("Trip", TripSchema);

module.exports = Trip;