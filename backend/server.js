//@ packages
const express = require("express")
const cors = require('cors')
const passport = require('passport')
 
const cookieSessions = require('./middleware/cookieSession');

// config
const db = require('./config/db');
const port = 5000
const app = express()

//Cookie Session required middleware 
app.use(cookieSessions)

//root 
app.get('/',(req,res) => {

    res.send("Okkkk")
})


db.getConnection((err,connection) => {
    if(err)throw err;
    console.log("Connection to database is successful")
})

app.listen(port, () => console.log(`app started on port no ${port}`))