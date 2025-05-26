import express from 'express';
import admin from 'firebase-admin';
import cors from 'cors';
import serviceAccount from '../service_account_key.json';
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: 'subresalewebsite-57220.appspot.com'
});
const db = admin.firestore();
const app = express();
const port = process.env['PORT'] || 3000;
app.use(cors());
app.use(express.json());
app.get('/test', async (req, res) => {
    try {
        const snapshot = await db.collection('test').get();
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
