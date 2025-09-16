import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Media.css';

const Media = () => {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    try {
      const response = await axios.get('/api/media');
      setMedia(response.data);
    } catch (error) {
      console.error('Error fetching media:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e) => {
    const files = e.target.files;
    if (!files.length) return;

    setUploading(true);

    try {
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append('images', files[i]);
      }

      await axios.post('/api/upload/multiple', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      fetchMedia(); // Refresh the list
    } catch (error) {
      console.error('Error uploading files:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this file?')) {
      try {
        await axios.delete(`/api/media/${id}`);
        fetchMedia();
      } catch (error) {
        console.error('Error deleting file:', error);
      }
    }
  };

  if (loading) {
    return <div className="loading">Loading media...</div>;
  }

  return (
    <div className="media-page">
      <div className="page-header">
        <h1>Media Library</h1>
        <label className="btn btn-primary">
          <i className="fas fa-upload"></i>
          Upload Files
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileUpload}
            style={{ display: 'none' }}
            disabled={uploading}
          />
        </label>
      </div>

      {uploading && (
        <div className="upload-progress">
          <div className="progress-bar">
            <div className="progress"></div>
          </div>
          <p>Uploading files...</p>
        </div>
      )}

      <div className="media-grid">
        {media.map(item => (
          <div key={item._id} className="media-item">
            <div className="media-thumbnail">
              <img src={item.url} alt={item.originalName} />
              <div className="media-actions">
                <button 
                  onClick={() => navigator.clipboard.writeText(item.url)}
                  className="btn btn-sm btn-outline"
                  title="Copy URL"
                >
                  <i className="fas fa-link"></i>
                </button>
                <button 
                  onClick={() => handleDelete(item._id)}
                  className="btn btn-sm btn-danger"
                  title="Delete"
                >
                  <i className="fas fa-trash"></i>
                </button>
              </div>
            </div>
            <div className="media-info">
              <h4>{item.originalName}</h4>
              <p>{Math.round(item.size / 1024)} KB</p>
              <p>{new Date(item.uploadedAt).toLocaleDateString()}</p>
            </div>
          </div>
        ))}
      </div>

      {media.length === 0 && (
        <div className="empty-state">
          <i className="fas fa-images"></i>
          <h3>No media files yet</h3>
          <p>Upload your first image to get started</p>
          <label className="btn btn-primary">
            <i className="fas fa-upload"></i>
            Upload Files
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileUpload}
              style={{ display: 'none' }}
            />
          </label>
        </div>
      )}
    </div>
  );
};

export default Media;
