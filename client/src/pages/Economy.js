import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ArticleGrid from '../components/ArticleGrid';
import EconomicIndicators from '../components/EconomicIndicators';
import LoadingSpinner from '../components/LoadingSpinner';
import './Economy.css';

const Economy = () => {
  const [articles, setArticles] = useState([]);
  const [economicData, setEconomicData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEconomyArticles();
    fetchEconomicData();
  }, []);

  const fetchEconomyArticles = async () => {
    try {
      const response = await axios.get('/api/articles?category=economy&limit=12');
      setArticles(response.data.articles);
    } catch (error) {
      console.error('Error fetching economy articles:', error);
    }
  };

  const fetchEconomicData = async () => {
    try {
      // Simulated economic data
      const data = {
        gdpGrowth: 3.5,
        gdpChange: 0.2,
        inflation: 5.2,
        inflationChange: -0.1,
        unemployment: 22.4,
        unemploymentChange: -1.2,
        interestRate: 7.5,
        interestChange: 0.25
      };
      setEconomicData(data);
    } catch (error) {
      console.error('Error fetching economic data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="economy-page">
      <div className="page-header">
        <div className="container">
          <h1>Economy</h1>
          <p>Economic trends, policies, and analysis for Eswatini</p>
        </div>
      </div>

      <div className="container">
        {economicData && <EconomicIndicators data={economicData} />}

        <div className="economy-sections">
          <section className="economy-section">
            <h2>Economic Policy</h2>
            <ArticleGrid articles={articles.filter(a => a.tags?.includes('policy'))} />
          </section>

          <section className="economy-section">
            <h2>Economic Development</h2>
            <ArticleGrid articles={articles.filter(a => a.tags?.includes('development'))} />
          </section>

          <section className="economy-section">
            <h2>Trade & Investment</h2>
            <ArticleGrid articles={articles.filter(a => a.tags?.includes('trade'))} />
          </section>
        </div>
      </div>
    </div>
  );
};

export default Economy;