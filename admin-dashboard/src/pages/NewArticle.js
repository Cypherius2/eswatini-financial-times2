import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/NewArticle.css';

const NewArticle = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: '',
    tags: [],
    featuredImage: '',
    status: 'draft',
    metaTitle: '',
    metaDescription: '',
    seoKeywords: ''
  });

  useEffect(() => {
    fetchCategoriesAndTags();
  }, []);

  const fetchCategoriesAndTags = async () => {
    try {
      const [categoriesRes, tagsRes] = await Promise.all([
        axios.get('/api/categories'),
        axios.get('/api/tags')
      ]);
      setCategories(categoriesRes.data);
      setTags(tagsRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTagChange = (tagId) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.includes(tagId)
        ? prev.tags.filter(id => id !== tagId)
        : [...prev.tags, tagId]
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setFormData(prev => ({
        ...prev,
        featuredImage: response.data.url
      }));
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('/api/articles', formData);
      navigate('/admin/articles');
    } catch (error) {
      console.error('Error creating article:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="new-article-page">
      <div className="page-header">
        <h1>Create New Article</h1>
        <button 
          onClick={() => navigate('/admin/articles')}
          className="btn btn-outline"
        >
          Back to Articles
        </button>
      </div>

      <form onSubmit={handleSubmit} className="article-form">
        <div className="form-grid">
          {/* Main Content */}
          <div className="form-main">
            <div className="form-group">
              <label htmlFor="title">Title *</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="excerpt">Excerpt *</label>
              <textarea
                id="excerpt"
                name="excerpt"
                value={formData.excerpt}
                onChange={handleInputChange}
                rows="3"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="content">Content *</label>
              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                rows="10"
                required
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="form-sidebar">
            {/* Publish Box */}
            <div className="form-section">
              <h3>Publish</h3>
              <div className="form-group">
                <label htmlFor="status">Status</label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
              <div className="form-actions">
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? 'Publishing...' : 'Publish'}
                </button>
                <button 
                  type="button" 
                  className="btn btn-outline"
                  onClick={() => navigate('/admin/articles')}
                >
                  Cancel
                </button>
              </div>
            </div>

            {/* Categories */}
            <div className="form-section">
              <h3>Categories</h3>
              <div className="form-group">
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select a category</option>
                  {categories.map(category => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Tags */}
            <div className="form-section">
              <h3>Tags</h3>
              <div className="tags-list">
                {tags.map(tag => (
                  <label key={tag._id} className="tag-checkbox">
                    <input
                      type="checkbox"
                      checked={formData.tags.includes(tag._id)}
                      onChange={() => handleTagChange(tag._id)}
                    />
                    <span>{tag.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Featured Image */}
            <div className="form-section">
              <h3>Featured Image</h3>
              <div className="image-upload">
                {formData.featuredImage ? (
                  <div className="image-preview">
                    <img src={formData.featuredImage} alt="Preview" />
                    <button 
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, featuredImage: '' }))}
                      className="btn btn-sm btn-danger"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <label className="upload-label">
                    <i className="fas fa-upload"></i>
                    Upload Image
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      style={{ display: 'none' }}
                    />
                  </label>
                )}
              </div>
            </div>

            {/* SEO Settings */}
            <div className="form-section">
              <h3>SEO Settings</h3>
              <div className="form-group">
                <label htmlFor="metaTitle">Meta Title</label>
                <input
                  type="text"
                  id="metaTitle"
                  name="metaTitle"
                  value={formData.metaTitle}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="metaDescription">Meta Description</label>
                <textarea
                  id="metaDescription"
                  name="metaDescription"
                  value={formData.metaDescription}
                  onChange={handleInputChange}
                  rows="3"
                />
              </div>
              <div className="form-group">
                <label htmlFor="seoKeywords">SEO Keywords</label>
                <input
                  type="text"
                  id="seoKeywords"
                  name="seoKeywords"
                  value={formData.seoKeywords}
                  onChange={handleInputChange}
                  placeholder="comma, separated, keywords"
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewArticle;
