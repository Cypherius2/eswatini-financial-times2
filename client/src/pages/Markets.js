import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MarketDashboard from '../components/MarketDashboard';
import StockTicker from '../components/StockTicker';
import LoadingSpinner from '../components/LoadingSpinner';
import './Markets.css';

const Markets = () => {
  const [marketData, setMarketData] = useState(null);
  const [stockData, setStockData] = useState([]);
  const [currencyData, setCurrencyData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMarketData();
    fetchStockData();
    fetchCurrencyData();
  }, []);

  const fetchMarketData = async () => {
    try {
      // Simulated market data
      const data = {
        allShareIndex: 5248.76,
        indexChange: 1.25,
        volume: 245893,
        topGainer: { name: 'SBH Bank', change: 3.2 },
        topLoser: { name: 'Sugar Corp', change: -1.8 }
      };
      setMarketData(data);
    } catch (error) {
      console.error('Error fetching market data:', error);
    }
  };

  const fetchStockData = async () => {
    try {
      // Simulated stock data
      const stocks = [
        { symbol: 'SBH', name: 'SBH Bank', price: 45.67, change: 3.2 },
        { symbol: 'SC', name: 'Sugar Corp', price: 23.45, change: -1.8 },
        { symbol: 'EBL', name: 'Eswatini Breweries', price: 78.90, change: 1.5 },
        { symbol: 'RBL', name: 'Royal Bank', price: 34.56, change: 2.1 }
      ];
      setStockData(stocks);
    } catch (error) {
      console.error('Error fetching stock data:', error);
    }
  };

  const fetchCurrencyData = async () => {
    try {
      // Simulated currency data
      const currencies = [
        { pair: 'SZL/USD', rate: 18.25, change: -0.32 },
        { pair: 'SZL/EUR', rate: 19.87, change: 0.15 },
        { pair: 'SZL/GBP', rate: 22.34, change: -0.21 },
        { pair: 'SZL/ZAR', rate: 1.35, change: 0.05 }
      ];
      setCurrencyData(currencies);
    } catch (error) {
      console.error('Error fetching currency data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="markets-page">
      <div className="page-header">
        <div className="container">
          <h1>Markets</h1>
          <p>Real-time market data and financial information</p>
        </div>
      </div>

      <div className="container">
        <StockTicker stocks={stockData} />

        {marketData && <MarketDashboard data={marketData} />}

        <div className="market-sections">
          <div className="market-section">
            <h2>Stock Market</h2>
            <div className="stock-table">
              <div className="table-header">
                <span>Symbol</span>
                <span>Name</span>
                <span>Price</span>
                <span>Change</span>
              </div>
              {stockData.map(stock => (
                <div key={stock.symbol} className="table-row">
                  <span className="symbol">{stock.symbol}</span>
                  <span className="name">{stock.name}</span>
                  <span className="price">SZL {stock.price.toFixed(2)}</span>
                  <span className={`change ${stock.change >= 0 ? 'positive' : 'negative'}`}>
                    {stock.change >= 0 ? '+' : ''}{stock.change}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="market-section">
            <h2>Currency Exchange</h2>
            <div className="currency-table">
              <div className="table-header">
                <span>Pair</span>
                <span>Rate</span>
                <span>Change</span>
              </div>
              {currencyData.map(currency => (
                <div key={currency.pair} className="table-row">
                  <span className="pair">{currency.pair}</span>
                  <span className="rate">{currency.rate.toFixed(2)}</span>
                  <span className={`change ${currency.change >= 0 ? 'positive' : 'negative'}`}>
                    {currency.change >= 0 ? '+' : ''}{currency.change}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Markets;