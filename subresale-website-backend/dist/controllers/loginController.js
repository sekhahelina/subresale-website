"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const hashService_1 = require("../services/hashService");
const tokenService_1 = require("../services/tokenService");
const index_1 = require("../index"); // ⬅️ імпорт з index.ts
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const usersRef = index_1.db.collection('users');
        const snapshot = await usersRef.where('email', '==', email).get();
        if (snapshot.empty) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        const userDoc = snapshot.docs[0];
        const user = userDoc.data();
        const isMatch = await (0, hashService_1.comparePassword)(password, user['password']);
        if (!isMatch) {
            res.status(401).json({ message: 'Incorrect password' });
            return;
        }
        const token = (0, tokenService_1.generateToken)(userDoc.id);
        res.json({
            token,
            user: {
                id: userDoc.id,
                firstName: user['firstName'],
                lastName: user['lastName'],
                email: user['email'],
                phone: user['phone'],
                soldSubscriptions: user['soldSubscriptions'],
                boughtSubscriptions: user['boughtSubscriptions'],
                createdAt: user['createdAt'],
            },
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Login failed', error });
    }
};
exports.login = login;
