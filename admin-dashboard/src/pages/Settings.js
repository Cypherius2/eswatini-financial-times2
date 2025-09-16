import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Settings.css';

const Settings = () => {
  const [settings, setSettings] = useState({
    siteTitle: 'Eswatini Financial Times',
    siteDescription: 'Your premier source for financial news',
    adminEmail: 'admin@eswatinifinancialtimes.com',
    itemsPerPage: 10,
    enableComments: true,
    maintenanceMode: false
  });
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await axios.get('/api/settings');
      setSettings(response.data);
    } catch (error) {
      console.error('Error fetching settings:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.put('/api/settings', settings);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      console.error('Error saving settings:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="settings-page">
      <div className="page-header">
        <h1>Settings</h1>
      </div>

      <form onSubmit={handleSubmit} className="settings-form">
        {/* General Settings */}
        <div className="settings-section">
          <h2>General Settings</h2>
          <div className="form-group">
            <label htmlFor="siteTitle">Site Title</label>
            <input
              type="text"
              id="siteTitle"
              name="siteTitle"
              value={settings.siteTitle}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="siteDescription">Site Description</label>
            <textarea
              id="siteDescription"
              name="siteDescription"
              value={settings.siteDescription}
              onChange={handleInputChange}
              rows="3"
            />
          </div>

          <div className="form-group">
            <label htmlFor="adminEmail">Admin Email</label>
            <input
              type="email"
              id="adminEmail"
              name="adminEmail"
              value={settings.adminEmail}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* Content Settings */}
        <div className="settings-section">
          <h2>Content Settings</h2>
          <div className="form-group">
            <label htmlFor="itemsPerPage">Items Per Page</label>
            <input
              type="number"
              id="itemsPerPage"
              name="itemsPerPage"
              value={settings.itemsPerPage}
              onChange={handleInputChange}
              min="1"
              max="100"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="enableComments"
                  checked={settings.enableComments}
                  onChange={handleInputChange}
                />
                Enable Comments
              </label>
            </div>

            <div className="form-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="maintenanceMode"
                  checked={settings.maintenanceMode}
                  onChange={handleInputChange}
                />
                Maintenance Mode
              </label>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="form-actions">
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save Settings'}
          </button>
          {saved && (
            <span className="save-message">
              <i className="fas fa-check"></i>
              Settings saved successfully!
            </span>
          )}
        </div>
      </form>

      {/* Danger Zone */}
      <div className="settings-section danger-zone">
        <h2>Danger Zone</h2>
        <div className="danger-actions">
          <button className="btn btn-danger">
            <i className="fas fa-trash"></i>
            Clear All Data
          </button>
          <button className="btn btn-danger">
            <i className="fas fa-download"></i>
            Export Data
          </button>
          <button className="btn btn-danger">
            <i className="fas fa-upload"></i>
            Import Data
          </button>
        </div>
        <p className="danger-warning">
          <i className="fas fa-exclamation-triangle"></i>
          These actions are irreversible. Please proceed with caution.
        </p>
      </div>
    </div>
  );
};

export default Settings;
