import jwt from 'jsonwebtoken';
import * as userDB from '../db/auth.js';
import { config } from "dotenv";
import { body } from "express-validator";

const AUTH_ERROR = { message: 'Authentication Error' };

// 토큰이 있어야만 가능한 행위들 검증
export const isAuth = async (req, res, next) => {
    const authHeader = req.get('Authorization');
    if (!(authHeader && authHeader.startsWith('Bearer '))) {
        return res.status(401).json(AUTH_ERROR);
    }

    const token = authHeader.split(' ')[1];
    jwt.verify(
        token,
        config.jwt.secretKey,
        async (error, decode) => {
            if (error) {
                return res.status(401).json(AUTH_ERROR);
            }
            const user = await userDB.findById(decode.id);
            if (!user) {
                return res.status(401).json(AUTH_ERROR);
            }
            req.userId = user.id;
            next();
        }
    )
}

// 회원가입 유효성 검증
export const validateSignup = [
    body('email').isEmail().normalizeEmail().withMessage('이메일 형식이 잘못됐습니다.'),
    body('password').trim().isLength({ min: 5 })
        .withMessage('비밀번호는 5글자 이상입니다.'),
    body('name').notEmpty().withMessage('이름을 입력하세요.'),
    body('nickname').notEmpty().withMessage('닉네임을 입력하세요.'),
];
