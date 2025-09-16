import React, { useState } from 'react';
import './Subscription.css';

const Subscription = () => {
  const [selectedPlan, setSelectedPlan] = useState('premium');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    address: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const subscriptionPlans = [
    {
      id: 'basic',
      name: 'Basic Digital',
      price: '99',
      period: 'month',
      features: [
        'Full online access',
        'Daily news alerts',
        'Market updates',
        'Basic newsletter'
      ],
      recommended: false
    },
    {
      id: 'premium',
      name: 'Premium Digital',
      price: '199',
      period: 'month',
      features: [
        'All Basic features',
        'Premium analysis',
        'Exclusive reports',
        'Digital archive access',
        'Ad-free experience',
        'Mobile app access'
      ],
      recommended: true
    },
    {
      id: 'print',
      name: 'Print + Digital',
      price: '299',
      period: 'month',
      features: [
        'All Premium features',
        'Daily print delivery',
        'Weekend magazine',
        'Special supplements',
        'Priority customer support'
      ],
      recommended: false
    }
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate subscription process
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Subscription successful! Thank you for subscribing.');
    }, 2000);
  };

  return (
    <div className="subscription-page">
      <div className="page-header">
        <div className="container">
          <h1>Subscribe Now</h1>
          <p>Choose the plan that's right for you</p>
        </div>
      </div>

      <div className="container">
        <div className="subscription-content">
          <div className="plans-section">
            <h2>Subscription Plans</h2>
            <p className="section-description">
              Get unlimited access to premium financial news, analysis, 
              and exclusive content with our flexible subscription plans.
            </p>

            <div className="plans-grid">
              {subscriptionPlans.map(plan => (
                <div
                  key={plan.id}
                  className={`plan-card ${plan.recommended ? 'recommended' : ''}`}
                  onClick={() => setSelectedPlan(plan.id)}
                >
                  {plan.recommended && (
                    <div className="recommended-badge">Most Popular</div>
                  )}
                  
                  <h3>{plan.name}</h3>
                  <div className="plan-price">
                    <span className="currency">SZL</span>
                    <span className="amount">{plan.price}</span>
                    <span className="period">/{plan.period}</span>
                  </div>
                  
                  <ul className="plan-features">
                    {plan.features.map((feature, index) => (
                      <li key={index}>
                        <i className="fas fa-check"></i>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <button
                    className={`btn ${plan.recommended ? 'btn-primary' : 'btn-outline'}`}
                  >
                    Select Plan
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="subscription-form-section">
            <h2>Subscribe to {subscriptionPlans.find(p => p.id === selectedPlan)?.name}</h2>
            
            <form onSubmit={handleSubmit} className="subscription-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
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
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="company">Company</label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="address">Delivery Address</label>
                <textarea
                  id="address"
                  name="address"
                  rows="3"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Required for print subscriptions"
                ></textarea>
              </div>

              <div className="payment-section">
                <h3>Payment Information</h3>
                <div className="payment-methods">
                  <label className="payment-method">
                    <input type="radio" name="payment" value="card" defaultChecked />
                    <span>Credit/Debit Card</span>
                  </label>
                  <label className="payment-method">
                    <input type="radio" name="payment" value="bank" />
                    <span>Bank Transfer</span>
                  </label>
                  <label className="payment-method">
                    <input type="radio" name="payment" value="mobile" />
                    <span>Mobile Money</span>
                  </label>
                </div>

                <div className="card-form">
                  <div className="form-group">
                    <label htmlFor="cardNumber">Card Number</label>
                    <input
                      type="text"
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      required
                    />
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="expiry">Expiry Date</label>
                      <input
                        type="text"
                        id="expiry"
                        placeholder="MM/YY"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="cvv">CVV</label>
                      <input
                        type="text"
                        id="cvv"
                        placeholder="123"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-footer">
                <div className="total-amount">
                  <span>Total: </span>
                  <span className="amount">SZL {subscriptionPlans.find(p => p.id === selectedPlan)?.price}</span>
                  <span className="period">/{subscriptionPlans.find(p => p.id === selectedPlan)?.period}</span>
                </div>
                
                <button
                  type="submit"
                  className="btn btn-primary btn-large"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Processing...' : 'Subscribe Now'}
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="benefits-section">
          <h2>Why Subscribe?</h2>
          <div className="benefits-grid">
            <div className="benefit-card">
              <i className="fas fa-newspaper"></i>
              <h3>Exclusive Content</h3>
              <p>Access to premium articles and in-depth analysis</p>
            </div>
            <div className="benefit-card">
              <i className="fas fa-chart-line"></i>
              <h3>Market Insights</h3>
              <p>Real-time market data and expert commentary</p>
            </div>
            <div className="benefit-card">
              <i className="fas fa-mobile-alt"></i>
              <h3>Mobile Access</h3>
              <p>Read anywhere on our mobile app</p>
            </div>
            <div className="benefit-card">
              <i className="fas fa-bell"></i>
              <h3>Instant Alerts</h3>
              <p>Get notified about breaking news</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscription;