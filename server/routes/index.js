const express = require('express');
//const path = require('path');
const router = express.Router();

router.get("/", (req, res) => {
    res.send("server is up and running");
});

router.post("/login", (req, res) => {
    //res.send({ data: { validity: true } });
    if(req.headers.header === 'LOGIN_USER'){
        //DB 확인
        //DB에 겹치는게 있으면
        res.send({ data : { user: '', validity: true } });
    }

});

router.post("/register", (req, res) => {
    //res.send({ data: { validity: true } });
    if(req.headers.header === 'REGISTER_USER'){
        //DB 확인
        //DB에 겹치는게 없으면
        //req.body.email, req.body.password DB에 push
        const data ={
            validity : true,
        };
        res.send(data);

        console.log(data);

    }
});

router.post("/home", (req, res) => {
    if(req.headers.header === ''){

    }
});

router.post("/room", (req, res) => {
    if(req.headers.header === ''){

    }
});


module.exports = router;