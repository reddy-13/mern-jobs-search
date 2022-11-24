const express = require("express")
const port = 5000
const db = require('./config/db');
const app = express()


app.get('/',(req,res) => {
   
    res.send("Okkkk")
})


db.getConnection((err,connection) => {
    if(err)throw err;
    console.log("Connection to database is successful")
})

app.listen(port, () => console.log(`app started on port no ${port}`))