import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export const generateToken = (payload, options) => jwt.sign(payload, JWT_SECRET, options);

export const decodeToken = (token, options) => jwt.verify(token, JWT_SECRET, options);
