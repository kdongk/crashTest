const express = require("express");
const path = require('path');
const fs = require('fs');
const router = express.Router();

const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: conf.host,
    user: conf.user,
    password: conf.password,
    port: conf.port,
    database: conf.database,
});
connection.connect();

router.get("/", (req, res) => {
    res.send("server is up and running");
});

router.post("/login", (req, res) => {
    // let email = req.body.email;
    // let password = req.body.password;
    // let nick_name = req.body.nick_name;
    //
    // let checkEmail = "SELECT email FROM user WHERE email='" + email + "';";
    //
    // connection.query(checkEmail, function (err, rows) {
    //     if (rows.length == 1 && req.headers.header === "LOGIN_USER") {
    //         let sql = {
    //             email: email,
    //             password: password,
    //             nick_name: nick_name,
    //         };
    //         res.send('로그인 성공!');
    //     }
    //     else {
    //         res.send('가입하지 않은 유저입니다');
    //     }
    // });
});


router.post("/register", (req, res) => {
    console.log(req.body);

    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.password;
    let nick_name = req.body.nick_name;
    let symbol_id = null; // 자동으로 1씩 증가

    let checkEmail = "SELECT email FROM user WHERE email='" + email + "';";

    connection.query(checkEmail, function (err, rows) {
        if (rows.length == 0 && req.headers.header === "REGISTER_USER") {
            let sql = {
                name: name,
                email: email,
                password: password,
                nick_name: nick_name,
                symbol_id: symbol_id
            };

            connection.query('INSERT INTO user set ?', sql, function (err, rows) {
                if (err) throw err;
                else {
                    res.send('가입 성공');
                }
            });
        } else {
            res.send('중복된 아이디');
        }
    });
});

router.post("/home", (req, res) => {
    if (req.headers.header === "JOIN_ROOM") {
    }
});

router.post("/room", (req, res) => {
    if (req.headers.header === "") {
    }
});


module.exports = router;