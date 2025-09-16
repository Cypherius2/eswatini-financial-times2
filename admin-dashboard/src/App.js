import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLayout from './components/AdminLayout';
import Dashboard from './pages/Dashboard';
import Articles from './pages/Articles';
import NewArticle from './pages/NewArticle';
import EditArticle from './pages/EditArticle';
import Categories from './pages/Categories';
import Tags from './pages/Tags';
import Users from './pages/Users';
import Media from './pages/Media';
import Settings from './pages/Settings';
import Login from './pages/Login';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import './styles/App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin" element={
            <ProtectedRoute>
              <AdminLayout>
                <Dashboard />
              </AdminLayout>
            </ProtectedRoute>
          } />
          <Route path="/admin/articles" element={
            <ProtectedRoute>
              <AdminLayout>
                <Articles />
              </AdminLayout>
            </ProtectedRoute>
          } />
          <Route path="/admin/articles/new" element={
            <ProtectedRoute>
              <AdminLayout>
                <NewArticle />
              </AdminLayout>
            </ProtectedRoute>
          } />
          <Route path="/admin/articles/edit/:id" element={
            <ProtectedRoute>
              <AdminLayout>
                <EditArticle />
              </AdminLayout>
            </ProtectedRoute>
          } />
          <Route path="/admin/categories" element={
            <ProtectedRoute>
              <AdminLayout>
                <Categories />
              </AdminLayout>
            </ProtectedRoute>
          } />
          <Route path="/admin/tags" element={
            <ProtectedRoute>
              <AdminLayout>
                <Tags />
              </AdminLayout>
            </ProtectedRoute>
          } />
          <Route path="/admin/users" element={
            <ProtectedRoute>
              <AdminLayout>
                <Users />
              </AdminLayout>
            </ProtectedRoute>
          } />
          <Route path="/admin/media" element={
            <ProtectedRoute>
              <AdminLayout>
                <Media />
              </AdminLayout>
            </ProtectedRoute>
          } />
          <Route path="/admin/settings" element={
            <ProtectedRoute>
              <AdminLayout>
                <Settings />
              </AdminLayout>
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
