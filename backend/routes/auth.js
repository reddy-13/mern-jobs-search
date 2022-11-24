const router = require('express').Router()

const passport = require('passport')
const db = require("../config/db");

router.get("/login/success", (req, res ) =>{
    if(req.user){
        res.status(200).json({
            error:false,
            message:"login successfull",
            user: req.user,
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
            console.log("user", res.user);
        }
    }
)


router.get('/google', passport.authenticate("google",["profile", "email"]))

router.get('/logout',(req,res) => {
    req.logout();
    res.redirect(process.env.CLIENT_URL)
})

module.exports = router;