import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Tags.css';

const Tags = () => {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingTag, setEditingTag] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });

  useEffect(() => {
    fetchTags();
  }, []);

  const fetchTags = async () => {
    try {
      const response = await axios.get('/api/tags');
      setTags(response.data);
    } catch (error) {
      console.error('Error fetching tags:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (editingTag) {
        await axios.put(`/api/tags/${editingTag._id}`, formData);
      } else {
        await axios.post('/api/tags', formData);
      }
      
      setShowForm(false);
      setEditingTag(null);
      setFormData({ name: '', description: '' });
      fetchTags();
    } catch (error) {
      console.error('Error saving tag:', error);
    }
  };

  const handleEdit = (tag) => {
    setEditingTag(tag);
    setFormData({
      name: tag.name,
      description: tag.description || ''
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this tag?')) {
      try {
        await axios.delete(`/api/tags/${id}`);
        fetchTags();
      } catch (error) {
        console.error('Error deleting tag:', error);
      }
    }
  };

  const cancelForm = () => {
    setShowForm(false);
    setEditingTag(null);
    setFormData({ name: '', description: '' });
  };

  if (loading) {
    return <div className="loading">Loading tags...</div>;
  }

  return (
    <div className="tags-page">
      <div className="page-header">
        <h1>Tags</h1>
        <button 
          onClick={() => setShowForm(true)}
          className="btn btn-primary"
        >
          <i className="fas fa-plus"></i>
          Add Tag
        </button>
      </div>

      {/* Tag Form */}
      {showForm && (
        <div className="tag-form-modal">
          <div className="modal-content">
            <h2>{editingTag ? 'Edit' : 'Add'} Tag</h2>
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

              <div className="form-actions">
                <button type="submit" className="btn btn-primary">
                  {editingTag ? 'Update' : 'Create'} Tag
                </button>
                <button type="button" onClick={cancelForm} className="btn btn-outline">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Tags List */}
      <div className="tags-grid">
        {tags.map(tag => (
          <div key={tag._id} className="tag-card">
            <div className="tag-header">
              <h3>{tag.name}</h3>
              <div className="tag-actions">
                <button 
                  onClick={() => handleEdit(tag)}
                  className="btn btn-sm btn-outline"
                >
                  <i className="fas fa-edit"></i>
                </button>
                <button 
                  onClick={() => handleDelete(tag._id)}
                  className="btn btn-sm btn-danger"
                >
                  <i className="fas fa-trash"></i>
                </button>
              </div>
            </div>
            <div className="tag-body">
              <p>{tag.description || 'No description'}</p>
              <div className="tag-meta">
                <span>/{tag.slug}</span>
                <span>0 articles</span> {/* Would need article count */}
              </div>
            </div>
          </div>
        ))}
      </div>

      {tags.length === 0 && !showForm && (
        <div className="empty-state">
          <i className="fas fa-tags"></i>
          <h3>No tags yet</h3>
          <p>Create your first tag to categorize articles</p>
          <button 
            onClick={() => setShowForm(true)}
            className="btn btn-primary"
          >
            Create Tag
          </button>
        </div>
      )}
    </div>
  );
};

export default Tags;
