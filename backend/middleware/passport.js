const GoogleStrategy = require('passport-google-oauth20').Strategy
const passport = require('passport')
const db = require("../config/db");
require('dotenv').config()

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback",
    scope : ["profile", "email"], 
  },
  function(accessToken, refreshToken, profile, cb) {
    db.query(
      "select * from users where googleId = ?",
      [profile.id],
      (err, user) =>{
        if(err){
          cb(err, false);
        }
        if(!err && user.length !=0){
          return cb(null, user)
        }else{
          db.query(
            "insert into users set username= ?, googleId= ?, userImg = ?, userEmail = ?",
            [profile.displayName, profile.id, profile.photos[0].value, profile.emails[0].value],
            (err, userAdded) => {
              if(err){
                return cb(err, false);
              }else{
                db.query(
                  "select * from users wher googleId = ?",
                  [profile.id],
                  (err, user) =>{
                    return cb(null, user);
                      console.log("Login/Sign in successfully");
                  }
                )
              }

            }
          )
        }
      }
      
      )
    // cb(null, profile)
  }
));


passport.serializeUser((user, done) => {
     done(null, user)
})

passport.deserializeUser((user, done) => {
    done(null, user)
})