import { Router } from 'express';
import { db } from '../index';

const router = Router();

router.get('/latest-by-categories', async (req, res) => {
  try {
    const snapshot = await db
        .collection('subscriptions')
        .where('isSold', '==', false)
        .get();
    const subscriptions: any[] = [];

    const categoryMap: Record<string, any> = {};
    snapshot.forEach((doc) => {
      const data = doc.data();
      const category = data['category'];

      if (
        !categoryMap[category] ||
        categoryMap[category].createdAt.toMillis() < data['createdAt'].toMillis()
      ) {
        categoryMap[category] = data;
      }
    });

    Object.values(categoryMap).forEach((sub) => {
      subscriptions.push(sub);
    });

    res.status(200).json(subscriptions);
  } catch (error) {
    res.status(500).json({ message: 'Помилка при отриманні останніх підписок', error });
  }
});

router.get('/category/:category', async (req, res) => {
  const { category } = req.params;
  try {
    const snapshot = await db
        .collection('subscriptions')
        .where('category', '==', category)
        .where('isSold', '==', false)
        .get();

    const subscriptions: any[] = [];

    snapshot.forEach((doc) => {
      subscriptions.push({ id: doc.id, ...doc.data() });
    });

    res.status(200).json(subscriptions);
  } catch (error) {
    res.status(500).json({ message: 'Помилка при отриманні підписок за категорією', error });
  }
});

export default router;