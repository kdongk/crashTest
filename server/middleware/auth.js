import jwt from 'jsonwebtoken';
import * as userDB from '../db/auth.js';
import { config } from "dotenv";
import {body} from "express-validator";

const AUTH_ERROR = { message: 'Authentication Error' };

// 인증 처리

export const isAuth = async (req, res, next) => {
    const authHeader = req.get('Authorization');
    if (!(authHeader && authHeader.startsWith('Bearer '))) {
        return res.status(401).json(AUTH_ERROR);
    }

    const token = authHeader.split(' ')[1];
    jwt.verify(
        token,
        config.jwt.secretKey,   // 자동 비밀번호 32글자
        async (error, decode) => {
            if (error) {
                return res.status(401).json(AUTH_ERROR);
            }
            const user = await userDB.findById(decode.id);
            if (!user) {
                return res.status(401).json(AUTH_ERROR);
            }
            req.userId = user.id;  // req.userId로 내가 새롭게 값을 만든다
            next();
        }
    )
}

const validateCredential = [
    body('username')
        .trim()
        .notEmpty()
        .withMessage('username should be at least 5 characters'),
    body('password')
        .trim()
        .isLength({ min: 5 })
        .withMessage('password should be at least 5 characters'),
];

const validateSignup = [
    ...validateCredential,
    body('name').notEmpty().withMessage('name is missing'),
    body('email').isEmail().normalizeEmail().withMessage('invalid email'),
    body('url')
        .isURL()
        .withMessage('invalid URL')
        .optional({ nulable: true, checkFalsy: true }),
];
