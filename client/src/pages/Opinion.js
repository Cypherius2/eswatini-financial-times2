import React, { useState, useEffect } from 'react';
import axios from 'axios';
import OpinionCard from '../components/OpinionCard';
import LoadingSpinner from '../components/LoadingSpinner';
import './Opinion.css';

const Opinion = () => {
  const [opinions, setOpinions] = useState([]);
  const [columnists, setColumnists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOpinions();
    fetchColumnists();
  }, []);

  const fetchOpinions = async () => {
    try {
      const response = await axios.get('/api/articles?category=opinion&limit=12');
      setOpinions(response.data.articles);
    } catch (error) {
      console.error('Error fetching opinions:', error);
    }
  };

  const fetchColumnists = async () => {
    try {
      // Simulated columnists data
      const columnistsData = [
        {
          name: 'Dr. James Dlamini',
          role: 'Economic Analyst',
          bio: 'Expert in economic policy and development',
          articles: 45
        },
        {
          name: 'Sarah Mamba',
          role: 'Business Editor',
          bio: 'Specializing in market trends and analysis',
          articles: 32
        },
        {
          name: 'Professor John Khumalo',
          role: 'Financial Commentator',
          bio: 'Former banker with 20 years experience',
          articles: 28
        }
      ];
      setColumnists(columnistsData);
    } catch (error) {
      console.error('Error fetching columnists:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="opinion-page">
      <div className="page-header">
        <div className="container">
          <h1>Opinion & Analysis</h1>
          <p>Expert perspectives and commentary on current affairs</p>
        </div>
      </div>

      <div className="container">
        <div className="opinion-content">
          <div className="main-content">
            <h2>Latest Opinions</h2>
            <div className="opinions-grid">
              {opinions.map(opinion => (
                <OpinionCard key={opinion._id} opinion={opinion} />
              ))}
            </div>
          </div>

          <div className="sidebar">
            <div className="sidebar-widget">
              <h3>Our Columnists</h3>
              <div className="columnists-list">
                {columnists.map(columnist => (
                  <div key={columnist.name} className="columnist-item">
                    <div className="columnist-avatar">
                      {columnist.name.charAt(0)}
                    </div>
                    <div className="columnist-info">
                      <h4>{columnist.name}</h4>
                      <p className="columnist-role">{columnist.role}</p>
                      <p className="columnist-bio">{columnist.bio}</p>
                      <span className="columnist-articles">
                        {columnist.articles} articles
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="sidebar-widget">
              <h3>Submit Your Opinion</h3>
              <div className="submit-opinion">
                <p>Interested in contributing? Send us your opinion piece.</p>
                <button className="btn btn-outline">Contact Editors</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Opinion;