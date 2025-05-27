"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const tslib_1 = require("tslib");
const hashService_1 = require("../services/hashService");
const tokenService_1 = require("../services/tokenService");
const firebase_admin_1 = tslib_1.__importDefault(require("firebase-admin"));
if (!firebase_admin_1.default.apps.length) {
    firebase_admin_1.default.initializeApp({
        credential: firebase_admin_1.default.credential.applicationDefault(),
    });
}
const db = firebase_admin_1.default.firestore();
const register = async (req, res) => {
    try {
        const { firstName, lastName, email, phone, password } = req.body;
        const usersRef = db.collection('users');
        const snapshot = await usersRef.where('email', '==', email).get();
        if (!snapshot.empty) {
            res.status(400).json({ message: 'User already exists' });
            return;
        }
        const hashedPassword = await (0, hashService_1.hashPassword)(password);
        const newUserRef = await usersRef.add({
            firstName,
            lastName,
            email,
            phone,
            password: hashedPassword,
            soldSubscriptions: '',
            boughtSubscriptions: '',
            createdAt: new Date().toISOString(),
        });
        const token = (0, tokenService_1.generateToken)(newUserRef.id);
        res.status(201).json({
            token,
            user: {
                id: newUserRef.id,
                firstName,
                lastName,
                email,
                phone,
                soldSubscriptions: '',
                boughtSubscriptions: '',
                createdAt: new Date().toISOString(),
            },
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Registration failed', error });
    }
};
exports.register = register;
