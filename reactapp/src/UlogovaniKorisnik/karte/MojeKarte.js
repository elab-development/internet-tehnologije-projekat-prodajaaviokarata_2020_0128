import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useTickets from './useTickets';
import './MojeKarte.css';
import TicketRow from './TicketRow';  

const MojeKarte = () => {
  const [tickets] = useTickets();
  const [currentPage, setCurrentPage] = useState(1);
  const ticketsPerPage = 5;
  const [currency, setCurrency] = useState('EUR');
  const [exchangeRates, setExchangeRates] = useState({});

  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/EUR`);
        setExchangeRates(response.data.rates);
      } catch (error) {
        console.error('Error fetching exchange rates', error);
      }
    };

    fetchExchangeRates();
  }, []);

  const handleCurrencyChange = (event) => {
    setCurrency(event.target.value);
  };

  const indexOfLastTicket = currentPage * ticketsPerPage;
  const indexOfFirstTicket = indexOfLastTicket - ticketsPerPage;
  const currentTickets = tickets.slice(indexOfFirstTicket, indexOfLastTicket);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const convertPrice = (price, currency) => {
    if (!exchangeRates[currency]) return price;
    return (price * exchangeRates[currency]).toFixed(2);
  };

  return (
    <div className="moje-karte-container">
      <h1 className="moje-karte-title">My Tickets</h1>
      <div className="currency-selector">
        <label htmlFor="currency">Choose your currency: </label>
        <select id="currency" value={currency} onChange={handleCurrencyChange}>
          {Object.keys(exchangeRates).map((rate) => (
            <option key={rate} value={rate}>
              {rate}
            </option>
          ))}
        </select>
      </div>
      {tickets.length === 0 ? (
        <p>No tickets found</p>
      ) : (
        <table className="moje-karte-table">
          <thead>
            <tr>
              <th>Ticket ID</th>
              <th>Flight Number</th>
              <th>Departure City</th>
              <th>Arrival City</th>
              <th>Departure Time</th>
              <th>Arrival Time</th>
              <th>Seat Number</th>
              <th>Ticket Price ({currency})</th>
              <th>Reservation Status</th>
              <th>Purchase Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentTickets.map(ticket => (
              <TicketRow key={ticket.id} ticket={{ ...ticket, price: convertPrice(ticket.price, currency) }} />
            ))}
          </tbody>
        </table>
      )}
      <div className="pagination">
        {[...Array(Math.ceil(tickets.length / ticketsPerPage)).keys()].map(number => (
          <button key={number} onClick={() => paginate(number + 1)} className={`page-item ${currentPage === number + 1 ? 'active' : ''}`}>
            {number + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MojeKarte;
