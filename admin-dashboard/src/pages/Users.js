import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Users.css';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    role: 'author',
    isActive: true
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
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
      if (editingUser) {
        await axios.put(`/api/users/${editingUser._id}`, formData);
      } else {
        await axios.post('/api/users', formData);
      }
      
      setShowForm(false);
      setEditingUser(null);
      setFormData({ 
        firstName: '', 
        lastName: '', 
        email: '', 
        username: '', 
        password: '', 
        role: 'author', 
        isActive: true 
      });
      fetchUsers();
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      username: user.username,
      password: '', // Don't pre-fill password
      role: user.role,
      isActive: user.isActive
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`/api/users/${id}`);
        fetchUsers();
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  const cancelForm = () => {
    setShowForm(false);
    setEditingUser(null);
    setFormData({ 
      firstName: '', 
      lastName: '', 
      email: '', 
      username: '', 
      password: '', 
      role: 'author', 
      isActive: true 
    });
  };

  if (loading) {
    return <div className="loading">Loading users...</div>;
  }

  return (
    <div className="users-page">
      <div className="page-header">
        <h1>Users</h1>
        <button 
          onClick={() => setShowForm(true)}
          className="btn btn-primary"
        >
          <i className="fas fa-plus"></i>
          Add User
        </button>
      </div>

      {/* User Form */}
      {showForm && (
        <div className="user-form-modal">
          <div className="modal-content">
            <h2>{editingUser ? 'Edit' : 'Add'} User</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName">First Name *</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="lastName">Last Name *</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="username">Username *</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="password">
                  {editingUser ? 'New Password' : 'Password *'}
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required={!editingUser}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="role">Role *</label>
                  <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="subscriber">Subscriber</option>
                    <option value="author">Author</option>
                    <option value="editor">Editor</option>
                    <option value="admin">Administrator</option>
                  </select>
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
                  {editingUser ? 'Update' : 'Create'} User
                </button>
                <button type="button" onClick={cancelForm} className="btn btn-outline">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Users Table */}
      <div className="users-table">
        <div className="table-header">
          <div className="table-row">
            <div className="table-cell">User</div>
            <div className="table-cell">Email</div>
            <div className="table-cell">Role</div>
            <div className="table-cell">Status</div>
            <div className="table-cell">Last Login</div>
            <div className="table-cell">Actions</div>
          </div>
        </div>
        
        <div className="table-body">
          {users.map(user => (
            <div key={user._id} className="table-row">
              <div className="table-cell user-cell">
                <div className="user-avatar">
                  {user.firstName?.charAt(0)}{user.lastName?.charAt(0)}
                </div>
                <div className="user-info">
                  <strong>{user.firstName} {user.lastName}</strong>
                  <br />
                  <small>@{user.username}</small>
                </div>
              </div>
              <div className="table-cell">{user.email}</div>
              <div className="table-cell">
                <span className={`role ${user.role}`}>{user.role}</span>
              </div>
              <div className="table-cell">
                <span className={`status ${user.isActive ? 'active' : 'inactive'}`}>
                  {user.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
              <div className="table-cell">
                {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'Never'}
              </div>
              <div className="table-cell actions-cell">
                <button 
                  onClick={() => handleEdit(user)}
                  className="btn btn-sm btn-outline"
                >
                  <i className="fas fa-edit"></i>
                </button>
                <button 
                  onClick={() => handleDelete(user._id)}
                  className="btn btn-sm btn-danger"
                >
                  <i className="fas fa-trash"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {users.length === 0 && !showForm && (
        <div className="empty-state">
          <i className="fas fa-users"></i>
          <h3>No users yet</h3>
          <p>Create your first user account</p>
          <button 
            onClick={() => setShowForm(true)}
            className="btn btn-primary"
          >
            Create User
          </button>
        </div>
      )}
    </div>
  );
};

export default Users;
