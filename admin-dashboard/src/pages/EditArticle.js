import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/EditArticle.css';

const EditArticle = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
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
    fetchArticleData();
    fetchCategoriesAndTags();
  }, [id]);

  const fetchArticleData = async () => {
    try {
      const response = await axios.get(`/api/articles/${id}`);
      const article = response.data;
      setFormData({
        title: article.title,
        excerpt: article.excerpt,
        content: article.content,
        category: article.category?._id,
        tags: article.tags?.map(tag => tag._id) || [],
        featuredImage: article.featuredImage,
        status: article.status,
        metaTitle: article.metaTitle || '',
        metaDescription: article.metaDescription || '',
        seoKeywords: article.seoKeywords?.join(', ') || ''
      });
    } catch (error) {
      console.error('Error fetching article:', error);
    } finally {
      setLoading(false);
    }
  };

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
    setSaving(true);

    try {
      await axios.put(`/api/articles/${id}`, {
        ...formData,
        seoKeywords: formData.seoKeywords.split(',').map(k => k.trim()).filter(k => k)
      });
      navigate('/admin/articles');
    } catch (error) {
      console.error('Error updating article:', error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading article...</div>;
  }

  return (
    <div className="edit-article-page">
      <div className="page-header">
        <h1>Edit Article</h1>
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
                  <option value="archived">Archived</option>
                </select>
              </div>
              <div className="form-actions">
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  disabled={saving}
                >
                  {saving ? 'Saving...' : 'Update Article'}
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

export default EditArticle;
