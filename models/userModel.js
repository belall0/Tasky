import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      minLength: [3, 'Name must be at least 3 characters'],
      maxLength: [50, 'Name must not exceed 50 characters'],
      trim: true,
    },

    username: {
      type: String,
      required: [true, 'Username is required'],
      unique: true,
      minLength: [3, 'Username must be at least 3 characters'],
      maxLength: [50, 'Username must not exceed 50 characters'],
      immutable: true,
      trim: true,
      lowercase: true,
    },

    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      validate: [validator.isEmail, 'Please enter a valid email'],
      trim: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: [true, 'Password is required'],
      minLength: [6, 'Password must be at least 6 characters'],
      select: false,
      trim: true,
    },

    role: {
      type: String,
      default: 'user',
      enum: ['user', 'admin'],
    },

    avatar: {
      type: String,
      trim: true,
      default: 'default-profile.png',
    },
  },
  {
    timestamps: true,
    toJSON: { versionKey: false },
    toObject: { versionKey: false },
  },
);

// pre middleware to hash password before saving or updating
userSchema.pre('save', async function (next) {
  // make sure role is anything but admin
  if (this.role === 'admin') {
    this.role = 'user';
  }

  // only hash if password is modified
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);

  next();
});

// instance method to compare plain password with hashed password
userSchema.methods.isCorrectPassword = async function (plainPassword) {
  return await bcrypt.compare(plainPassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;
