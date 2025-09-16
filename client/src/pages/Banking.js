import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ArticleGrid from '../components/ArticleGrid';
import BankingStats from '../components/BankingStats';
import LoadingSpinner from '../components/LoadingSpinner';
import './Banking.css';

const Banking = () => {
  const [articles, setArticles] = useState([]);
  const [bankingData, setBankingData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBankingArticles();
    fetchBankingData();
  }, []);

  const fetchBankingArticles = async () => {
    try {
      const response = await axios.get('/api/articles?category=banking&limit=9');
      setArticles(response.data.articles);
    } catch (error) {
      console.error('Error fetching banking articles:', error);
    }
  };

  const fetchBankingData = async () => {
    try {
      // Simulated banking data
      const data = {
        totalAssets: 45.2,
        assetsGrowth: 8.7,
        totalDeposits: 32.8,
        depositsGrowth: 6.3,
        totalLoans: 28.4,
        loansGrowth: 9.1,
        nonPerformingLoans: 4.2,
        nplChange: -0.3
      };
      setBankingData(data);
    } catch (error) {
      console.error('Error fetching banking data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="banking-page">
      <div className="page-header">
        <div className="container">
          <h1>Banking & Finance</h1>
          <p>Banking sector news, regulations, and financial services</p>
        </div>
      </div>

      <div className="container">
        {bankingData && <BankingStats data={bankingData} />}

        <div className="banking-content">
          <div className="main-content">
            <h2>Banking News</h2>
            <ArticleGrid articles={articles} />
          </div>

          <div className="sidebar">
            <div className="sidebar-widget">
              <h3>Banking Institutions</h3>
              <div className="banks-list">
                <div className="bank-item">
                  <h4>Central Bank of Eswatini</h4>
                  <p>Regulatory updates and monetary policy</p>
                </div>
                <div className="bank-item">
                  <h4>Commercial Banks</h4>
                  <p>Retail and corporate banking news</p>
                </div>
                <div className="bank-item">
                  <h4>Microfinance</h4>
                  <p>Small business and personal finance</p>
                </div>
              </div>
            </div>

            <div className="sidebar-widget">
              <h3>Financial Services</h3>
              <div className="services-list">
                <div className="service-item">Digital Banking</div>
                <div className="service-item">Mobile Payments</div>
                <div className="service-item">Investment Services</div>
                <div className="service-item">Insurance</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banking;