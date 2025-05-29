import { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import User from '../models/User';
import { emailService } from '../utils/email';

export const registrationValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').trim().isEmail().withMessage('Valid email is required'),
  body('phoneNumber').trim().notEmpty().withMessage('Phone number is required'),
  body('nationalRegistrationNumber').trim().notEmpty().withMessage('National registration number is required'),
  body('school.name').trim().notEmpty().withMessage('School name is required'),
  body('school.averageGrade')
    .isFloat({ min: 0, max: 100 })
    .withMessage('Average grade must be between 0 and 100'),
  body('essay')
    .trim()
    .isLength({ min: 100, max: 5000 })
    .withMessage('Essay must be between 100 and 5000 characters'),
];

export const registrationController = {
  async register(req: Request, res: Response) {
    try {
      // Validation
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // Check if user already exists
      const existingUser = await User.findOne({
        $or: [
          { email: req.body.email },
          { nationalRegistrationNumber: req.body.nationalRegistrationNumber }
        ]
      });

      if (existingUser) {
        return res.status(400).json({
          error: 'User with this email or national registration number already exists'
        });
      }

      // Create new user
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        nationalRegistrationNumber: req.body.nationalRegistrationNumber,
        school: {
          name: req.body.school.name,
          averageGrade: req.body.school.averageGrade
        },
        paymentConfirmation: {
          imageUrl: req.file?.path || '',
          uploadedAt: new Date()
        },
        essay: req.body.essay,
        status: 'pending'
      });

      await user.save();

      res.status(201).json({
        message: 'Registration successful',
        user: {
          id: user._id,
          registrationNumber: user.registrationNumber,
          name: user.name,
          email: user.email,
          status: user.status
        }
      });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({ error: 'Registration failed' });
    }
  },

  async updateStatus(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const { status, reason } = req.body;

      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      user.status = status;
      await user.save();

      // Send email notification based on status
      if (status === 'approved') {
        await emailService.sendApprovalEmail(user.email, user.name);
      } else if (status === 'rejected') {
        await emailService.sendRejectionEmail(user.email, user.name, reason);
      }

      res.json({
        message: 'Status updated successfully',
        user: {
          id: user._id,
          registrationNumber: user.registrationNumber,
          name: user.name,
          email: user.email,
          status: user.status
        }
      });
    } catch (error) {
      console.error('Status update error:', error);
      res.status(500).json({ error: 'Failed to update status' });
    }
  },

  async getAllRegistrations(req: Request, res: Response) {
    try {
      const users = await User.find({})
        .select('-essay')
        .sort({ registrationNumber: 1 }); // Sort by registration number ascending (1, 2, 3...)

      res.json(users);
    } catch (error) {
      console.error('Fetch registrations error:', error);
      res.status(500).json({ error: 'Failed to fetch registrations' });
    }
  },

  async getRegistrationById(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.json(user);
    } catch (error) {
      console.error('Fetch registration error:', error);
      res.status(500).json({ error: 'Failed to fetch registration' });
    }
  }
};
