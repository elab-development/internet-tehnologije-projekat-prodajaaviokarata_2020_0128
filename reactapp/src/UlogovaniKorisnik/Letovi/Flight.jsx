import React from 'react';

const Flight = ({ flight }) => {
  return (
    <tr>
      <td>{flight.flight_number}</td>
      <td>{flight.departure_city}</td>
      <td>{flight.arrival_city}</td>
      <td>{flight.departure_time}</td>
      <td>{flight.arrival_time}</td>
      <td>{flight.price}</td>
      <td>{flight.total_seats}</td>
      <td>{flight.reserved_seats}</td>
    </tr>
  );
};

export default Flight;
