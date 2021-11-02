var dbConnect = require("../connection")
var express = require("express")
var router = express.Router();

router.post("/create", (req, res) => {
    var message = req.body.message;
    dbConnect.query(
        `INSERT INTO todo (message) VALUES ('${message}')`,
        (err, rows, fields) => {
            if (!err) res.send("task added");
            else { console.log(err,'error'); }
        }
    )
})

module.exports = router;