import React from 'react';
import useTickets from './useTickets';
import './MojeKarte.css';
import TicketRow from './TicketRow';  

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
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map(ticket => (
              <TicketRow key={ticket.id} ticket={ticket} /> // Use the TicketRow component
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MojeKarte;
