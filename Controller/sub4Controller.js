const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
const connection = require('../db/connection');


function getData() {

}

//req: 주소창
router.get('/', (req, res) => {
    const employeeNo = req.query.employeeCode;
    connection.query("SELECT * FROM retirePayment WHERE employeeNo LIKE ?", [employeeNo], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Database query error');
        } else {
            res.render('sub4', {
                allRetirePayment: result
            });
        }
    });
})

module.exports = router;
