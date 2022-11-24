const express = require("express")
const dotenv = require('dotenv').config()

const port = 5000

const app = express()
app.get('/',(req,res) => {
    res.send("Hello")
})
app.listen(port, () => console.log(`app started on port no ${port}`))