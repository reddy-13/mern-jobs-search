//@ packages
const path = require('path')
const express = require("express")
const cors = require('cors')
const passport = require('passport')
const cookieSession = require("cookie-session")
// const cookieSessions = require('./middleware/cookieSession');
const passportConfig = require('./middleware/passport');
const authRoutes = require('./routes/auth')
// config
const db = require('./config/db');
const port = process.env.PORT || 5000
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


app.use('/auth', authRoutes)

// server fronent for production
if(process.env.NODE_ENV === "production"){
    app._router.use(express.static(path.join(__dirname,'../frontend/build')))
    app.get('*',(req,res) => res.sendFile(path.resolve(__dirname,'../','fronend','build','index.html')))
}else{
    app.get('/',(req,res) => {

        res.send("Welcome to workverse API ")
    })
    
    app.post('/',(req,res) => {
        console.log('post >',req.body);
        res.status(200).json({msg : "wokign post route"})
    })
}
db.getConnection((err,connection) => {
    if(err)throw err;
    console.log("Connection to database is successful")
})

app.listen(port, () => console.log(`app started on port no ${port}`))