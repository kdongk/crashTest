import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import * as userDB from '../db/auth.js';
import { config } from "../config.js";

export async function signup(req, res) {
    const { name, email, password, nickname } = req.body;
    const found = await userDB.findByEmail(email);
    if (found) {
        return res.status(409).json({ message: `${email} already exists` });
    }
    const hashed = await bcrypt.hash(password, config.bcrypt.saltRounds);
    const userId = await userDB.createUser({
        name,
        email,
        password,   // password: hashed,
        nickname,
    });
    const token = createJwtToken(userId);
    res.status(201).json({ token, email });
}


export async function login(req, res) {
    const { email, password } = req.body;
    const user = await userDB.findByEmail(email);
    if (!user) {
        return res.status(401).json({ message: 'Invalid user' });
    }

    const isValidPassword = (password === user.password);  // await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
        return res.status(401).json({ message: 'Invalid password' });
    }
    const token = createJwtToken(user.email);
    res.status(200).json({ token, email });
}

function createJwtToken(email) {
    return jwt.sign({ email }, config.jwt.secretKey, { expiresIn: config.jwt.expiresInSec });
}



// export async function me(req, res, next) {
//     const user = await userRepository.findById(req.userId);   // req.userId 직접만든 값
//     if (!user) {
//         return res.status(404).json({ message: 'User not found' });
//     }
//     res.status(200).json({ token: req.token, username: user.username });
// }

