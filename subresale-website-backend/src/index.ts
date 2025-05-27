import express from 'express';
import admin from 'firebase-admin';
import cors from 'cors';
import dotenv from 'dotenv';

import publicRoutes from './routes/publicRoutes';
import protectedRoutes from './routes/protectedRoutes';
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

// 🔓 Публічні маршрути
app.use('/public-api', publicRoutes);

// 🔐 Захищені маршрути
app.use('/api', protectedRoutes);



app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
