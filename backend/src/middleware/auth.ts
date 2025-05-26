import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { IAdmin } from '../models/Admin';

export interface AuthRequest extends Request {
  admin?: IAdmin;
}

export const auth = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      throw new Error();
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
    
    // Note: You would typically verify the admin exists in the database here
    // const admin = await Admin.findById(decoded.id);
    // if (!admin) throw new Error();
    // req.admin = admin;

    next();
  } catch (error) {
    res.status(401).json({ error: 'Please authenticate.' });
  }
};

export const generateToken = (adminId: string): string => {
  return jwt.sign({ id: adminId }, process.env.JWT_SECRET!, {
    expiresIn: '24h'
  });
};
