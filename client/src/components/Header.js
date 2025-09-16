import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { path: '/', label: 'Home' },
    { path: '/news', label: 'News' },
    { path: '/business', label: 'Business' },
    { path: '/economy', label: 'Economy' },
    { path: '/markets', label: 'Markets' },
    { path: '/banking', label: 'Banking' },
    { path: '/technology', label: 'Technology' },
    { path: '/opinion', label: 'Opinion' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
    { path: '/subscription', label: 'Subscribe' }
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        <div className="logo-section">
          <Link to="/" className="logo">
            <span className="logo-main">Eswatini</span>
            <span className="logo-sub">Financial Times</span>
          </Link>
          <div className="date-display">
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </div>
        </div>

        <div className="nav-section">
          <nav className={`main-nav ${isMenuOpen ? 'open' : ''}`}>
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="header-actions">
            <button className="search-toggle">
              <i className="fas fa-search"></i>
            </button>
            <button 
              className="menu-toggle"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="mobile-search">
        <input type="text" placeholder="Search for news..." />
        <button><i className="fas fa-search"></i></button>
      </div>
    </header>
  );
};

export default Header;