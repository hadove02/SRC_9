const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
const connection = require('../db/connection');

router.get('/', (req, res) => {
    res.render('sub12');
});


module.exports = router;
