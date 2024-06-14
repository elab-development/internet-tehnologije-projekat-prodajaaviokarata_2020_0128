import React from 'react';
import useTickets from './useTickets';
import './MojeKarte.css';

const MojeKarte = () => {
  const [tickets] = useTickets();

  return (
    <div className="moje-karte-container">
      <h1 className="moje-karte-title">My Tickets</h1>
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
              <th>Ticket Price</th>
              <th>Reservation Status</th>
              <th>Purchase Date</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map(ticket => (
              <tr key={ticket.id}>
                <td>{ticket.id}</td>
                <td>{ticket.flight.flight_number}</td>
                <td>{ticket.flight.departure_city}</td>
                <td>{ticket.flight.arrival_city}</td>
                <td>{ticket.flight.departure_time}</td>
                <td>{ticket.flight.arrival_time}</td>
                <td>{ticket.seat_number}</td>
                <td>{ticket.price}</td>
                <td>{ticket.reservation.status}</td>
                <td>{ticket.created_at}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MojeKarte;
