import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 30
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  role: {
    type: String,
    enum: ['user', 'author', 'admin'],
    default: 'user'
  },
  subscribed: {
    type: Boolean,
    default: false
  },
  subscriptionType: {
    type: String,
    enum: ['free', 'premium', 'enterprise'],
    default: 'free'
  }
}, {
  timestamps: true
})

export default mongoose.model('User', userSchema)
