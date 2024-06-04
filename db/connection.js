const mysql = require('mysql2');


// 각자 설정에 맞게 설정


const connection = mysql.createConnection({
    // 이건 건들필요 없음
    host: 'localhost',
    // 계정 이름
    user: 'root',
    // 계정 비번
    password: 'asdf15963',
    // 스키마 명
    database: 'src',
});

module.exports = connection;
