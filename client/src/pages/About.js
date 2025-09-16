import React from 'react';
import TeamMember from '../components/TeamMember';
import './About.css';

const About = () => {
  const teamMembers = [
    {
      name: 'Dr. James Dlamini',
      role: 'Editor-in-Chief',
      bio: '20+ years experience in financial journalism',
      image: '/team/james.jpg'
    },
    {
      name: 'Sarah Mamba',
      role: 'Managing Editor',
      bio: 'Specializes in economic analysis and reporting',
      image: '/team/sarah.jpg'
    },
    {
      name: 'Michael Kunene',
      role: 'Senior Reporter',
      bio: 'Focuses on markets and banking sector',
      image: '/team/michael.jpg'
    },
    {
      name: 'Lisa Zwane',
      role: 'Technology Editor',
      bio: 'Covers digital transformation and innovation',
      image: '/team/lisa.jpg'
    }
  ];

  const milestones = [
    { year: '2010', event: 'Founded as Eswatini Financial Review' },
    { year: '2015', event: 'Rebranded to Eswatini Financial Times' },
    { year: '2018', event: 'Launched digital edition and mobile app' },
    { year: '2020', event: 'Reached 50,000+ monthly readers' },
    { year: '2023', event: 'Won Best Financial Publication Award' }
  ];

  return (
    <div className="about-page">
      <div className="page-header">
        <div className="container">
          <h1>About Us</h1>
          <p>Your trusted source for financial news and analysis</p>
        </div>
      </div>

      <div className="container">
        <section className="about-section">
          <div className="about-content">
            <div className="about-text">
              <h2>Our Mission</h2>
              <p>
                Eswatini Financial Times is dedicated to providing accurate, timely, 
                and insightful financial news and analysis. We strive to empower our 
                readers with the information they need to make informed decisions in 
                an increasingly complex economic landscape.
              </p>
              <p>
                Our team of experienced journalists and analysts work tirelessly to 
                bring you comprehensive coverage of markets, economy, banking, and 
                technology sectors in Eswatini and beyond.
              </p>
            </div>
            <div className="about-image">
              <img src="/about-mission.jpg" alt="Our Mission" />
            </div>
          </div>
        </section>

        <section className="values-section">
          <h2>Our Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <i className="fas fa-target"></i>
              <h3>Accuracy</h3>
              <p>We prioritize factual reporting and verification</p>
            </div>
            <div className="value-card">
              <i className="fas fa-lightbulb"></i>
              <h3>Insight</h3>
              <p>Providing deep analysis and context</p>
            </div>
            <div className="value-card">
              <i className="fas fa-shield-alt"></i>
              <h3>Integrity</h3>
              <p>Maintaining ethical standards in journalism</p>
            </div>
            <div className="value-card">
              <i className="fas fa-users"></i>
              <h3>Community</h3>
              <p>Serving the people of Eswatini</p>
            </div>
          </div>
        </section>

        <section className="team-section">
          <h2>Our Team</h2>
          <div className="team-grid">
            {teamMembers.map(member => (
              <TeamMember key={member.name} member={member} />
            ))}
          </div>
        </section>

        <section className="milestones-section">
          <h2>Our Journey</h2>
          <div className="timeline">
            {milestones.map((milestone, index) => (
              <div key={milestone.year} className="timeline-item">
                <div className="timeline-year">{milestone.year}</div>
                <div className="timeline-content">
                  <p>{milestone.event}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="contact-section">
          <h2>Get in Touch</h2>
          <div className="contact-info">
            <div className="contact-item">
              <i className="fas fa-map-marker-alt"></i>
              <div>
                <h3>Address</h3>
                <p>123 Financial Street, Mbabane, Eswatini</p>
              </div>
            </div>
            <div className="contact-item">
              <i className="fas fa-phone"></i>
              <div>
                <h3>Phone</h3>
                <p>+268 1234 5678</p>
              </div>
            </div>
            <div className="contact-item">
              <i className="fas fa-envelope"></i>
              <div>
                <h3>Email</h3>
                <p>info@eswatinifinancialtimes.com</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;