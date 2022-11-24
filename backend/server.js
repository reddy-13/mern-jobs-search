//@ packages
const express = require("express")
const cors = require('cors')
const passport = require('passport')
 
const cookieSessions = require('./middleware/cookieSession');
const passportConfig = require('./config/passport');

// config
const db = require('./config/db');
const port = 5000
const app = express()

//Cookie Session required middleware 
app.use(cookieSessions)

app.use(passport.initialize())
app.use(passport.session());

// TODO:need to add cors with methods GET,POST,PUT,DELETE credentials:true 
//root 
app.get('/',(req,res) => {

    res.send("Okkkk")
})




db.getConnection((err,connection) => {
    if(err)throw err;
    console.log("Connection to database is successful")
})

app.listen(port, () => console.log(`app started on port no ${port}`))