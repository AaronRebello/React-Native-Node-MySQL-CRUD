var dbConnect = require("../connection");
var express = require("express");
var router = express.Router();

router.delete("/delete:id", (req, res) => {
    var id = req.params.id;
    dbConnect.query(
        `DELETE FROM todo where id=${id}`,
        (err, rows, fields) => {
            if (!err) res.send("task Deleted");
            else res.send(err, "error occured");
        }
    );
});
module.exports = router;