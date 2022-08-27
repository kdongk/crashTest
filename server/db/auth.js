import mysql from 'mysql2';
import { config } from '../config.js';

const database = mysql.createPool({
    host: config.db.host,
    user: config.db.user,
    password: config.db.password,
    port: config.db.port,
    database: config.db.database,
});

export async function findByEmail(email) {
    return db.execute('SELECT * FROM user WHERE email=?', [email])
        .then((result) => result[0][0]);
}

export async function findById(symbol_id) {
    return db.execute('SELECT * FROM user WHERE symbol_id=?', [symbol_id])
        .then((result) => result[0][0]);
}

export async function createUser(user) {
    const { name, email, password, nickname } = user;

    return db.execute('INSERT INTO user (name, email, password, nickname) VALUES (?,?,?,?)',
        [name, email, password, nickname]
    ).then((result) => result[0].insertId);
}

export const db = database.promise();