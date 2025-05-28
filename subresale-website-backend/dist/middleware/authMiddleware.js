"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const tokenService_1 = require("../services/tokenService");
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ message: 'Authorization header missing or malformed' });
        return;
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = (0, tokenService_1.verifyToken)(token);
        req.userId = decoded.id;
        next();
    }
    catch (error) {
        res.status(401).json({ message: 'Unauthorized: Invalid or expired token' });
    }
};
exports.authMiddleware = authMiddleware;
