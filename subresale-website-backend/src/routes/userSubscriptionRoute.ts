import express, { Request, Response } from 'express';
import admin from 'firebase-admin';

const router = express.Router();
const db = admin.firestore();

const getSubscriptionsByIds = async (ids: string[]) => {
    const snapshots = await Promise.all(
        ids.map(async (id) => {
            const doc = await db.collection('subscriptions').doc(id).get();
            return doc.exists ? { id: doc.id, ...doc.data() } : null;
        })
    );
    return snapshots.filter(Boolean);
};

router.get('/sold', async (req: Request, res: Response) => {
    const idsParam = req.query['ids'];
    const ids = typeof idsParam === 'string' ? idsParam.split(',') : [];

    if (!ids.length) {
        return res.status(400).json({ message: 'Не вказано жодного ID' });
    }

    try {
        const subscriptions = await getSubscriptionsByIds(ids);
        return res.status(200).json(subscriptions);
    } catch (error) {
        return res.status(500).json({ message: 'Помилка при отриманні проданих підписок', error });
    }
});

router.get('/bought', async (req: Request, res: Response) => {
    const idsParam = req.query['ids'];
    const ids = typeof idsParam === 'string' ? idsParam.split(',') : [];

    if (!ids.length) {
        return res.status(400).json({ message: 'Не вказано жодного ID' });
    }

    try {
        const subscriptions = await getSubscriptionsByIds(ids);
        return res.status(200).json(subscriptions);
    } catch (error) {
        return res.status(500).json({ message: 'Помилка при отриманні куплених підписок', error });
    }
});

export default router;