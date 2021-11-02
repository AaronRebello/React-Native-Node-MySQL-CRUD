var dbConnect = require("../connection")
var express = require("express")
var router = express.Router();

router.put("/update:id", (req, res) => {
    var id = req.params.id;
    var message = req.body.message;

    dbConnect.query(
        `UPDATE todo set message='${message}' where id=${id}`,
        (err, rows, fields) => {
            if (!err) res.send("task updated");
            else { console.log(err, 'error'); }
        }
    )
})

module.exports = router;