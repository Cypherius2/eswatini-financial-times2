import express from 'express'
import Article from '../models/Article.js'

const router = express.Router()

// Get all articles
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, category } = req.query
    const query = category ? { category } : {}

    const articles = await Article.find(query)
      .populate('author', 'username')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)

    const total = await Article.countDocuments(query)

    res.json({
      articles,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Get single article
router.get('/:id', async (req, res) => {
  try {
    const article = await Article.findById(req.params.id).populate('author', 'username')
    if (!article) {
      return res.status(404).json({ message: 'Article not found' })
    }
    res.json(article)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Create article (protected route - add auth middleware later)
router.post('/', async (req, res) => {
  try {
    const article = new Article(req.body)
    const savedArticle = await article.save()
    res.status(201).json(savedArticle)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Update article (protected route)
router.put('/:id', async (req, res) => {
  try {
    const article = await Article.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
    if (!article) {
      return res.status(404).json({ message: 'Article not found' })
    }
    res.json(article)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Delete article (protected route)
router.delete('/:id', async (req, res) => {
  try {
    const article = await Article.findByIdAndDelete(req.params.id)
    if (!article) {
      return res.status(404).json({ message: 'Article not found' })
    }
    res.json({ message: 'Article deleted' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router
