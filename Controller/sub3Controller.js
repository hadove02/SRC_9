const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
const connection = require('../db/connection');

//퇴직 정산
function calculateSeveranceAmount() {

}

//정산일자 셋팅
async function workDay(careerInfoId) {
    return new Promise((resolve, reject) => {
        const query = "SELECT startDate, endDate, approval FROM internalmobility WHERE careerInfoId LIKE ?";
        connection.query(query, [careerInfoId], (err, result) => {
            if (err) {
                console.log(err);
                reject(err); // 에러 발생 시, reject 호출
            } else {
                if (result.length > 0) {
                    const startDate = new Date(result[0].startDate);
                    const endDate = new Date(result[0].endDate);
                    const diffTime = Math.abs(endDate - startDate);
                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                    console.log(diffDays - result[0].approval);
                    resolve(diffDays - result[0].approval); // 날짜 차이를 resolve로 반환
                } else {
                    resolve(""); // 결과가 없는 경우, 빈 문자열 반환
                }
            }
        });
    });
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

router.get('/', async (req, res) => {
    const careerInfoId = req.query.careerInfoId;

    try {
        const workDays = await workDay(careerInfoId); // await를 사용해 비동기 처리
        res.render('sub3', {
            workDay: workDays
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("서버 에러 발생");
    }
});
module.exports = router;
