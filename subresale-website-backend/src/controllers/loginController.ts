import { Request, Response } from 'express';
import { comparePassword } from '../services/hashService';
import { generateToken } from '../services/tokenService';
import { db } from '../index'; // ⬅️ імпорт з index.ts

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const usersRef = db.collection('users');
    const snapshot = await usersRef.where('email', '==', email).get();

    if (snapshot.empty) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    const userDoc = snapshot.docs[0];
    const user = userDoc.data();

    const isMatch = await comparePassword(password, user['password']);
    if (!isMatch) {
      res.status(401).json({ message: 'Incorrect password' });
      return;
    }

    const token = generateToken(userDoc.id);

    res.json({
      token,
      user: {
        id: userDoc.id,
        firstName: user['firstName'],
        lastName: user['lastName'],
        email: user['email'],
        phone: user['phone'],
        soldSubscriptions: user['soldSubscriptions'],
        boughtSubscriptions: user['boughtSubscriptions'],
        createdAt: user['createdAt'],
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Login failed', error });
  }
};
