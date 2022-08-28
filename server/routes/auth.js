import express from "express";
import * as authController from '../controller/auth.js';

const router = express.Router();

router.get("/", (req, res) => {
    res.send("server is up and running");
});

router.post("/login", authController.login);
router.post("/register", authController.signup);


router.post("/home", (req, res) => {
    if (req.headers.header === "JOIN_ROOM") {
    }
});

router.post("/room", (req, res) => {
    if (req.headers.header === "") {
    }
});


export default router;
