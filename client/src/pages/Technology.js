import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ArticleGrid from '../components/ArticleGrid';
import TechTrends from '../components/TechTrends';
import LoadingSpinner from '../components/LoadingSpinner';
import './Technology.css';

const Technology = () => {
  const [articles, setArticles] = useState([]);
  const [techTrends, setTechTrends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTechArticles();
    fetchTechTrends();
  }, []);

  const fetchTechArticles = async () => {
    try {
      const response = await axios.get('/api/articles?category=technology&limit=12');
      setArticles(response.data.articles);
    } catch (error) {
      console.error('Error fetching tech articles:', error);
    }
  };

  const fetchTechTrends = async () => {
    try {
      // Simulated tech trends
      const trends = [
        { name: 'Digital Transformation', progress: 75 },
        { name: 'FinTech Adoption', progress: 60 },
        { name: 'E-Commerce Growth', progress: 85 },
        { name: 'AI Integration', progress: 45 }
      ];
      setTechTrends(trends);
    } catch (error) {
      console.error('Error fetching tech trends:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="technology-page">
      <div className="page-header">
        <div className="container">
          <h1>Technology</h1>
          <p>Tech innovation, digital transformation, and IT news</p>
        </div>
      </div>

      <div className="container">
        <TechTrends trends={techTrends} />

        <div className="tech-sections">
          <section className="tech-section">
            <h2>Digital Innovation</h2>
            <ArticleGrid articles={articles.filter(a => a.tags?.includes('innovation'))} />
          </section>

          <section className="tech-section">
            <h2>Startups & Entrepreneurship</h2>
            <ArticleGrid articles={articles.filter(a => a.tags?.includes('startups'))} />
          </section>

          <section className="tech-section">
            <h2>IT Infrastructure</h2>
            <ArticleGrid articles={articles.filter(a => a.tags?.includes('infrastructure'))} />
          </section>
        </div>

        <div className="tech-features">
          <h2>Featured Technology Areas</h2>
          <div className="features-grid">
            <div className="feature-card">
              <i className="fas fa-mobile-alt"></i>
              <h3>Mobile Technology</h3>
              <p>Mobile banking, apps, and connectivity</p>
            </div>
            <div className="feature-card">
              <i className="fas fa-shield-alt"></i>
              <h3>Cybersecurity</h3>
              <p>Data protection and security measures</p>
            </div>
            <div className="feature-card">
              <i className="fas fa-cloud"></i>
              <h3>Cloud Computing</h3>
              <p>Cloud services and infrastructure</p>
            </div>
            <div className="feature-card">
              <i className="fas fa-robot"></i>
              <h3>Artificial Intelligence</h3>
              <p>AI applications and machine learning</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Technology;