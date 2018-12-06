const express = require("express");
const path = require("path");
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const PORT = process.env.PORT || 3001;
const app = express();
const session = require("express-session");
const cors = require("cors");
const bodyParser = require("body-parser");
var passport = require("passport");
var LocalStrategy =require("passport-local").Strategy;
const mongoose = require("mongoose");
require("dotenv").config();


// user Authentication
passport.use(new LocalStrategy(function(username, password,done){
    db.User.findOne({user_name:username},function(err,user){
        if(err){
            return done(err);
        }
        if(!user){
            return done(null, false, {message:"incorrect user name"});
        }
        if(!user.validPassword(password)){
            return done(null, false, {message:"incorrect password"});
        }
        return done(null, user);

    });
  }
));

passport.serializeUser(function(user,done){
    done(null, user._id);
    
});

passport.deserializeUser(function(user,done){
    db.User.findById(user._id,function(err,user){
        done(err, user);
    });
    
});



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use(session({secret:"star"}));
app.use(passport.initialize());
app.use(passport.session());


const authCheck = jwt({
  secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        // YOUR-AUTH0-DOMAIN name e.g prosper.auth0.com
        jwksUri: `https://${process.env.AUTHO_DOMAIN}/.well-known/jwks.json`
    }),
    // This is the identifier we set when we created the /API
    audience: '',
    issuer: `${process.env.AUTHO_DOMAIN}`,
    algorithms: ['RS256']
});

const db = require("./models");


const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/socodApp";

if(process.env.NODE_ENV === "production"){
    app.use(express.static("client/build"));

}
else{
    app.use(express.static(__dirname+"/static"));
}

app.get("/api/user/:id", authCheck, function(req,res){
    db.User.findOne({_id: req.params.id})
    .then(user => res.json(user))
    .catch(err => res.json(err));
});
// finding a user by username. also used to check for existing username.
app.get("/api/user_name/:user_name", authCheck,function(req,res){
    db.User.findOne({user_name: req.params.user_name})
    .then(() =>{ 
        if(res.body){
            res.json({"taken":"true"});
        }
        else{
            res.json({"taken":"false"});
        }
    })
    .catch(err => res.json(err));
});

app.get("/api/trips", authCheck, function(req,res){
    db.Trip.find({})
    .then(trips => res.json(trips))
    .catch(err => res.json(err));
});


app.get("/api/riders", authCheck, function(req,res){
    db.User.find({isrider: true})
    .then(riders => res.json(riders))
    .catch(err => res.json(err));
});

app.get("/api/messages/:id", authCheck, function(req,res){
    db.Message.find({recipient: req.params.id})
    .then(messages => res.json(messages))
    .catch(err => res.json(err));
});

app.post("/api/messages", authCheck, function(req,res){
    db.Message.create(req.body)
    .then(messages => res.json(messages))
    .catch(err => res.json(err));
});
app.post("/api/user", authCheck, function(req,res){
    let user = req.body;
    console.log(user);
    if (user.male)
    {
        user.gender = "M";
    }
    else if(user.female)
    {
        user.gender = "F";
    }
    db.User.findOneAndUpdate({_id: authCheck.id},{_id: authCheck.id}, {upsert: true})
    .then(user => res.json(user))
    .catch(err => res.json(err));
      
});


app.post("/api/trips", authCheck, function(req,res){
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


app.delete("/api/messages/:id", authCheck, function(req,res){
    db.Message.remove({_id: req.params.id })
    .then(()=> res.send("success"))
    .catch(err => res.json(err));
});


app.delete("/api/user/:id", authCheck, function(req,res){
    db.User.remove({_id: req.params.id })
    .then(()=> res.send("success"))
    .catch(err => res.json(err));
});

app.delete("/api/trips/:id", authCheck, function(req,res){
    db.Trip.remove({_id: req.params.id })
    .then(()=> res.send("success"))
    .catch(err => res.json(err));
});

// // frontend routes
// app.get("/register",function(req,res){
//     res.sendFile(path.join(__dirname,"register.html"));
// });

// app.get("/findTrip",function(req,res){
//     res.sendFile(path.join(__dirname,"findTrip.html"));
// });

// app.get("/trips",function(req,res){
//     res.sendFile(path.join(__dirname,"trips.html"));
// });


//THIS CODE IS FOR CONNECTIONG TO DB//
mongoose.connect(MONGODB_URI).then( 
    // () => {db.User.remove({},err => console.log(err))}
).catch(err => console.log(err));

app.listen(PORT, function(){

    console.log(`server now active on port ${PORT}`);

});

