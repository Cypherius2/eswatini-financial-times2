import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    category: 'general'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '', category: 'general' });
      
      // Clear success message after 3 seconds
      setTimeout(() => setSubmitStatus(null), 3000);
    }, 2000);
  };

  const contactMethods = [
    {
      icon: 'fas fa-map-marker-alt',
      title: 'Visit Us',
      details: '123 Financial Street, Mbabane, Eswatini',
      description: 'Our main office location'
    },
    {
      icon: 'fas fa-phone',
      title: 'Call Us',
      details: '+268 1234 5678',
      description: 'Mon-Fri from 8am to 5pm'
    },
    {
      icon: 'fas fa-envelope',
      title: 'Email Us',
      details: 'info@eswatinifinancialtimes.com',
      description: 'Send us a message anytime'
    },
    {
      icon: 'fas fa-clock',
      title: 'Business Hours',
      details: 'Mon - Fri: 8:00 - 17:00',
      description: 'Closed on weekends and holidays'
    }
  ];

  return (
    <div className="contact-page">
      <div className="page-header">
        <div className="container">
          <h1>Contact Us</h1>
          <p>Get in touch with our team</p>
        </div>
      </div>

      <div className="container">
        <div className="contact-content">
          <div className="contact-info">
            <h2>Get in Touch</h2>
            <p>
              Have questions, suggestions, or need more information? 
              We'd love to hear from you. Reach out through any of 
              the following methods.
            </p>

            <div className="contact-methods">
              {contactMethods.map((method, index) => (
                <div key={index} className="contact-method">
                  <div className="method-icon">
                    <i className={method.icon}></i>
                  </div>
                  <div className="method-content">
                    <h3>{method.title}</h3>
                    <p className="method-details">{method.details}</p>
                    <p className="method-description">{method.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="social-media">
              <h3>Follow Us</h3>
              <div className="social-links">
                <a href="#" className="social-link">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="social-link">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="social-link">
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a href="#" className="social-link">
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
            </div>
          </div>

          <div className="contact-form-container">
            <h2>Send a Message</h2>
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="category">Category</label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                  >
                    <option value="general">General Inquiry</option>
                    <option value="subscription">Subscription</option>
                    <option value="advertising">Advertising</option>
                    <option value="editorial">Editorial</option>
                    <option value="technical">Technical Support</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="subject">Subject *</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>

              {submitStatus === 'success' && (
                <div className="form-success">
                  <i className="fas fa-check-circle"></i>
                  Thank you! Your message has been sent successfully.
                </div>
              )}
            </form>
          </div>
        </div>

        <div className="map-section">
          <h2>Our Location</h2>
          <div className="map-placeholder">
            <div className="map-content">
              <i className="fas fa-map-marked-alt"></i>
              <h3>Interactive Map</h3>
              <p>123 Financial Street, Mbabane, Eswatini</p>
              <button className="btn btn-outline">
                Open in Google Maps
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;