var dbConnect = require("../connection")
var express = require("express")
var router = express.Router();

router.get("/read", (req, res) => {
    var message = req.body.message;
    dbConnect.query(
        `SELECT * from todo`,
        (err, rows, fields) => {
            if (!err) res.send(rows);
            else { console.log(err, 'error'); }
        }
    )
})

module.exports = router;