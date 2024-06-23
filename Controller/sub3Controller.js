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
                    const approvalDays = result[0].approval;

                    let currentYear = startDate.getFullYear();
                    const endYear = endDate.getFullYear();
                    let yearDays = [];

                    // 각 연도별로 근무일 계산
                    while (currentYear <= endYear) {
                        const startOfYear = new Date(currentYear, 0, 1); // 해당 연도의 시작
                        const endOfYear = new Date(currentYear, 11, 31, 23, 59, 59); // 해당 연도의 끝
                        const currentStart = currentYear === startDate.getFullYear() ? startDate : startOfYear;
                        const currentEnd = currentYear === endYear ? endDate : endOfYear;

                        const diffTime = Math.max(0, currentEnd - currentStart);
                        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                        if (diffDays > 0) {
                            yearDays.push([currentYear, diffDays - approvalDays])
                        }
                        currentYear++;
                    }
                    resolve(yearDays);
                } else {
                    resolve([]); // 결과가 없는 경우, 빈 배열 반환
                }
            }
        });
    });
}


//기초퇴직금액
function calculateSeverancePayment() {

}

//월급 반환
async function getSalary(careerInfoId) {
    return new Promise((resolve, reject) => {
        const query = "SELECT salary FROM employeeinfo WHERE careerInfoId LIKE ?";
        connection.query(query, [careerInfoId], (err, result) => {
            if (err) {
                console.log(err);
            } else {
                if (result.length > 0) {
                    resolve(result[0].salary);
                } else {
                    resolve("");
                }
            }
        })
    })
}

async function getCareerInfoId(employeeCode) {
    return new Promise((resolve, reject) => {
        const careerInfoId = connection.query("SELECT careerInfoId FROM employeeinfo WHERE careerInfoId LIKE ?", [employeeCode], (err, result) => {
            if (err) {
                console.log(err);
            } else {
                if (result.length > 0) {
                    resolve(result[0].careerInfoId);
                } else {
                    resolve("");
                }
            }
        });
    })
}

function taxAccountantApprove() {

}

router.get('/', async (req, res) => {
    const employeeCode = req.query.employeeCode;
    const careerInfoId = await getCareerInfoId(employeeCode);
    //const careerInfoId = req.query.careerInfoId;

    try {
        const workDays = await workDay(careerInfoId); // await를 사용해 비동기 처리
        //월급
        const salary = await getSalary(careerInfoId);

        for (let i = 0; i < workDays.length; i++) {
            const year = workDays[i][0];
            const days = workDays[i][1];

            const calAvgPayment = salary / days;
            //경영성과급 임의로 설정
            const managementBonus = 200000;
            //연봉실지급액
            const annualSalaryPayment = salary * 12 + managementBonus;
            //기초퇴직금액
            const severancePayment = annualSalaryPayment / 12;
            //퇴직 금액
            const severance = severancePayment + managementBonus;

            const query = "INSERT INTO retirepayment (year, severanceAmount, avgAmount, annualAmount, managementAmount, employeeNo) VALUES (?,?,?,?,?,?)"
            connection.query(query, [year, severance, calAvgPayment, annualSalaryPayment, managementBonus, employeeCode], (err, result) => {
                if (err) {
                    console.log(err);
                }
            })
        }
        res.render('sub3',);
    } catch (error) {
        console.error(error);
        res.status(500).send("서버 에러 발생");
    }
});
module.exports = router;
