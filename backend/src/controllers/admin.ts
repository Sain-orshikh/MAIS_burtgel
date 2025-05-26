import { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import Admin from '../models/Admin';
import { generateToken } from '../middleware/auth';

export const adminValidation = {
  login: [
    body('username').trim().notEmpty().withMessage('Username is required'),
    body('password').trim().notEmpty().withMessage('Password is required')
  ],
  register: [
    body('username').trim().notEmpty().withMessage('Username is required'),
    body('password')
      .trim()
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters long'),
    body('email').trim().isEmail().withMessage('Valid email is required')
  ]
};

export const adminController = {
  async register(req: Request, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { username, password, email } = req.body;

      // Check if admin already exists
      const existingAdmin = await Admin.findOne({
        '\': [{ username }, { email }]
      });

      if (existingAdmin) {
        return res.status(400).json({
          error: 'Admin with this username or email already exists'
        });
      }

      const admin = new Admin({
        username,
        password,
        email
      });

      await admin.save();

      const token = generateToken(admin._id);

      res.status(201).json({
        message: 'Admin created successfully',
        admin: {
          id: admin._id,
          username: admin.username,
          email: admin.email
        },
        token
      });
    } catch (error) {
      console.error('Admin registration error:', error);
      res.status(500).json({ error: 'Failed to create admin' });
    }
  },

  async login(req: Request, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { username, password } = req.body;

      const admin = await Admin.findOne({ username });
      if (!admin) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const isValidPassword = await admin.comparePassword(password);
      if (!isValidPassword) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const token = generateToken(admin._id);

      res.json({
        message: 'Login successful',
        admin: {
          id: admin._id,
          username: admin.username,
          email: admin.email
        },
        token
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ error: 'Login failed' });
    }
  },

  async getProfile(req: Request, res: Response) {
    try {
      const admin = await Admin.findById(req.body.adminId).select('-password');
      if (!admin) {
        return res.status(404).json({ error: 'Admin not found' });
      }

      res.json(admin);
    } catch (error) {
      console.error('Fetch profile error:', error);
      res.status(500).json({ error: 'Failed to fetch profile' });
    }
  }
};
