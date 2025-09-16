import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Sidebar.css';

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();

  const menuItems = [
    { path: '/admin', label: 'Dashboard', icon: 'fas fa-tachometer-alt' },
    { path: '/admin/articles', label: 'Articles', icon: 'fas fa-newspaper' },
    { path: '/admin/categories', label: 'Categories', icon: 'fas fa-folder' },
    { path: '/admin/tags', label: 'Tags', icon: 'fas fa-tags' },
    { path: '/admin/users', label: 'Users', icon: 'fas fa-users' },
    { path: '/admin/media', label: 'Media', icon: 'fas fa-image' },
    { path: '/admin/settings', label: 'Settings', icon: 'fas fa-cog' }
  ];

  const isActive = (path) => {
    if (path === '/admin') return location.pathname === '/admin';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <div className={`sidebar-overlay ${isOpen ? 'active' : ''}`} onClick={onClose}></div>
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2>Admin Panel</h2>
          <button className="sidebar-close" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        
        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`sidebar-item ${isActive(item.path) ? 'active' : ''}`}
              onClick={onClose}
            >
              <i className={item.icon}></i>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button className="logout-btn">
            <i className="fas fa-sign-out-alt"></i>
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
