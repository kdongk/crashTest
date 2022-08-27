import express from "express";
import mysql from "mysql";
import { body } from 'express-validator';

// import { validate } from '../middleware/validator.js';   // 훗날 수정
import * as authController from '../controller/auth.js';
import {isAuth} from "../middleware/auth.js";

const router = express.Router();



router.get("/", (req, res) => {
    res.send("server is up and running");
});

router.post("/login", authController.login);
//     if (req.headers.header === 'LOGIN_USER'){}

router.post("/register", authController.signup);
//     if (req.headers.header === "REGISTER_USER") {}


// router.get('/me', isAuth, authController.me);

router.post("/home", (req, res) => {
    if (req.headers.header === "JOIN_ROOM") {
    }
});

router.post("/room", (req, res) => {
    if (req.headers.header === "") {
    }
});


export default router;
