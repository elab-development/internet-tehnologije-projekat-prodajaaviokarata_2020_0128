import React from 'react';
import useFlights from './useFlights';
import './Letovi.css';  
import Flight from './Flight';  

const Letovi = ({ user }) => {
  const [flights] = useFlights();

  return (
    <div className="letovi-container">
      <h1 className="letovi-title">Flights</h1>
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
          {flights.map(flight => (
            <Flight key={flight.id} flight={flight} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Letovi;
