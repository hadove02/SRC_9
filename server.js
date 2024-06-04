const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const app = express();
const port = 8080;
const connection = require('./db/connection');


app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); 



//  도메인 별로 관리
const sub1 = require('./Controller/sub1Controller.js');
const sub2 = require('./Controller/sub2Controller.js');
const sub3 = require('./Controller/sub3Controller.js');
const sub4 = require('./Controller/sub4Controller.js');
const sub5 = require('./Controller/sub5Controller.js');
const sub6 = require('./Controller/sub6Controller.js');
const sub7 = require('./Controller/sub7Controller.js');
const sub8 = require('./Controller/sub8Controller.js');
const sub9 = require('./Controller/sub9Controller.js');
const sub10 = require('./Controller/sub10Controller.js');
const sub11 = require('./Controller/sub11Controller.js');
const sub12 = require('./Controller/sub12Controller.js');

app.use('/sub1', sub1);
app.use('/sub2', sub2);
app.use('/sub3', sub3);
app.use('/sub4', sub4);
app.use('/sub5', sub5);
app.use('/sub6', sub6);
app.use('/sub7', sub7);
app.use('/sub8', sub8);
app.use('/sub9', sub9);
app.use('/sub10', sub10);
app.use('/sub11', sub11);
app.use('/sub12', sub12);



app.get('/', (req, res) => {
    res.render('main');
});

app.post('/submit-contract', (req, res) => {
    
    const { contractManager, contractName, contractAmount, contractStartDate, 
        contractEndDate, contractStatus, remarks, clientName, 
        clientAddress, clientRepresentative } = req.body;

    const query = `
        INSERT INTO contracts (contractManager, contractName, contractAmount,
            contractStartDate, contractEndDate, contractStatus,
            remarks, clientName, clientAddress, clientRepresentative)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [contractManager, contractName, contractAmount, contractStartDate, 
        contractEndDate, contractStatus, remarks, clientName, clientAddress, clientRepresentative];

    connection.query(query, values, (err, results) => {
        if (err) {
            console.error('데이터 생성 실패', err.stack);
            return res.status(500).send('데이터베이스 오류');
        }
        res.render('main');
    });
});



app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on port ${port}`);
    console.log(`Access the server at http://localhost:${port}`);
});
