import React, { useState } from 'react';
import useTickets from './useTickets';
import './MojeKarte.css';
import TicketRow from './TicketRow';  

const MojeKarte = () => {
  const [tickets] = useTickets();
  const [currentPage, setCurrentPage] = useState(1);
  const ticketsPerPage = 5;

  const indexOfLastTicket = currentPage * ticketsPerPage;
  const indexOfFirstTicket = indexOfLastTicket - ticketsPerPage;
  const currentTickets = tickets.slice(indexOfFirstTicket, indexOfLastTicket);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
            {currentTickets.map(ticket => (
              <TicketRow key={ticket.id} ticket={ticket} />
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
