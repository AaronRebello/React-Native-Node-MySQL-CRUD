var express = require("express")
var dbConnect = require("./connection")
var create = require("./Route/create")
var read = require("./Route/read")
var update = require("./Route/update")
var del = require("./Route/delete")
var app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use('/api', create, read, update, del)

// dbConnect.query("create table todo (id int NOT NULL AUTO_INCREMENT PRIMARY KEY,message varchar(1000))",
//     (err, rows, fields) => {
//         if (!err) console.log(rows)
//         else { console.log(err); }
//     });
app.listen(3000, () => {
    console.log("http://localhost:3000")
})