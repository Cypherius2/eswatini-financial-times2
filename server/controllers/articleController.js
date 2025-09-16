import Article from '../models/Article.js'

// Get all articles with pagination and filtering
export const getArticles = async (req, res) => {
  try {
    const { page = 1, limit = 10, category, search } = req.query
    const query = {}

    if (category) query.category = category
    if (search) {
      query.$text = { $search: search }
    }

    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      sort: { createdAt: -1 },
      populate: 'author',
      select: 'username'
    }

    const articles = await Article.find(query)
      .populate('author', 'username')
      .sort(options.sort)
      .limit(options.limit * 1)
      .skip((options.page - 1) * options.limit)

    const total = await Article.countDocuments(query)

    res.json({
      articles,
      totalPages: Math.ceil(total / options.limit),
      currentPage: options.page,
      total
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Get single article
export const getArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id).populate('author', 'username')
    if (!article) {
      return res.status(404).json({ message: 'Article not found' })
    }

    // Increment view count
    article.views += 1
    await article.save()

    res.json(article)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Create article
export const createArticle = async (req, res) => {
  try {
    const article = new Article({
      ...req.body,
      author: req.user.id
    })

    const savedArticle = await article.save()
    res.status(201).json(savedArticle)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// Update article
export const updateArticle = async (req, res) => {
  try {
    const article = await Article.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )

    if (!article) {
      return res.status(404).json({ message: 'Article not found' })
    }

    res.json(article)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// Delete article
export const deleteArticle = async (req, res) => {
  try {
    const article = await Article.findByIdAndDelete(req.params.id)
    if (!article) {
      return res.status(404).json({ message: 'Article not found' })
    }

    res.json({ message: 'Article deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
