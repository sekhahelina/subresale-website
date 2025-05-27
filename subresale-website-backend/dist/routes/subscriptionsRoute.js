"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const firebase_admin_1 = tslib_1.__importDefault(require("firebase-admin"));
const router = (0, express_1.Router)();
const db = firebase_admin_1.default.firestore();
router.get('/latest', async (req, res) => {
    try {
        const snapshot = await db.collection('subscriptions').get();
        const subscriptions = [];
        const categoryMap = {};
        snapshot.forEach((doc) => {
            const data = doc.data();
            const category = data['category'];
            if (!categoryMap[category] || categoryMap[category].createdAt.toMillis() < data['createdAt'].toMillis()) {
                categoryMap[category] = data;
            }
        });
        Object.values(categoryMap).forEach((sub) => {
            subscriptions.push(sub);
        });
        res.status(200).json(subscriptions);
    }
    catch (error) {
        res.status(500).json({ message: 'Помилка при отриманні останніх підписок', error });
    }
});
router.get('/category/:category', async (req, res) => {
    const { category } = req.params;
    try {
        const snapshot = await db.collection('subscriptions').where('category', '==', category).get();
        const subscriptions = [];
        snapshot.forEach((doc) => {
            subscriptions.push(doc.data());
        });
        res.status(200).json(subscriptions);
    }
    catch (error) {
        res.status(500).json({ message: 'Помилка при отриманні підписок за категорією', error });
    }
});
exports.default = router;
