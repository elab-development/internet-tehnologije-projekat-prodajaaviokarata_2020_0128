import React from 'react';
import useTickets from './useTickets';
import axios from 'axios';
import './MojeKarte.css';
import { FaDownload } from 'react-icons/fa';
const MojeKarte = () => {
  const [tickets] = useTickets();

  const downloadPdf = async (ticketId) => {
    const token = sessionStorage.getItem('token');
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/tickets/${ticketId}/download-pdf`, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        responseType: 'blob' // This is important for downloading binary data
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'ticket.pdf');
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('Error downloading PDF:', error);
    }
  };

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
                <td>
                  <button onClick={() => downloadPdf(ticket.id)}><FaDownload></FaDownload></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MojeKarte;
