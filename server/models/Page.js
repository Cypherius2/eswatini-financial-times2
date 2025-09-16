const mongoose = require('mongoose');

const PageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  content: {
    type: String,
    required: true
  },
  excerpt: {
    type: String,
    maxlength: 300
  },
  featuredImage: String,
  metaTitle: String,
  metaDescription: String,
  seoKeywords: [String],
  isPublished: {
    type: Boolean,
    default: false
  },
  publishedAt: {
    type: Date,
    default: null
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  template: {
    type: String,
    enum: ['default', 'fullwidth', 'sidebar'],
    default: 'default'
  },
  showInMenu: {
    type: Boolean,
    default: false
  },
  menuOrder: {
    type: Number,
    default: 0
  },
  parentPage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Page',
    default: null
  }
}, {
  timestamps: true
});

// Generate slug from title
PageSchema.pre('save', function(next) {
  if (this.isModified('title')) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim('-');
  }
  next();
});

module.exports = mongoose.model('Page', PageSchema);