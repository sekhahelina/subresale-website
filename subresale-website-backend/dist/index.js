"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const firebase_admin_1 = tslib_1.__importDefault(require("firebase-admin"));
const cors_1 = tslib_1.__importDefault(require("cors"));
const dotenv_1 = tslib_1.__importDefault(require("dotenv"));
dotenv_1.default.config();
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
exports.db = db;
const publicRoutes_1 = tslib_1.__importDefault(require("./routes/publicRoutes"));
const protectedRoutes_1 = tslib_1.__importDefault(require("./routes/protectedRoutes"));
const app = (0, express_1.default)();
const port = process.env['PORT'] || 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/public-api', publicRoutes_1.default);
app.use('/api', protectedRoutes_1.default);
app.get('/', (req, res) => {
    res.send('API is running');
});
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
