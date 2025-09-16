import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/Articles.css';

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchArticles();
  }, [currentPage, filter]);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const endpoint = filter === 'all' 
        ? `/api/articles?page=${currentPage}&limit=10`
        : `/api/articles?status=${filter}&page=${currentPage}&limit=10`;
      
      const response = await axios.get(endpoint);
      setArticles(response.data.articles);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteArticle = async (id) => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      try {
        await axios.delete(`/api/articles/${id}`);
        fetchArticles(); // Refresh the list
      } catch (error) {
        console.error('Error deleting article:', error);
      }
    }
  };

  const updateArticleStatus = async (id, status) => {
    try {
      await axios.put(`/api/articles/${id}`, { status });
      fetchArticles(); // Refresh the list
    } catch (error) {
      console.error('Error updating article status:', error);
    }
  };

  if (loading) {
    return <div className="loading">Loading articles...</div>;
  }

  return (
    <div className="articles-page">
      <div className="page-header">
        <h1>Articles</h1>
        <Link to="/admin/articles/new" className="btn btn-primary">
          <i className="fas fa-plus"></i>
          New Article
        </Link>
      </div>

      {/* Filters */}
      <div className="filters">
        <button 
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All Articles
        </button>
        <button 
          className={`filter-btn ${filter === 'published' ? 'active' : ''}`}
          onClick={() => setFilter('published')}
        >
          Published
        </button>
        <button 
          className={`filter-btn ${filter === 'draft' ? 'active' : ''}`}
          onClick={() => setFilter('draft')}
        >
          Drafts
        </button>
      </div>

      {/* Articles Table */}
      <div className="articles-table">
        <div className="table-header">
          <div className="table-row">
            <div className="table-cell">Title</div>
            <div className="table-cell">Author</div>
            <div className="table-cell">Category</div>
            <div className="table-cell">Status</div>
            <div className="table-cell">Views</div>
            <div className="table-cell">Date</div>
            <div className="table-cell">Actions</div>
          </div>
        </div>
        
        <div className="table-body">
          {articles.map(article => (
            <div key={article._id} className="table-row">
              <div className="table-cell title-cell">
                <img src={article.featuredImage || '/api/placeholder/40/40'} alt={article.title} />
                <span>{article.title}</span>
              </div>
              <div className="table-cell">{article.author?.firstName} {article.author?.lastName}</div>
              <div className="table-cell">{article.category?.name}</div>
              <div className="table-cell">
                <span className={`status ${article.status}`}>{article.status}</span>
              </div>
              <div className="table-cell">{article.views}</div>
              <div className="table-cell">
                {new Date(article.publishedAt || article.createdAt).toLocaleDateString()}
              </div>
              <div className="table-cell actions-cell">
                <Link 
                  to={`/admin/articles/edit/${article._id}`}
                  className="btn btn-sm btn-outline"
                >
                  <i className="fas fa-edit"></i>
                </Link>
                {article.status === 'published' ? (
                  <button 
                    className="btn btn-sm btn-warning"
                    onClick={() => updateArticleStatus(article._id, 'draft')}
                  >
                    <i className="fas fa-eye-slash"></i>
                  </button>
                ) : (
                  <button 
                    className="btn btn-sm btn-success"
                    onClick={() => updateArticleStatus(article._id, 'published')}
                  >
                    <i className="fas fa-eye"></i>
                  </button>
                )}
                <button 
                  className="btn btn-sm btn-danger"
                  onClick={() => deleteArticle(article._id)}
                >
                  <i className="fas fa-trash"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination">
          <button 
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => prev - 1)}
            className="pagination-btn"
          >
            Previous
          </button>
          
          <div className="pagination-pages">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const page = currentPage <= 3 ? i + 1 : currentPage - 2 + i;
              if (page > totalPages) return null;
              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`pagination-btn ${currentPage === page ? 'active' : ''}`}
                >
                  {page}
                </button>
              );
            })}
          </div>

          <button 
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(prev => prev + 1)}
            className="pagination-btn"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Articles;
