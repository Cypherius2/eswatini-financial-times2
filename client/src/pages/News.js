import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ArticleGrid from '../components/ArticleGrid';
import CategoryFilter from '../components/CategoryFilter';
import LoadingSpinner from '../components/LoadingSpinner';
import './News.css';

const News = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All News' },
    { id: 'politics', name: 'Politics' },
    { id: 'business', name: 'Business' },
    { id: 'economy', name: 'Economy' },
    { id: 'markets', name: 'Markets' },
    { id: 'technology', name: 'Technology' }
  ];

  useEffect(() => {
    fetchArticles();
  }, [currentPage, selectedCategory]);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const endpoint = selectedCategory === 'all' 
        ? `/api/articles?page=${currentPage}&limit=12`
        : `/api/articles?category=${selectedCategory}&page=${currentPage}&limit=12`;
      
      const response = await axios.get(endpoint);
      setArticles(response.data.articles);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="news-page">
      <div className="page-header">
        <div className="container">
          <h1>Latest News</h1>
          <p>Stay updated with the latest developments in Eswatini</p>
        </div>
      </div>

      <div className="container">
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        <ArticleGrid articles={articles} />

        {totalPages > 1 && (
          <div className="pagination">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => prev - 1)}
              className="pagination-btn"
            >
              <i className="fas fa-chevron-left"></i> Previous
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
              Next <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default News;