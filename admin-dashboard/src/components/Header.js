import React from 'react';
import '../styles/Header.css';

const Header = ({ onMenuClick }) => {
  return (
    <header className="admin-header">
      <div className="header-left">
        <button className="menu-toggle" onClick={onMenuClick}>
          <i className="fas fa-bars"></i>
        </button>
        <h1>Admin Dashboard</h1>
      </div>
      
      <div className="header-right">
        <div className="search-box">
          <input type="text" placeholder="Search..." />
          <i className="fas fa-search"></i>
        </div>
        
        <div className="user-menu">
          <div className="user-avatar">
            <img src="/api/placeholder/40/40" alt="User" />
          </div>
          <div className="user-info">
            <span className="user-name">Admin User</span>
            <span className="user-role">Administrator</span>
          </div>
          <i className="fas fa-chevron-down"></i>
        </div>
        
        <div className="notifications">
          <button className="notification-btn">
            <i className="fas fa-bell"></i>
            <span className="notification-badge">3</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
