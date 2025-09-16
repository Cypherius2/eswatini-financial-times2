const mongoose = require('mongoose');

const SubscriptionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  plan: {
    type: String,
    enum: ['basic', 'premium', 'print'],
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'canceled', 'expired', 'pending'],
    default: 'pending'
  },
  startDate: {
    type: Date,
    default: Date.now
  },
  endDate: {
    type: Date,
    required: true
  },
  autoRenew: {
    type: Boolean,
    default: true
  },
  paymentMethod: {
    type: String,
    enum: ['card', 'bank', 'mobile'],
    required: true
  },
  paymentStatus: {
    type: String,
    enum: ['paid', 'pending', 'failed'],
    default: 'pending'
  },
  amount: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    default: 'SZL'
  },
  billingAddress: {
    street: String,
    city: String,
    state: String,
    postalCode: String,
    country: String
  },
  transactionId: String,
  lastPaymentDate: Date,
  nextPaymentDate: Date
}, {
  timestamps: true
});

// Index for efficient queries
SubscriptionSchema.index({ user: 1, status: 1 });
SubscriptionSchema.index({ endDate: 1 });
SubscriptionSchema.index({ status: 1, endDate: 1 });

// Method to check if subscription is active
SubscriptionSchema.methods.isActive = function() {
  return this.status === 'active' && this.endDate > new Date();
};

module.exports = mongoose.model('Subscription', SubscriptionSchema);