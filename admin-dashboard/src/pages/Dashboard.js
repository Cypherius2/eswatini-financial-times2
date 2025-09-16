import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { Bar, Line, Pie } from 'react-chartjs-2';
import '../styles/Dashboard.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalArticles: 0,
    publishedArticles: 0,
    totalUsers: 0,
    totalViews: 0
  });
  const [recentArticles, setRecentArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [statsRes, articlesRes] = await Promise.all([
        axios.get('/api/admin/stats'),
        axios.get('/api/articles?limit=5')
      ]);
      
      setStats(statsRes.data);
      setRecentArticles(articlesRes.data.articles);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Articles Published',
        data: [12, 19, 8, 15, 22, 18],
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  const trafficData = {
    labels: ['Direct', 'Social', 'Search', 'Referral', 'Email'],
    datasets: [
      {
        data: [35, 25, 20, 15, 5],
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(153, 102, 255, 0.8)',
        ],
      },
    ],
  };

  if (loading) {
    return <div className="loading">Loading dashboard...</div>;
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Welcome to the Eswatini Financial Times Admin Panel</p>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <i className="fas fa-newspaper"></i>
          </div>
          <div className="stat-content">
            <h3>{stats.totalArticles}</h3>
            <p>Total Articles</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">
            <i className="fas fa-check-circle"></i>
          </div>
          <div className="stat-content">
            <h3>{stats.publishedArticles}</h3>
            <p>Published Articles</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">
            <i className="fas fa-users"></i>
          </div>
          <div className="stat-content">
            <h3>{stats.totalUsers}</h3>
            <p>Total Users</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">
            <i className="fas fa-eye"></i>
          </div>
          <div className="stat-content">
            <h3>{stats.totalViews}</h3>
            <p>Total Views</p>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="charts-grid">
        <div className="chart-card">
          <h3>Articles Published (Last 6 Months)</h3>
          <Bar data={chartData} options={{ responsive: true }} />
        </div>
        
        <div className="chart-card">
          <h3>Traffic Sources</h3>
          <Pie data={trafficData} options={{ responsive: true }} />
        </div>
      </div>

      {/* Recent Articles */}
      <div className="recent-section">
        <h3>Recent Articles</h3>
        <div className="recent-articles">
          {recentArticles.map(article => (
            <div key={article._id} className="article-item">
              <div className="article-image">
                <img src={article.featuredImage || '/api/placeholder/60/60'} alt={article.title} />
              </div>
              <div className="article-content">
                <h4>{article.title}</h4>
                <p>{new Date(article.publishedAt).toLocaleDateString()}</p>
                <span className={`status ${article.status}`}>{article.status}</span>
              </div>
              <div className="article-views">
                <i className="fas fa-eye"></i>
                {article.views}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <h3>Quick Actions</h3>
        <div className="action-buttons">
          <button className="action-btn">
            <i className="fas fa-plus"></i>
            New Article
          </button>
          <button className="action-btn">
            <i className="fas fa-user-plus"></i>
            Add User
          </button>
          <button className="action-btn">
            <i className="fas fa-cog"></i>
            Settings
          </button>
          <button className="action-btn">
            <i className="fas fa-chart-bar"></i>
            Analytics
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
