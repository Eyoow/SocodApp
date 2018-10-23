const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());



const db = require("./models");


const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/socodApp";

if(process.env.NODE_ENV === "production"){
    app.use(express.static("client/build"));

}

app.get("/api/user/:id", function(req,res){
    db.User.findOne({_id: req.params.id})
    .then(user => res.json(user))
    .catch(err => res.json(err));
});
// finding a user by username. also used to check for existing username.
app.get("/api/user_name/:user_name", function(req,res){
    db.User.findOne({user_name: req.params.user_name})
    .then(() => res.json({"taken":"true"}))
    .catch(() => res.json({"taken":"false"}));
});

app.get("/api/trips", function(req,res){
    db.Trip.find({})
    .then(trips => res.json(trips))
    .catch(err => res.json(err));
});


app.get("/api/riders", function(req,res){
    db.User.find({isrider: true})
    .then(riders => res.json(riders))
    .catch(err => res.json(err));
});

app.get("/api/messages/:id", function(req,res){
    db.Message.find({recipient: req.params.id})
    .then(messages => res.json(messages))
    .catch(err => res.json(err));
});

app.post("/api/messages", function(req,res){
    db.Message.create(req.body)
    .then(messages => res.json(messages))
    .catch(err => res.json(err));
});
app.post("/api/user", function(req,res){
    let user = req.body;
    console.log(user);
    if(user._id){
        db.User.findOneAndUpdate({_id: user._id},{_id: user._id}, {upsert: true})
    .then(user => res.json(user))
    .catch(err => res.json(err));
    }

   else{ db.User.create(user)
    .then(user => res.json(user))
    .catch(err => res.json(err));}
});


app.post("/api/trips", function(req,res){
    let trip = req.body;
    console.log(trip);
   if(trip._id)
    {
        
        if(trip.riders.length<trip.max_riders){

        
        db.Trip.findOneAndUpdate({_id: trip},{_id: trip}, {upsert: true})
    .then(trip => res.json(trip))
    .catch(err => res.json(err));}

    else{
        res.text("ride is full");
    }
}
else{
    db.Trip.create(trip)
    .then(trip => res.json(trip))
    .catch(err => res.json(err));}
});


app.delete("/api/messages/:id", function(req,res){
    db.Message.remove({_id: req.params.id })
    .then(()=> res.send("success"))
    .catch(err => res.json(err));
});


app.delete("/api/user/:id", function(req,res){
    db.User.remove({_id: req.params.id })
    .then(()=> res.send("success"))
    .catch(err => res.json(err));
});

app.delete("/api/trips/:id", function(req,res){
    db.Trip.remove({_id: req.params.id })
    .then(()=> res.send("success"))
    .catch(err => res.json(err));
});

//THIS CODE IS FOR CONNECTIONG TO DB//
mongoose.connect(MONGODB_URI).then( 
    // () => {db.User.remove({},err => console.log(err))}
).catch(err => console.log(err));

app.listen(PORT, function(){

    console.log(`server now active on port ${PORT}`);

});

