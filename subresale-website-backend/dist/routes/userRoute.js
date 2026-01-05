"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const firebase_admin_1 = tslib_1.__importDefault(require("firebase-admin"));
const router = express_1.default.Router();
const db = firebase_admin_1.default.firestore();
const usersCollection = db.collection('users');
const subscriptionsCollection = db.collection('subscriptions');
function formatUser(doc) {
    const user = doc.data();
    if (!user)
        return null;
    return {
        id: doc.id,
        ...user,
        boughtSubscriptions: Array.isArray(user['boughtSubscriptions']) ? user['boughtSubscriptions'] : [],
        soldSubscriptions: Array.isArray(user['soldSubscriptions']) ? user['soldSubscriptions'] : [],
    };
}
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const doc = await usersCollection.doc(id).get();
        if (!doc.exists) {
            return res.status(404).json({ message: 'User not found' });
        }
        const formattedUser = formatUser(doc);
        return res.json(formattedUser);
    }
    catch (error) {
        return res.status(500).json({ message: 'Server error', error });
    }
});
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, email, phone } = req.body;
    try {
        const userRef = usersCollection.doc(id);
        const doc = await userRef.get();
        if (!doc.exists) {
            return res.status(404).json({ message: 'User not found' });
        }
        const updateFields = {};
        if (firstName)
            updateFields['firstName'] = firstName;
        if (lastName)
            updateFields['lastName'] = lastName;
        if (email)
            updateFields['email'] = email;
        if (phone)
            updateFields['phone'] = phone;
        await userRef.update(updateFields);
        const updatedDoc = await userRef.get();
        return res.json(formatUser(updatedDoc));
    }
    catch (error) {
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
            boughtSubscriptions: firebase_admin_1.default.firestore.FieldValue.arrayUnion(subscriptionId)
        });
        const updatedUserDoc = await userRef.get();
        return res.json(formatUser(updatedUserDoc));
    }
    catch (error) {
        console.error("Buy subscription error:", error);
        return res.status(500).json({ message: 'Server error', error });
    }
});
router.patch('/:id/add-sold-subscription', async (req, res) => {
    const { id } = req.params;
    const { title, category, description, expiresAt, image, pricePerMonth } = req.body;
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
            pricePerMonth: pricePerMonth.toString(),
            createdAt: firebase_admin_1.default.firestore.FieldValue.serverTimestamp(),
            isSold: false
        };
        const newSubRef = await subscriptionsCollection.add(newSubscription);
        await userRef.update({
            soldSubscriptions: firebase_admin_1.default.firestore.FieldValue.arrayUnion(newSubRef.id)
        });
        const updatedUserDoc = await userRef.get();
        return res.status(201).json(formatUser(updatedUserDoc));
    }
    catch (error) {
        console.error('Add sold subscription error:', error);
        return res.status(500).json({ message: 'Server error', error });
    }
});
router.delete('/sold/:subId', async (req, res) => {
    const { subId } = req.params;
    const userIdFromToken = req.userId;
    try {
        const userRef = usersCollection.doc(userIdFromToken);
        const subRef = subscriptionsCollection.doc(subId);
        const [userSnap, subSnap] = await Promise.all([
            userRef.get(),
            subRef.get()
        ]);
        if (!userSnap.exists) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (!subSnap.exists) {
            return res.status(404).json({ message: 'Subscription not found' });
        }
        const userData = userSnap.data();
        const soldSubscriptions = Array.isArray(userData['soldSubscriptions'])
            ? userData['soldSubscriptions']
            : [];
        if (!soldSubscriptions.includes(subId)) {
            return res.status(403).json({ message: 'You cannot delete this subscription' });
        }
        await userRef.update({
            soldSubscriptions: firebase_admin_1.default.firestore.FieldValue.arrayRemove(subId)
        });
        await subRef.delete();
        return res.status(200).json({ message: 'Оголошення видалено' });
    }
    catch (error) {
        console.error('Delete sold subscription error:', error);
        return res.status(500).json({ message: 'Server error' });
    }
});
exports.default = router;
