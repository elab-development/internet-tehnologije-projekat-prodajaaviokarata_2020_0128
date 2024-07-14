import React from 'react';
import { FaDownload } from 'react-icons/fa';
import axios from 'axios';

const TicketRow = ({ ticket }) => {
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
    <tr>
      <td>{ticket.id}</td>
      <td>{ticket.reservation.flight.flight_number}</td>
      <td>{ticket.reservation.flight.departure_city}</td>
      <td>{ticket.reservation.flight.arrival_city}</td>
      <td>{ticket.reservation.flight.departure_time}</td>
      <td>{ticket.reservation.flight.arrival_time}</td>
      <td>{ticket.seat_number}</td>
      <td>{ticket.price}</td>
      <td>{ticket.reservation.status}</td>
      <td>{new Date(ticket.created_at).toLocaleDateString()+" \n"+new Date(ticket.created_at).toLocaleTimeString()}</td>
      <td>
        <button onClick={() => downloadPdf(ticket.id)}><FaDownload /></button>
      </td>
    </tr>
  );
};

export default TicketRow;
