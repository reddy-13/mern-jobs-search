//@ packages
const express = require("express")
const cors = require('cors')
const passport = require('passport')
const cookieSession = require("cookie-session")
// const cookieSessions = require('./middleware/cookieSession');
const passportConfig = require('./config/passport');
const authRoutes = require('./routes/auth')
// config
const db = require('./config/db');
const port = 5000
const app = express()

//Cookie Session required middleware 
app.use(cookieSession({
    name: 'authSession',
    keys: ["xxxxKKKsdsdsd@!@#$%^&&***"],
    maxAge: 24*60*60*100
}))

app.use(passport.initialize())
app.use(passport.session());

// TODO:need to add cors with methods GET,POST,PUT,DELETE credentials:true 
//root 
app.get('/',(req,res) => {

    res.send("Welcome to workverse API ")
})

app.use('/auth', authRoutes)




db.getConnection((err,connection) => {
    if(err)throw err;
    console.log("Connection to database is successful")
})

app.listen(port, () => console.log(`app started on port no ${port}`))