const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
const connection = require('../db/connection');


function getData() {

}

router.get('/', (req, res) => {
    connection.query("select * from retirePayment", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log("sub4 success")
            console.log(result)
            res.render('sub4', {
                allRetirePayment: result
            });
        }
    })
});


module.exports = router;
