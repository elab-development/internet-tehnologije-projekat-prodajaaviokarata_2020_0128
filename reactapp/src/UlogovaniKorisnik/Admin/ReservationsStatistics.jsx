import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import './ReservationsStatistics.css'; // Import CSS file

// Registracija potrebnih komponenti
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

const ReservationsStatistics = () => {
  const [reservationsByFlight, setReservationsByFlight] = useState({});
  const [reservationStatuses, setReservationStatuses] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const token = sessionStorage.getItem('token');
        const response = await axios.get('http://127.0.0.1:8000/api/statistics', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const data = response.data;
        setReservationsByFlight(data.reservationsByFlight);
        setReservationStatuses(data.reservationStatuses);
        setLoading(false);
      } catch (err) {
        setError('An error occurred. Please try again later.');
        setLoading(false);
      }
    };

    fetchStatistics();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const flightNumbers = Object.keys(reservationsByFlight);
  const reservationCounts = Object.values(reservationsByFlight);

  const statusLabels = Object.keys(reservationStatuses);
  const statusCounts = Object.values(reservationStatuses);

  const barChartData = {
    labels: flightNumbers,
    datasets: [
      {
        label: 'Number of Reservations',
        data: reservationCounts,
        backgroundColor: 'rgba(75,192,192,0.6)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1
      }
    ]
  };

  const pieChartData = {
    labels: statusLabels,
    datasets: [
      {
        label: 'Reservation Status',
        data: statusCounts,
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
      }
    ]
  };

  return (
    <div className="statistics-container">
      <h2>Reservations by Flight</h2>
      <div className="statistics-chart">
        <Bar data={barChartData} />
      </div>
      <h2>Reservation Status</h2>
      <div className="statistics-chart">
        <Pie data={pieChartData} />
      </div>
    </div>
  );
};

export default ReservationsStatistics;
