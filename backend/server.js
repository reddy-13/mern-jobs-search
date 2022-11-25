//@ packages
const express = require("express")
const cors = require('cors')
const passport = require('passport')
const cookieSession = require("cookie-session")
// const cookieSessions = require('./middleware/cookieSession');
const passportConfig = require('./middleware/passport');
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

app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

// TODO:need to add cors with methods GET,POST,PUT,DELETE credentials:true 
app.use(cors({
    origin: "http://localhost:3000", 
    methods: "GET,POST,PUT,DELTE", //only localhost:3000 can access this server
    credentials: true  //Responding with this header to true means that the server allows cookies (or other user credentials) to be included on cross-origin requests. 
}))

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