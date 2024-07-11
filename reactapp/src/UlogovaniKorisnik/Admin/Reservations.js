import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Reservations.css';

const Reservations = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(10);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const token = sessionStorage.getItem('token');
        const response = await axios.get('http://127.0.0.1:8000/api/reservations', {
          headers: {
            Authorization: `Bearer ${token}`
          },
          params: {
            search,
            page: currentPage,
            per_page: perPage,
          }
        });
        setReservations(response.data.data);
        setLoading(false);
      } catch (err) {
        setError('An error occurred. Please try again later.');
        setLoading(false);
      }
    };

    fetchReservations();
  }, [search, currentPage]);

  const handleApprove = async (id) => {
    try {
      const token = sessionStorage.getItem('token');
      await axios.post(`http://127.0.0.1:8000/api/reservations/${id}/approve`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setReservations(reservations.filter(reservation => reservation.id !== id));
    } catch (error) {
      console.error('Approval failed:', error);
    }
  };

  const handleReject = async (id) => {
    try {
      const token = sessionStorage.getItem('token');
      await axios.post(`http://127.0.0.1:8000/api/reservations/${id}/reject`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setReservations(reservations.filter(reservation => reservation.id !== id));
    } catch (error) {
      console.error('Rejection failed:', error);
    }
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="reservations-container">
      <h1 className="reservations-title">All Reservations</h1>
      <input
        type="text"
        placeholder="Search reservations"
        value={search}
        onChange={handleSearchChange}
        className="reservations-search"
      />
      <table className="reservations-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>User</th>
            <th>Flight Number</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map(reservation => (
            <tr key={reservation.id}>
              <td>{reservation.id}</td>
              <td>{reservation.user.name}</td>
              <td>{reservation.flight.flight_number}</td>
              <td>{reservation.status}</td>
              <td>
                <button onClick={() => handleApprove(reservation.id)}>Approve</button>
                <button onClick={() => handleReject(reservation.id)}>Reject</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        {[...Array(Math.ceil(reservations.length / perPage)).keys()].map(number => (
          <button
            key={number}
            onClick={() => setCurrentPage(number + 1)}
            className={`page-item ${currentPage === number + 1 ? 'active' : ''}`}
          >
            {number + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Reservations;
