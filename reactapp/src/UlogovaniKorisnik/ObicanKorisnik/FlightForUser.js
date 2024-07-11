import React, { useState } from 'react';
import './FlightForUser.css';
import axios from 'axios';

const FlightForUser = ({ flight }) => {
  const [numberOfTickets, setNumberOfTickets] = useState(1);
  const [seatId, setSeatId] = useState(null);
  const [seats, setSeats] = useState([]);
  const [message, setMessage] = useState('');

  const fetchSeats = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/flights/${flight.id}/seats`, {
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
      });
  
      if (response.status === 200) {
        setSeats(response.data.data);
      } else {
        console.error('Failed to fetch seats:', response.data);
      }
    } catch (error) {
      console.error('Error fetching seats:', error);
    }
  };

  const handleReserve = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        },
        body: JSON.stringify({
          flight_id: flight.id,
          status: 'reserved',
          seat_id: seatId,
          number_of_tickets: numberOfTickets
        })
      });

      const data = await response.json();
      if (response.ok) {
        setMessage('Reservation successful!');
      } else {
        setMessage('Reservation failed. Please try again.');
        console.error(data);
      }
    } catch (error) {
      setMessage('Reservation failed. Please try again.');
      console.error(error);
    }
  };

  return (
    <tr>
      <td>{flight.flight_number}</td>
      <td>{flight.departure_city}</td>
      <td>{flight.arrival_city}</td>
      <td>{flight.departure_time}</td>
      <td>{flight.arrival_time}</td>
      <td>{flight.price}</td>
      <td>
        <button onClick={fetchSeats}>Reserve</button>
        {seats.length > 0 && (
          <div>
            <select onChange={(e) => setSeatId(e.target.value)}>
              <option value="">Select Seat</option>
              {seats.map((seat) => (
                <option key={seat.id} value={seat.id}>{seat.seat_number}</option>
              ))}
            </select>
            <input
              type="number"
              value={numberOfTickets}
              onChange={(e) => setNumberOfTickets(e.target.value)}
              min="1"
            />
            <button onClick={handleReserve}>Confirm Reservation</button>
          </div>
        )}
      </td>
    </tr>
  );
};

export default FlightForUser;
