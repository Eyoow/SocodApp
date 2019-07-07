const express = require("express");
// const path = require("path");
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const PORT = process.env.PORT || 3001;
const app = express();
//const session = require("express-session");
const cors = require("cors");
const bodyParser = require("body-parser");
// var passport = require("passport");
// var LocalStrategy =require("passport-local").Strategy;

const mongoose = require("mongoose");
require("dotenv").config();
const AWS = require('aws-sdk');
const fs = require('fs');
const fileType = require('file-type');
const bluebird = require('bluebird');
const multiparty = require('multiparty');


// configure the keys for accessing AWS
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

// configure AWS to work with promises
AWS.config.setPromisesDependency(bluebird);

// create S3 instance
const s3 = new AWS.S3();

// abstracts function to upload a file returning a promise
const uploadFile = (buffer, name, type) => {
  const params = {
    ACL: 'public-read',
    Body: buffer,
    Bucket: process.env.S3_BUCKET,
    ContentType: type.mime,
    Key: `${name}.${type.ext}`
  };
  return s3.upload(params).promise();
};

// Define POST route
app.post('/test-upload', (request, response) => {
  const form = new multiparty.Form();
    form.parse(request, async (error, fields, files) => {
      if (error) throw new Error(error);
      try {
        const path = files.file[0].path;
        const buffer = fs.readFileSync(path);
        const type = fileType(buffer);
        const timestamp = Date.now().toString();
        const fileName = `bucketFolder/${timestamp}-lg`;
        const data = await uploadFile(buffer, fileName, type);
        return response.status(200).send(data);
      } catch (error) {
        return response.status(400).send(error);
      }
    });
});


// user Authentication
// passport.use(new LocalStrategy(function(username, password,done){
//     db.User.findOne({user_name:username},function(err,user){
//         if(err){
//             return done(err);
//         }
//         if(!user){
//             return done(null, false, {message:"incorrect user name"});
//         }
//         if(!user.validPassword(password)){
//             return done(null, false, {message:"incorrect password"});
//         }
//         return done(null, user);

//     });
//   }
// ));

// passport.serializeUser(function(user,done){
//     done(null, user._id);
    
// });

// passport.deserializeUser(function(user,done){
//     db.User.findById(user._id,function(err,user){
//         done(err, user);
//     });
    
// });



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors({credentials:true}));
// app.use(session({secret:"star"}));
// app.use(passport.initialize());
// app.use(passport.session());


const authCheck = jwt({
  secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        // YOUR-AUTH0-DOMAIN name e.g prosper.auth0.com
        jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
    }),
    // This is the identifier we set when we created the /API
    audience: `${process.env.AUTH0_DOMAIN}`,
    issuer: `${process.env.AUTH0_DOMAIN}`,
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

app.get("/api/user/:id", /*authCheck,*/ function(req,res){
    console.log(process.env.AWS_SECRET_ACCESS_KEY);
console.log(process.env.AWS_SECRET_ACCESS_KEY);
console.log(process.env.AWS_ACCESS_KEY_ID);
console.log(process.env.AWS_SECRET_ACCESS_KEY);
    db.User.findOne({_id: req.params.id})
    .then(user => res.json(user))
    .catch(err => res.json(err));
});
// finding a user by username. also used to check for existing username.
app.get("/api/users", (res) => {
    db.User.find({})
    .then(users => res.json(users))
    .catch(err => res.json(err));
});

app.get("/api/user_name/:user_name", /*authCheck,*/function(req,res){
    db.User.findOne({user_name: req.params.user_name})
    .then(user => res.json(user))
    .catch(err => res.json(err));
});

app.get("/api/trips", /*authCheck,*/ function(req,res){
    db.Trip.find({}).populate('driver').populate({path:'riders',populate:'rider'})
    .then(trips => res.json(trips))
    .catch(err => res.json(err));
});


app.get("/api/riders", /*authCheck,*/ function(req,res){
    db.User.find({isrider: true})
    .then(riders => res.json(riders))
    .catch(err => res.json(err));
});

app.get("/api/messages/:id", /*authCheck,*/ function(req,res){
    db.Message.find({$or:[{recipient: req.params.id},{sender: req.params.id}]}).populate('sender').populate('recipient')
    .then(messages => res.json(messages))
    .catch(err => res.json(err));
});

app.post("/api/messages", /*authCheck,*/ function(req,res){
    db.Message.create(req.body)
    .then(messages => res.json(messages))
    .catch(err => res.json(err));
});
app.post("/api/user", /*authCheck,*/ function(req,res){
    let user = req.body;
    console.log(user);
    db.User.findOneAndUpdate({_id: user.id},user,{upsert: true, returnOriginal: false, runValidators: true})
        .then(user => {
            console.log(user);
            return res.json(user);
        })
        .catch(err => {
            console.log(err);
            return res.json(err);
        })
      
});


app.post("/api/trips", /*authCheck,*/ function(req,res){
    let trip = req.body;
    
   if(trip._id)
    {
        if(trip.riders.length<=trip.max_riders){

            db.Trip.findOneAndUpdate({_id: trip._id},trip)
            .then(trip => res.json(trip))
            .catch(err => res.json(err));
        }

        else{
            return res.send("ride is full")
        }
    }
    else{
        db.Trip.create(trip)
        .then(trip => {
            console.log(trip);
            return res.json(trip);
        })
        .catch(err => res.json(err));
        }
    });


app.delete("/api/messages/:id", /*authCheck,*/ function(req,res){
    db.Message.remove({_id: req.params.id })
    .then(()=> res.send("success"))
    .catch(err => res.json(err));
});


app.delete("/api/user/:id", /*authCheck,*/ function(req,res){
    db.User.remove({_id: req.params.id })
    .then(()=> res.send("success"))
    .catch(err => res.json(err));
});

app.delete("/api/trips/:id", /*authCheck,*/ function(req,res){
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
mongoose.connect(MONGODB_URI).then( () =>{
    console.log("connected to database");
    mongoose.set('useNewUrlParser', true);
    mongoose.set('useFindAndModify', false);
    mongoose.set('useCreateIndex', true);
}
    // () => {db.User.remove({},err => console.log(err))}
).catch(err => console.log(err));

app.listen(PORT, function(){

    console.log(`server now active on port ${PORT}`);

});

