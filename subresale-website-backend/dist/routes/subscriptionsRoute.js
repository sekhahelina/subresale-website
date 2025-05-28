"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const index_1 = require("../index");
const router = (0, express_1.Router)();
router.get('/latest-by-categories', async (req, res) => {
    try {
        const snapshot = await index_1.db
            .collection('subscriptions')
            .where('isSold', '==', false)
            .get();
        const subscriptions = [];
        const categoryMap = {};
        snapshot.forEach((doc) => {
            const data = doc.data();
            const category = data['category'];
            if (!categoryMap[category] ||
                categoryMap[category].createdAt.toMillis() < data['createdAt'].toMillis()) {
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
        const snapshot = await index_1.db
            .collection('subscriptions')
            .where('category', '==', category)
            .where('isSold', '==', false)
            .get();
        const subscriptions = [];
        snapshot.forEach((doc) => {
            subscriptions.push({ id: doc.id, ...doc.data() });
        });
        res.status(200).json(subscriptions);
    }
    catch (error) {
        res.status(500).json({ message: 'Помилка при отриманні підписок за категорією', error });
    }
});
exports.default = router;
