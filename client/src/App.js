import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import News from './pages/News';
import Business from './pages/Business';
import Economy from './pages/Economy';
import Markets from './pages/Markets';
import Banking from './pages/Banking';
import Technology from './pages/Technology';
import Opinion from './pages/Opinion';
import About from './pages/About';
import Contact from './pages/Contact';
import Subscription from './pages/Subscription';
import Article from './pages/Article';
import Category from './pages/Category';
import Search from './pages/Search';
import NotFound from './pages/NotFound';
import { ArticleProvider } from './context/ArticleContext';
import './styles/App.css';

function App() {
  return (
    <ArticleProvider>
      <Router>
        <ScrollToTop />
        <div className="App">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/news" element={<News />} />
              <Route path="/business" element={<Business />} />
              <Route path="/economy" element={<Economy />} />
              <Route path="/markets" element={<Markets />} />
              <Route path="/banking" element={<Banking />} />
              <Route path="/technology" element={<Technology />} />
              <Route path="/opinion" element={<Opinion />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/subscription" element={<Subscription />} />
              <Route path="/article/:slug" element={<Article />} />
              <Route path="/category/:slug" element={<Category />} />
              <Route path="/search" element={<Search />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ArticleProvider>
  );
}

export default App;