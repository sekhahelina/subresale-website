"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const firebase_admin_1 = tslib_1.__importDefault(require("firebase-admin"));
const cors_1 = tslib_1.__importDefault(require("cors"));
const dotenv_1 = tslib_1.__importDefault(require("dotenv"));
dotenv_1.default.config();
// Обробка багаторядкового ключа
const privateKey = process.env['GOOGLE_PRIVATE_KEY']?.replace(/\\n/g, '\n');
firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.cert({
        projectId: process.env['GOOGLE_PROJECT_ID'],
        clientEmail: process.env['GOOGLE_CLIENT_EMAIL'],
        privateKey: privateKey,
    }),
    storageBucket: 'subresalewebsite-57220.appspot.com',
});
const db = firebase_admin_1.default.firestore();
const app = (0, express_1.default)();
const port = process.env['PORT'] || 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get('/', async (req, res) => {
    try {
        const snapshot = await db.collection('users').get();
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
