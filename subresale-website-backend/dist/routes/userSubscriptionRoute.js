"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const firebase_admin_1 = tslib_1.__importDefault(require("firebase-admin"));
const router = express_1.default.Router();
const db = firebase_admin_1.default.firestore();
const getSubscriptionsByIds = async (ids) => {
    const snapshots = await Promise.all(ids.map(async (id) => {
        const doc = await db.collection('subscriptions').doc(id).get();
        return doc.exists ? { id: doc.id, ...doc.data() } : null;
    }));
    return snapshots.filter(Boolean);
};
router.get('/sold', async (req, res) => {
    const idsParam = req.query['ids'];
    const ids = typeof idsParam === 'string' ? idsParam.split(',') : [];
    if (!ids.length) {
        return res.status(400).json({ message: 'Не вказано жодного ID' });
    }
    try {
        const subscriptions = await getSubscriptionsByIds(ids);
        return res.status(200).json(subscriptions);
    }
    catch (error) {
        return res.status(500).json({ message: 'Помилка при отриманні проданих підписок', error });
    }
});
router.get('/bought', async (req, res) => {
    const idsParam = req.query['ids'];
    const ids = typeof idsParam === 'string' ? idsParam.split(',') : [];
    if (!ids.length) {
        return res.status(400).json({ message: 'Не вказано жодного ID' });
    }
    try {
        const subscriptions = await getSubscriptionsByIds(ids);
        return res.status(200).json(subscriptions);
    }
    catch (error) {
        return res.status(500).json({ message: 'Помилка при отриманні куплених підписок', error });
    }
});
exports.default = router;
