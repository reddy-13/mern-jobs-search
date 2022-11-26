const router = require('express').Router()
const bcrypt = require('bcryptjs');
const passport = require('passport')
const db = require("../config/db");
const dotenv = require('dotenv').config()
const jwt = require('jsonwebtoken');
router.get("/login/success", (req, res ) =>{
    if(req.user){
        res.status(200).json({
            user: req.user[0],
         })
        
    }else{
        res.status(403).json({error:true, messgae: "Not authorised"})
    }
})


// if failed to login
router.get("/login/failed", (req, res ) =>{
     res.status(401).json({
        err:true,
        message:"Login failed"
     })
})

// 
router.get(
    "/google/callback",
    passport.authenticate("google",{
        successRedirect: process.env.CLIENT_URL,
        failureRedirect: "login/faild",
    }),
    (req,res) => {
        if(req.user){
            console.log("the use is", req.user[0]); //Just for debugging
              //Creating a unique token using sign method which is provided by JWT, remember the 2nd parameter should be a secret key and that should have atleast length of 20, i have just passed 'process.envJWT_KEY' but you should not do the same and this should be kept in environment variable so that no one can see it
            const googleAuthToken = jwt.sign({googleAuthToken: req.user[0].googleId}, process.env.JWT_KEY, {expiresIn:86400000 })
            //res.cookie will set a cookie in user's header (i mean in users http header😂)
            console.log('google Authtoken', googleAuthToken);
            // we are saying that create a cookie with a name of googleAuthToken and we are passing the token that we generated on line no 80, and the 3rd parameter is the expire of that cookie.
            res.cookie("googleAuthToken", googleAuthToken, {expires: new Date(Date.now() + 86400 * 1000)})
              // we are now redirecting the user to localhost:3000 which is our frontend
            res.redirect(process.env.CLIENT_URL)
          }

    }
)

router.post('/profile/password',async (req, res) => {
    console.log('res ', req.user);
    if(req.user){
        // Hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt) 
        db.query("UPDATE users SET password= ? where googleId = ?",
        [hashedPassword,req.user[0].googleId],
        (err, result) =>{
            if(err){
                res.status(401).json({error: err, msg : "Failed to update"})
            }else{
                res.status(200).json({success :true, msg: 'password update successfully'});
            }
        }
        )
    }else{
        res.status(401).json({error: true, msg : "user id not found"})
    }
})


router.get('/google', passport.authenticate("google",["profile", "email"]))

router.get('/logout',(req,res) => {
    req.logout();
    res.redirect(process.env.CLIENT_URL)
})

module.exports = router;