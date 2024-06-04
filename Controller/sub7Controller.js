const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

const connection = require('../db/connection');


connection.connect((err) => {
    if (err) {
        console.error('데이터베이스 연결 에러', err.stack);
        return;
    }
    console.log('데이터베이스 연결 성공');
});

router.get('/', (req, res) => {
    res.render('sub7');
});



module.exports = router;