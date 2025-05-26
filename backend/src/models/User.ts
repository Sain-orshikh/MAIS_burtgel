import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  phoneNumber: string;
  nationalRegistrationNumber: string;
  school: {
    name: string;
    averageGrade: number;
  };
  paymentConfirmation: {
    imageUrl: string;
    uploadedAt: Date;
  };
  essay: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true
  },
  phoneNumber: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true
  },
  nationalRegistrationNumber: {
    type: String,
    required: [true, 'National registration number is required'],
    unique: true,
    trim: true
  },
  school: {
    name: {
      type: String,
      required: [true, 'School name is required'],
      trim: true
    },
    averageGrade: {
      type: Number,
      required: [true, 'Average grade is required'],
      min: [0, 'Grade cannot be less than 0'],
      max: [100, 'Grade cannot be more than 100']
    }
  },
  paymentConfirmation: {
    imageUrl: {
      type: String,
      required: [true, 'Payment confirmation image is required']
    },
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  },
  essay: {
    type: String,
    required: [true, 'Essay is required'],
    minlength: [100, 'Essay must be at least 100 characters long'],
    maxlength: [5000, 'Essay cannot exceed 5000 characters']
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  }
}, {
  timestamps: true
});

export default model<IUser>('User', userSchema);
