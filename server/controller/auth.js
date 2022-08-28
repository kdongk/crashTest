import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import * as userDB from '../db/auth.js';
import { config } from '../config.js';

export async function signup(req, res) {
    const { name, email, password, nickname } = req.body;

    const found = await userDB.findByEmail(email);
    if (found) {
        return res.status(409).json({ message: '이미 가입한 이메일입니다.', validate: false });
    }
    const hashed = await bcrypt.hash(password, config.bcrypt.saltRounds);
    const newUser = await userDB.createUser({
        name,
        email,
        password,   // password: hashed,
        nickname,
    });
    const token = createJwtToken(newUser);
    res.status(201).json({ token, email });
}


export async function login(req, res) {
    const { email, password } = req.body;
    const user = await userDB.findByEmail(email);
    if (!user) {
        return res.status(401).json({ message: '일치하는 이메일이 없습니다.', validate: false });
    }

    const isValidPassword = (password === user.password);  // await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
        return res.status(401).json({ message: '비밀번호가 틀렸습니다.', validate: false });
    }
    const token = createJwtToken(user.email);
    res.status(200).json({ token, email });
}

function createJwtToken(email) {
    return jwt.sign({ email }, config.jwt.secretKey, { expiresIn: config.jwt.expiresInSec });
}