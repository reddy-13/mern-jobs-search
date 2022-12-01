const router = require('express').Router()
const bcrypt = require('bcryptjs');
const passport = require('passport')
const db = require("../config/db");
const dotenv = require('dotenv').config()
const jwt = require('jsonwebtoken');
const util = require('util');
nodemailer = require('nodemailer');




router.get("/login/success", (req, res) => {
    if (req.user) {
        res.status(200).json({
            user: req.user[0],
        })

    } else {
        res.status(403).json({ error: true, messgae: "Not authorised" })
    }
})


// if failed to login
router.get("/login/failed", (req, res) => {
    res.status(401).json({
        err: true,
        message: "Login failed"
    })
})

// 
router.get(
    "/google/callback",
    passport.authenticate("google", {
        successRedirect: process.env.CLIENT_URL,
        failureRedirect: "login/faild",
    }),
    (req, res) => {
        if (req.user) {
            console.log("the use is", req.user[0]); //Just for debugging
            //Creating a unique token using sign method which is provided by JWT, remember the 2nd parameter should be a secret key and that should have atleast length of 20, i have just passed 'process.envJWT_KEY' but you should not do the same and this should be kept in environment variable so that no one can see it
            const googleAuthToken = jwt.sign({ googleAuthToken: req.user[0].googleId }, process.env.JWT_KEY, { expiresIn: 86400000 })
            //res.cookie will set a cookie in user's header (i mean in users http header😂)
            console.log('google Authtoken', googleAuthToken);
            // we are saying that create a cookie with a name of googleAuthToken and we are passing the token that we generated on line no 80, and the 3rd parameter is the expire of that cookie.
            res.cookie("googleAuthToken", googleAuthToken, { expires: new Date(Date.now() + 86400 * 1000) })
            // we are now redirecting the user to localhost:3000 which is our frontend
            res.redirect(process.env.CLIENT_URL)
        }

    }
)

// update password for logged in user
router.post('/profile/password', async (req, res) => {
    console.log('res ', req.user);
    if (req.user) {
        // Hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        // util.promisify
       
           db.query("UPDATE users SET password= ? where googleId = ?",
                [hashedPassword, req.user[0].googleId],
                (err, result) => {
                    if (err) {
                        return err
                    }
                    res.json({"success" : true , message : 'password updated'})
                })
       
        
       
        const result = id()
        console.log('query', result);
    } else {
        res.status(401).json({ error: true, message: "user id not found" })
    }
})


router.post('/test',(req,res) => {
    const token = req.body.token;
    const verified_token = jwt.verify(token, process.env.JWT_RESET_PASSWORD_KEY)
    res.status(200).json({
        token : token,
        verified_token: verified_token
    })
})

// update password for reset metho

router.post('/user/password/update', async (req, res) => {
    // console.log('res ', req.body.token);
    if (req.body.token) {
        // Hash password
        let verified_token
        try{
             verified_token =  jwt.verify(req.body.token, process.env.JWT_RESET_PASSWORD_KEY)
        }catch(err){
           
            res.status(401).json({ error: true, message: `request for reset password. Your ${err.name} `})
        }
       
      

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        // util.promisify
        db.query("UPDATE users SET password= ? where id = ?",
                [hashedPassword, verified_token.id],
                (err, result) => {
                    if (err) {
                        return err
                    }
                    res.json({"success" : true , message : 'password updated'})
                }
        );
    } else {
        res.status(401).json({ error: true, message: "user id not found" })
    }
})

const sendMail = async (mailOptions) => {
    const transporter = nodemailer.createTransport({
        host: "mail.greddy.in",
        port: 465,
        secure: true,
        auth: {
            user: 'mailer@greddy.in', // generated ethereal user
            pass: ']N#27lJH@4+3', // generated ethereal password
        },

    },)
    //end of transporter
    // const mailOptions = {
    //     from: `"👻 workverse" <mailer@greddy.in>`,
    //     to: `${to_mail}`,
    //     subject: `${subject}`,
    //     text: `${text}`
    //   };
    // let info = await transporter.sendMail({
    //     from: '"Fred Foo 👻" <foo@example.com>', // sender address
    //     to: "bar@example.com, baz@example.com", // list of receivers
    //     subject: "Hello ✔", // Subject line
    //     text: "Hello world?", // plain text body
    //     html: "<b>Hello world?</b>", // html body
    //   });


}


router.post('/user/password/reset', async (req, res) => {
    // res.send(` ${process.env.MAIL_USER}`) // for debugging

    const email = req.body.email
    const subject = 'Password reset request'
    if (email) {
        db.query("select * from users where userEmail= ?",
            [email],
            (err, result) => {
                if (err) {
                    res.status(401).json({ error: true, message: 'Email id not fount' })
                }
                console.log("id >.", result[0].id);
                const token = jwt.sign({ id: result[0].id }, process.env.JWT_RESET_PASSWORD_KEY, { expiresIn: '20m' });
                const transporter = nodemailer.createTransport({
                    host: "mail.greddy.in",
                    port: 465,
                    secure: true,
                    auth: {
                        user: `${process.env.MAIL_USER}`, // username kept in .env file
                        pass: `${process.env.MAIL_PASS}`, // password kept in .env file
                    },
                }) // transporter
                const mailOptions = {
                    from: `"👻 workverse" <${process.env.MAIL_USER}>`,
                    to: `${email}`,
                    subject: `${subject}`,
                    html: `
                                    <h2>Please click below link to reset your password</h2>
                                    <p>${process.env.CLIENT_URL}reset/password/${token}</p>
                                `
                } // mail options
                // ----------------
                transporter.sendMail(mailOptions, function (error, info) {
                    console.log("sending");
                    if (error) {
                        console.log(error);
                        res.status(401).json({ error: false, message: "Somthing went worng, Please try gaian" })
                    } else {
                        res.status(200).json({ success: true, message: "Mail sent" })
                    }
                });


            }
        )








    } else {
        res.status(401).json({ error: true, message: "Wrong email" })
    }

})

router.get('/google', passport.authenticate("google", ["profile", "email"]))

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect(process.env.CLIENT_URL)
})

module.exports = router;