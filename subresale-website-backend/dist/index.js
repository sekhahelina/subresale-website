"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const firebase_admin_1 = tslib_1.__importDefault(require("firebase-admin"));
const cors_1 = tslib_1.__importDefault(require("cors"));
const service_account_key_json_1 = tslib_1.__importDefault(require("../service_account_key.json"));
firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.cert(service_account_key_json_1.default),
    storageBucket: 'subresalewebsite-57220.appspot.com'
});
const db = firebase_admin_1.default.firestore();
const app = (0, express_1.default)();
const port = process.env['PORT'] || 300;
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
;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
