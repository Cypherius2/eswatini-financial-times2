import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ArticleGrid from '../components/ArticleGrid';
import MarketWidget from '../components/MarketWidget';
import LoadingSpinner from '../components/LoadingSpinner';
import './Business.css';

const Business = () => {
  const [articles, setArticles] = useState([]);
  const [marketData, setMarketData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBusinessArticles();
    fetchMarketData();
  }, []);

  const fetchBusinessArticles = async () => {
    try {
      const response = await axios.get('/api/articles?category=business&limit=9');
      setArticles(response.data.articles);
    } catch (error) {
      console.error('Error fetching business articles:', error);
    }
  };

  const fetchMarketData = async () => {
    try {
      // Simulated market data - replace with real API
      const data = {
        stockIndex: 5248.76,
        stockChange: 1.25,
        currencyRate: 18.25,
        currencyChange: -0.32,
        inflationRate: 5.2,
        inflationChange: -0.1
      };
      setMarketData(data);
    } catch (error) {
      console.error('Error fetching market data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="business-page">
      <div className="page-header">
        <div className="container">
          <h1>Business News</h1>
          <p>Latest business developments and market insights</p>
        </div>
      </div>

      <div className="container">
        {marketData && <MarketWidget data={marketData} />}

        <div className="business-content">
          <div className="main-content">
            <h2>Latest Business Articles</h2>
            <ArticleGrid articles={articles} />
          </div>

          <div className="sidebar">
            <div className="sidebar-widget">
              <h3>Top Business Stories</h3>
              <div className="top-stories">
                {articles.slice(0, 5).map((article, index) => (
                  <div key={article._id} className="story-item">
                    <span className="story-rank">{index + 1}</span>
                    <div className="story-content">
                      <h4>{article.title}</h4>
                      <span className="story-date">
                        {new Date(article.publishedAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="sidebar-widget">
              <h3>Newsletter Signup</h3>
              <div className="newsletter-form">
                <p>Get the latest business news delivered to your inbox</p>
                <input type="email" placeholder="Enter your email" />
                <button className="btn btn-primary">Subscribe</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Business;