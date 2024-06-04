const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
const connection = require('../db/connection');


router.get('/', (req, res) => {
    
    const queryAll = 'SELECT * FROM contracts';
    const queryChungbuk = "SELECT * FROM contracts WHERE clientAddress LIKE '%충청북도%'";

    connection.query(queryAll, (errAll, resultsAll) => {
        if (errAll) {
            console.error('데베오류:', errAll.stack);
            return res.status(500).send('데베오류');
        }

        connection.query(queryChungbuk, (errChungbuk, resultsChungbuk) => {
            if (errChungbuk) {
                console.error('데베오류:', errChungbuk.stack);
                return res.status(500).send('데베오류');
            }

            res.render('sub8', { 
                allContracts: resultsAll, 
                chungbukContracts: resultsChungbuk 
            });
        });
    });

    
});


module.exports = router;
