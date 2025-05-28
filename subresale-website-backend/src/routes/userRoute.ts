import express, { Request, Response } from 'express';
import admin from 'firebase-admin';

const router = express.Router();
const db = admin.firestore();
const usersCollection = db.collection('users');
const subscriptionsCollection = db.collection('subscriptions');

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

router.patch('/:id/buy-subscription', async (req, res) => {
    const { id } = req.params;
    const { subscriptionId } = req.body;

    if (!subscriptionId) {
        return res.status(400).json({ message: 'Missing subscriptionId' });
    }

    try {
        const userRef = usersCollection.doc(id);
        const subscriptionRef = subscriptionsCollection.doc(subscriptionId);

        const [userSnap, subscriptionSnap] = await Promise.all([
            userRef.get(),
            subscriptionRef.get()
        ]);

        if (!userSnap.exists) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (!subscriptionSnap.exists) {
            return res.status(404).json({ message: 'Subscription not found' });
        }

        const subscriptionData = subscriptionSnap.data();
        if (!subscriptionData) {
            return res.status(404).json({ message: 'Subscription data not found' });
        }

        if (subscriptionData['isSold']) {
            return res.status(400).json({ message: 'Subscription already sold' });
        }

        await subscriptionRef.update({ isSold: true });
        await userRef.update({
            boughtSubscriptions: admin.firestore.FieldValue.arrayUnion(subscriptionId)
        });

        const updatedUserDoc = await userRef.get();
        return res.json(formatUser(updatedUserDoc));
    } catch (error) {
        console.error("Buy subscription error:", error);
        return res.status(500).json({ message: 'Server error', error });
    }
});

router.patch('/:id/add-sold-subscription', async (req: Request, res: Response) => {
    const { id } = req.params;
    const {
        title,
        category,
        description,
        expiresAt,
        image,
        pricePerMonth
    } = req.body;

    if (!title || !category || !description || !expiresAt || !image || !pricePerMonth) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        const userRef = usersCollection.doc(id);
        const userDoc = await userRef.get();

        if (!userDoc.exists) {
            return res.status(404).json({ message: 'User not found' });
        }

        const newSubscription = {
            title,
            category,
            description,
            expiresAt,
            image,
            pricePerMonth: pricePerMonth.toString(), // Зберігаємо як рядок (як у твоєму прикладі)
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
            isSold: false
        };

        const newSubRef = await subscriptionsCollection.add(newSubscription);

        // Додаємо ID нової підписки у soldSubscriptions користувача
        await userRef.update({
            soldSubscriptions: admin.firestore.FieldValue.arrayUnion(newSubRef.id)
        });

        const updatedUserDoc = await userRef.get();
        return res.status(201).json(formatUser(updatedUserDoc));
    } catch (error) {
        console.error('Add sold subscription error:', error);
        return res.status(500).json({ message: 'Server error', error });
    }
});

export default router;