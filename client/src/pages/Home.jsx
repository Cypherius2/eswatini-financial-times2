import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../styles/Home.css'

const Home = () => {
  const [featuredArticles, setFeaturedArticles] = useState([])
  const [latestArticles, setLatestArticles] = useState([])

  useEffect(() => {
    // Simulated API call
    const fetchArticles = async () => {
      // In a real app, this would be an API call
      const featured = [
        { id: 1, title: 'Eswatini Economy Grows by 3.2%', excerpt: 'The economy shows positive growth despite global challenges...', category: 'Economy' },
        { id: 2, title: 'Central Bank Announces New Policies', excerpt: 'New monetary policies aim to stabilize the financial sector...', category: 'Banking' }
      ]
      
      const latest = [
        { id: 3, title: 'Stock Market Update', excerpt: 'Local markets show mixed results in today\'s trading session...', category: 'Markets' },
        { id: 4, title: 'Business Leaders Forum', excerpt: 'Top executives discuss future of business in Eswatini...', category: 'Business' },
        { id: 5, title: 'Agricultural Sector Growth', excerpt: 'New initiatives boost agricultural exports...', category: 'Economy' }
      ]
      
      setFeaturedArticles(featured)
      setLatestArticles(latest)
    }

    fetchArticles()
  }, [])

  return (
    <div className="home">
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>Eswatini Financial Times</h1>
            <p>Your trusted source for financial news and insights in Eswatini</p>
            <Link to="/subscribe" className="btn btn-primary">Subscribe Now</Link>
          </div>
        </div>
      </section>

      <section className="featured-articles">
        <div className="container">
          <h2>Featured Stories</h2>
          <div className="articles-grid">
            {featuredArticles.map(article => (
              <article key={article.id} className="article-card">
                <div className="article-category">{article.category}</div>
                <h3>{article.title}</h3>
                <p>{article.excerpt}</p>
                <Link to={`/article/${article.id}`} className="read-more">Read More</Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="latest-articles">
        <div className="container">
          <h2>Latest News</h2>
          <div className="articles-list">
            {latestArticles.map(article => (
              <div key={article.id} className="article-item">
                <div className="article-content">
                  <span className="category-tag">{article.category}</span>
                  <h3>{article.title}</h3>
                  <p>{article.excerpt}</p>
                  <Link to={`/article/${article.id}`} className="read-more">Read More</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="newsletter">
        <div className="container">
          <div className="newsletter-content">
            <h2>Stay Updated</h2>
            <p>Subscribe to our newsletter for daily financial insights</p>
            <form className="newsletter-form">
              <input type="email" placeholder="Enter your email" required />
              <button type="submit" className="btn btn-primary">Subscribe</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
