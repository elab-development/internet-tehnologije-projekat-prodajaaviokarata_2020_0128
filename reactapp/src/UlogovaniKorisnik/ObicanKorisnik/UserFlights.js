import React, { useState, useEffect } from 'react'; 
import FlightForUser from './FlightForUser';
import './UserFlights.css';
import useFlights from '../Letovi/useFlights';

const UserFlights = () => {
  const [flights] = useFlights();
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortCriteria, setSortCriteria] = useState(''); // Dodajemo state za sortiranje
  const flightsPerPage = 5;

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    setCurrentPage(1); // Resetujemo na prvu stranicu pri pretrazi
  };

  const handleSortChange = (event) => {
    setSortCriteria(event.target.value);
  };

  const filteredFlights = flights
    .filter(flight =>
      flight.flight_number.toLowerCase().includes(search.toLowerCase()) ||
      flight.departure_city.toLowerCase().includes(search.toLowerCase()) ||
      flight.arrival_city.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortCriteria === 'price') {
        return a.price - b.price;
      } else if (sortCriteria === 'departure_time') {
        return new Date(a.departure_time) - new Date(b.departure_time);
      } else if (sortCriteria === 'arrival_time') {
        return new Date(a.arrival_time) - new Date(b.arrival_time);
      } else {
        return 0;
      }
    });

  const indexOfLastFlight = currentPage * flightsPerPage;
  const indexOfFirstFlight = indexOfLastFlight - flightsPerPage;
  const currentFlights = filteredFlights.slice(indexOfFirstFlight, indexOfLastFlight);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="user-flights-container">
      <h1 className="user-flights-title">Available Flights</h1>
      <input
        type="text"
        placeholder="Search flights"
        value={search}
        onChange={handleSearchChange}
        className="user-flights-search"
      />
      <select value={sortCriteria} onChange={handleSortChange} className="user-flights-sort">
        <option value="">Sort by</option>
        <option value="price">Price</option>
        <option value="departure_time">Departure Time</option>
        <option value="arrival_time">Arrival Time</option>
      </select>
      <table className="user-flights-table">
        <thead>
          <tr>
            <th>Flight Number</th>
            <th>Departure City</th>
            <th>Arrival City</th>
            <th>Departure Time</th>
            <th>Arrival Time</th>
            <th>Price</th>
            <th>Reserve</th>
          </tr>
        </thead>
        <tbody>
          {currentFlights.map(flight => (
            <FlightForUser key={flight.id} flight={flight} />
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

export default UserFlights;
