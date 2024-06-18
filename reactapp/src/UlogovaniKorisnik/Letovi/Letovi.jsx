import React, { useState, useEffect } from 'react';
import useFlights from './useFlights';
import './Letovi.css';  
import Flight from './Flight';  

const Letovi = () => {
  const [flights] = useFlights();
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const flightsPerPage = 5;

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    setCurrentPage(1); // Resetujemo na prvu stranicu pri pretrazi
  };

  const filteredFlights = flights.filter(flight => 
    flight.flight_number.toLowerCase().includes(search.toLowerCase()) ||
    flight.departure_city.toLowerCase().includes(search.toLowerCase()) ||
    flight.arrival_city.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLastFlight = currentPage * flightsPerPage;
  const indexOfFirstFlight = indexOfLastFlight - flightsPerPage;
  const currentFlights = filteredFlights.slice(indexOfFirstFlight, indexOfLastFlight);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="letovi-container">
      <h1 className="letovi-title">Flights</h1>
      <input 
        type="text"
        placeholder="Search flights"
        value={search}
        onChange={handleSearchChange}
        className="letovi-search"
      />
      <table className="letovi-table">
        <thead>
          <tr>
            <th>Flight Number</th>
            <th>Departure City</th>
            <th>Arrival City</th>
            <th>Departure Time</th>
            <th>Arrival Time</th>
            <th>Price</th>
            <th>Total Seats</th>
            <th>Reserved Seats</th>
          </tr>
        </thead>
        <tbody>
          {currentFlights.map(flight => (
            <Flight key={flight.id} flight={flight} />
          ))}
        </tbody>
      </table>
      <div className="pagination">
        {[...Array(Math.ceil(filteredFlights.length / flightsPerPage)).keys()].map(number => (
          <button key={number} onClick={() => paginate(number + 1)} className={`page-item ${currentPage === number + 1 ? 'active' : ''}`}>
            {number + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Letovi;
