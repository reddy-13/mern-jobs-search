const router = require('express').Router()
const bcrypt = require('bcryptjs');
const passport = require('passport')
const asyncHandler = require('express-async-handler')
const db = require("../config/db");

router.get("/login/success", (req, res ) =>{
    if(req.user){
        res.status(200).json({
            user: req.user[0],
         })
    }else{
        res.status(403).json({error:true, messgae: "Not authorised"})
    }
})

router.get('/profile/password',asyncHandler (async (req, res) => {
    if(req.user){
        res.status(200).json(
            {
                user : req
            }
        )
        // hash password
            // const salt = await bcrypt.genSalt(10)
            // const hashedPassword = await bcrypt.hash(password, salt)
    //    db.query(
    //     "update * password users googlId= ?",
    //     [req.user[0].googleId],
    //     (err, user) => {
            
    //     }
    //    )
    }else{
        res.status(403).json({error:true, messgae: "Not authorised"})
    }
}))


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
            console.log("user", res.user);
        }
    }
)


router.get('/google', passport.authenticate("google",["profile", "email"]))

router.get('/logout',(req,res) => {
    req.logout();
    console.log('logout success')
    res.redirect(process.env.CLIENT_URL)
})

module.exports = router;