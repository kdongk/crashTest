import dotenv from 'dotenv';
dotenv.config();

export const config = {
    jwt: {
        secretKey: required('JWT_SECRET'),
        expiresInSec: parseInt(required('JWT_EXPIRES_SEC', 86400)),
    },
    bcrypt: {
        saltRounds: parseInt(required('BCRYPT_SALT_ROUNDS', 12)),
    },
    host: {
        port: parseInt(required('HOST_PORT', 3001)),
    },
    db: {
        host: required('DB_HOST'),
        user: required('DB_USER'),
        password: required('DB_PASSWORD'),
        port: required('DB_PORT'),
        database: required('DB_DATABASE')
    }
};

function required(key, defaultValue = undefined) {
    const value =  process.env[key] || defaultValue;
    if(value == null) {     // null, undefined 모두 true
        throw new Error(`Key ${key} is undefined`);
    }
    return value;
}