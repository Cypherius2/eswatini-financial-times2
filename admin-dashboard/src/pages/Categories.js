import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Categories.css';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    isActive: true,
    order: 0
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('/api/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (editingCategory) {
        await axios.put(`/api/categories/${editingCategory._id}`, formData);
      } else {
        await axios.post('/api/categories', formData);
      }
      
      setShowForm(false);
      setEditingCategory(null);
      setFormData({ name: '', description: '', isActive: true, order: 0 });
      fetchCategories();
    } catch (error) {
      console.error('Error saving category:', error);
    }
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      description: category.description || '',
      isActive: category.isActive,
      order: category.order || 0
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        await axios.delete(`/api/categories/${id}`);
        fetchCategories();
      } catch (error) {
        console.error('Error deleting category:', error);
      }
    }
  };

  const cancelForm = () => {
    setShowForm(false);
    setEditingCategory(null);
    setFormData({ name: '', description: '', isActive: true, order: 0 });
  };

  if (loading) {
    return <div className="loading">Loading categories...</div>;
  }

  return (
    <div className="categories-page">
      <div className="page-header">
        <h1>Categories</h1>
        <button 
          onClick={() => setShowForm(true)}
          className="btn btn-primary"
        >
          <i className="fas fa-plus"></i>
          Add Category
        </button>
      </div>

      {/* Category Form */}
      {showForm && (
        <div className="category-form-modal">
          <div className="modal-content">
            <h2>{editingCategory ? 'Edit' : 'Add'} Category</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="3"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="order">Order</label>
                  <input
                    type="number"
                    id="order"
                    name="order"
                    value={formData.order}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="isActive"
                      checked={formData.isActive}
                      onChange={handleInputChange}
                    />
                    Active
                  </label>
                </div>
              </div>

              <div className="form-actions">
                <button type="submit" className="btn btn-primary">
                  {editingCategory ? 'Update' : 'Create'} Category
                </button>
                <button type="button" onClick={cancelForm} className="btn btn-outline">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Categories List */}
      <div className="categories-table">
        <div className="table-header">
          <div className="table-row">
            <div className="table-cell">Name</div>
            <div className="table-cell">Description</div>
            <div className="table-cell">Status</div>
            <div className="table-cell">Order</div>
            <div className="table-cell">Articles</div>
            <div className="table-cell">Actions</div>
          </div>
        </div>
        
        <div className="table-body">
          {categories.map(category => (
            <div key={category._id} className="table-row">
              <div className="table-cell name-cell">
                <strong>{category.name}</strong>
                <br />
                <small>/{category.slug}</small>
              </div>
              <div className="table-cell">
                {category.description || '—'}
              </div>
              <div className="table-cell">
                <span className={`status ${category.isActive ? 'active' : 'inactive'}`}>
                  {category.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
              <div className="table-cell">{category.order}</div>
              <div className="table-cell">0</div> {/* Would need article count */}
              <div className="table-cell actions-cell">
                <button 
                  onClick={() => handleEdit(category)}
                  className="btn btn-sm btn-outline"
                >
                  <i className="fas fa-edit"></i>
                </button>
                <button 
                  onClick={() => handleDelete(category._id)}
                  className="btn btn-sm btn-danger"
                >
                  <i className="fas fa-trash"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {categories.length === 0 && !showForm && (
        <div className="empty-state">
          <i className="fas fa-folder-open"></i>
          <h3>No categories yet</h3>
          <p>Create your first category to organize articles</p>
          <button 
            onClick={() => setShowForm(true)}
            className="btn btn-primary"
          >
            Create Category
          </button>
        </div>
      )}
    </div>
  );
};

export default Categories;
