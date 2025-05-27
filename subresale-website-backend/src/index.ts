// index.ts
import express from 'express';
import admin from 'firebase-admin';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();  // ⬅️ Завантаження env обов'язково на початку

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
export { db }; // ⬅️ Експортуємо Firestore, щоб імпортувати у роутерах

// Тільки після ініціалізації Firebase імпортуємо роутери
import publicRoutes from './routes/publicRoutes';
import protectedRoutes from './routes/protectedRoutes';
import subscriptionsRoute from './routes/subscriptionsRoute';

const app = express();
const port = process.env['PORT'] || 3000;

app.use(cors());
app.use(express.json());

// Підключення роутів
app.use('/public-api', publicRoutes);
app.use('/api', protectedRoutes);
app.use('/subscriptions', subscriptionsRoute); // <- додано

app.get('/', (req, res) => {
  res.send('API is running');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
