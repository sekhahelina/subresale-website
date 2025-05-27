import express from 'express';
import admin from 'firebase-admin';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

// Обробка багаторядкового ключа
const privateKey = process.env['GOOGLE_PRIVATE_KEY']?.replace(/\\n/g, '\n');

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env['GOOGLE_PROJECT_ID']!,
    clientEmail: process.env['GOOGLE_CLIENT_EMAIL']!,
    privateKey: privateKey!,
  }),
  storageBucket: 'subresalewebsite-57220.appspot.com',
});

const db = admin.firestore();

const app = express();
const port = process.env['PORT'] || 3000;

app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {
  try {
    const snapshot = await db.collection('users').get();
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
