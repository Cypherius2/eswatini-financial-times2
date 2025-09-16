import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import '../styles/AdminLayout.css';

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="admin-layout">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="admin-content">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <main className="admin-main">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
