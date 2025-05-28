import express, { Request, Response } from 'express';
import admin from 'firebase-admin';

const router = express.Router();
const db = admin.firestore();
const usersCollection = db.collection('users');

function formatUser(doc: FirebaseFirestore.DocumentSnapshot): Record<string, any> | null {
    const user = doc.data();
    if (!user) return null;

    return {
        id: doc.id,
        ...user,
        boughtSubscriptions: Array.isArray(user['boughtSubscriptions']) ? user['boughtSubscriptions'] : [],
        soldSubscriptions: Array.isArray(user['soldSubscriptions']) ? user['soldSubscriptions'] : [],
    };
}

router.get('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const doc = await usersCollection.doc(id).get();

        if (!doc.exists) {
            return res.status(404).json({ message: 'User not found' });
        }

        const formattedUser = formatUser(doc);
        return res.json(formattedUser);
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error });
    }
});

router.put('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const { firstName, lastName, email, phone } = req.body;

    try {
        const userRef = usersCollection.doc(id);
        const doc = await userRef.get();

        if (!doc.exists) {
            return res.status(404).json({ message: 'User not found' });
        }

        const updateFields: any = {};
        if (firstName) updateFields['firstName'] = firstName;
        if (lastName) updateFields['lastName'] = lastName;
        if (email) updateFields['email'] = email;
        if (phone) updateFields['phone'] = phone;

        await userRef.update(updateFields);
        const updatedDoc = await userRef.get();

        return res.json(formatUser(updatedDoc));
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error });
    }
});

router.patch('/:id/add-bought-subscription', async (req: Request, res: Response) => {
    const { id } = req.params;
    const { subscriptionId } = req.body;

    if (!subscriptionId) {
        return res.status(400).json({ message: 'Missing subscriptionId' });
    }

    try {
        const userRef = usersCollection.doc(id);
        const doc = await userRef.get();

        if (!doc.exists) {
            return res.status(404).json({ message: 'User not found' });
        }

        await userRef.update({
            boughtSubscriptions: admin.firestore.FieldValue.arrayUnion(subscriptionId),
        });

        const updatedDoc = await userRef.get();
        return res.json(formatUser(updatedDoc));
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error });
    }
});

router.patch('/:id/add-sold-subscription', async (req: Request, res: Response) => {
    const { id } = req.params;
    const { subscriptionId } = req.body;

    if (!subscriptionId) {
        return res.status(400).json({ message: 'Missing subscriptionId' });
    }

    try {
        const userRef = usersCollection.doc(id);
        const doc = await userRef.get();

        if (!doc.exists) {
            return res.status(404).json({ message: 'User not found' });
        }

        await userRef.update({
            soldSubscriptions: admin.firestore.FieldValue.arrayUnion(subscriptionId),
        });

        const updatedDoc = await userRef.get();
        return res.json(formatUser(updatedDoc));
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error });
    }
});

export default router;