import express from 'express'
import Category from '../models/Category.js'

const router = express.Router()

// Get all categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find().sort({ name: 1 })
    res.json(categories)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Create category (protected route)
router.post('/', async (req, res) => {
  try {
    const category = new Category(req.body)
    const savedCategory = await category.save()
    res.status(201).json(savedCategory)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

export default router
