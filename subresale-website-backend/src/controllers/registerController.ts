import { Request, Response } from 'express';
import { hashPassword } from '../services/hashService';
import { generateToken } from '../services/tokenService';
import { db } from '../index';

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { firstName, lastName, email, phone, password } = req.body;

    const usersRef = db.collection('users');
    const snapshot = await usersRef.where('email', '==', email).get();

    if (!snapshot.empty) {
      res.status(400).json({ message: 'User already exists' });
      return;
    }

    const hashedPassword = await hashPassword(password);

    const newUserRef = await usersRef.add({
      firstName,
      lastName,
      email,
      phone,
      password: hashedPassword,
      soldSubscriptions: [],
      boughtSubscriptions: [],
      createdAt: new Date().toISOString(),
    });

    const token = generateToken(newUserRef.id);

    res.status(201).json({
      token,
      user: {
        id: newUserRef.id,
        firstName,
        lastName,
        email,
        phone,
        soldSubscriptions: [],
        boughtSubscriptions: [],
        createdAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Registration failed', error });
  }
};