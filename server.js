const express = require("express")
const mysql = require("mysql")

const app = express()
app.use(express.json())

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "nodejs"
}) 

connection.connect((err) =>{
    if (err) {
        console.log("Mysql Error Connecting: ",err)
        return
    }
    console.log("Mysql Connecting Successfully!")
})

app.get("/getdata", async (req,res) =>{
    const username = req.query.username
    try {
        connection.query("SELECT * FROM `customer` WHERE username = ?", [username], (err,result,fields) => {
            if (err) {
                console.log(err);
                return res.status(400).send()
            }
            res.status(200).json(result)
        })
    } 
    catch(err) {
        console.log(err);
        return res.status(500).send()
    }
})

app.post("/postdata", async (req,res) =>{
    const { name, email, username, password } = req.body
    try {
        connection.query("INSERT INTO customer(name, email, username, password) VALUES (?, ?, ?, ?)",
        [name, email, username, password], (err,result,fields) => {
            if (err) {
                console.log(err);
                return res.status(400).send()
            }
            res.status(201).json({ message: "Add data successfully!" })
        })
    } 
    catch(err) {
        console.log(err);
        return res.status(500).send()
    }
})


app.listen(8000,() => console.log("Server is runing port 8000"))