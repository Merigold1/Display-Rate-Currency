import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect, useState } from 'react'

// masih belom beres

const App = () => {
  const [rates, setRates] = useState([]);
  const API_URL = 'https://api.currencyfreaks.com/v2.0/rates/latest?apikey=9c91e2e5b07c4b82ae2790c2e9c00369';

  useEffect(() => {
    fetch(API_URL)
      .then(response => response.json())
      .then(data => {
        const currencies = ['CAD', 'IDR', 'JPY', 'CHF', 'EUR', 'GBP'];
        const ratesData = currencies.map(currency => {
          const exchangeRate = parseFloat(data.rates[currency]);
          return {
            currency,
            weBuy: (exchangeRate * 1.05).toFixed(4),
            exchangeRate: exchangeRate.toFixed(4),
            weSell: (exchangeRate * 0.95).toFixed(4)
          };
        });
        setRates(ratesData);
      })
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="container">
      <table className='table table-hover table-striped mt-5'>
        <thead>
          <tr>
            <th>Currency</th>
            <th>We Buy</th>
            <th>Exchange Rate</th>
            <th>We Sell</th>
          </tr>
        </thead>
        <tbody>
          {
            rates.map((rate) => (
              <tr key={rate.currency}>
                <td>{rate.currency}</td>
                <td>{rate.weBuy}</td>
                <td>{rate.exchangeRate}</td>
                <td>{rate.weSell}</td>
              </tr>
            ))
          };
        </tbody>
      </table>
    </div>
  );
};

export default App;