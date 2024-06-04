const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
const connection = require('../db/connection');

//퇴직 정산
function calculateSeveranceAmount() {

}

//정산일자 셋팅
function workDay() {

}

function exclusionDay() {

}

//연봉실지급액
function annualSalaryPayment() {

}

//기초퇴직금액
function calculateSeverancePayment() {

}

//평균 임금 db 등록
function avgPayment() {

}

//연차 수당 db 등록
function annualLeaveAllowance() {

}

//경영성과급 db 등록
function managementBonus() {

}

function taxAccountantApprove() {

}

router.post('/sub3/registerAvg', (req, res) => {
    connection.query('update retirepayment set avgAmount = ' + req.body.avgAmount + ' WHERE year LIKE ' + req.body.year, (err, resulte) => {

    })

    res.render('sub3');
});

router.post('/sub3/registerAnnual', (req, res) => {
    connection.query('update retirepayment set avgAmount = ' + req.body.annualAmount + ' WHERE year LIKE ' + req.body.year, (err, resulte) => {

    })

    res.render('sub3');
})

router.post('/sub3/registerManagement', (req, res) => {
    connection.query('update retirepayment set avgAmount = ' + req.body.managementAmount + ' WHERE year LIKE ' + req.body.year, (err, resulte) => {

    })

    res.render('sub3');
})

module.exports = router;
