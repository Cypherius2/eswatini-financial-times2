import { Link } from 'react-router-dom'
import '../styles/Footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Eswatini Financial Times</h3>
            <p>Your trusted source for financial news in Eswatini</p>
          </div>
          
          <div className="footer-section">
            <h4>Quick Links</h4>
            <Link to="/">Home</Link>
            <Link to="/news">News</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </div>
          
          <div className="footer-section">
            <h4>Categories</h4>
            <Link to="/categories?category=economy">Economy</Link>
            <Link to="/categories?category=markets">Markets</Link>
            <Link to="/categories?category=business">Business</Link>
            <Link to="/categories?category=banking">Banking</Link>
          </div>
          
          <div className="footer-section">
            <h4>Contact Info</h4>
            <p>Email: info@eswatinifinancialtimes.com</p>
            <p>Phone: +268 2404 0000</p>
            <p>Address: Mbabane, Eswatini</p>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2023 Eswatini Financial Times. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
