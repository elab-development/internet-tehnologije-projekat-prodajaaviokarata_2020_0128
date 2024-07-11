import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import useFlights from './useFlights';
import './Letovi.css';
import Flight from './Flight';

const Letovi = () => {
  const [flights, setFlights] = useFlights();
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [lockedFlights, setLockedFlights] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [airports, setAirports] = useState([]);
  const [newFlight, setNewFlight] = useState({
    flight_number: '',
    departure_city: '',
    arrival_city: '',
    departure_time: '',
    arrival_time: '',
    price: '',
    total_seats: '',
    reserved_seats: ''
  });
  const flightsPerPage = 5;

  useEffect(() => {
    // Funkcija za preuzimanje podataka o aerodromima
    const fetchAirports = async () => {
      const githubURL = 'https://raw.githubusercontent.com/jpatokal/openflights/master/data/airports.dat';

      try {
        // Proveravamo da li su podaci već sačuvani u lokalnoj memoriji
        const cachedAirports = localStorage.getItem('airports');
        if (cachedAirports) {
          setAirports(JSON.parse(cachedAirports));
        } else {
          // Ako podaci nisu u lokalnoj memoriji, preuzimamo ih sa GitHub-a
          const response = await fetch(githubURL);
          const data = await response.text();
          const airports = data.split('\n').map(line => line.split(','));
          const airportOptions = airports.map(airport => ({
            value: airport[2], // grad
            label: `${airport[2]} - ${airport[1]}` // grad - naziv aerodroma
          })).filter(airport => airport.value);

          // Sačuvajemo preuzete podatke u lokalnu memoriju za buduću upotrebu
          localStorage.setItem('airports', JSON.stringify(airportOptions));
          setAirports(airportOptions);
        }
      } catch (error) {
        console.error('Error fetching airports data:', error);
      }
    };

    fetchAirports();
  }, []);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    setCurrentPage(1); // Resetujemo na prvu stranicu pri pretrazi
  };

  const lockFlight = (flightId) => {
    setLockedFlights([...lockedFlights, flightId]);
  };

  const unlockFlight = (flightId) => {
    setLockedFlights(lockedFlights.filter(id => id !== flightId));
  };

  const handleCreate = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/flights', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newFlight)
      });
      const data = await response.json();
      if (response.ok) {
        setFlights([...flights, data.data]);
        setNewFlight({
          flight_number: '',
          departure_city: '',
          arrival_city: '',
          departure_time: '',
          arrival_time: '',
          price: '',
          total_seats: '',
          reserved_seats: ''
        });
        setShowCreateForm(false); // Sakrivanje forme nakon kreiranja
      } else {
        console.error(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/flights/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        setFlights(flights.filter(flight => flight.id !== id));
      } else {
        console.error('Error deleting flight');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = async (updatedFlight) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/flights/${updatedFlight.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedFlight)
      });
      const data = await response.json();
      if (response.ok) {
        setFlights(flights.map(flight => (flight.id === updatedFlight.id ? data.data : flight)));
      } else {
        console.error(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleNewFlightChange = (e) => {
    const { name, value } = e.target;
    setNewFlight({ ...newFlight, [name]: value });
  };

  const handleSelectChange = (selectedOption, actionMeta) => {
    setNewFlight({ ...newFlight, [actionMeta.name]: selectedOption.value });
  };

  const filteredFlights = flights.filter(flight =>
    flight.flight_number.toLowerCase().includes(search.toLowerCase()) ||
    flight.departure_city.toLowerCase().includes(search.toLowerCase()) ||
    flight.arrival_city.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLastFlight = currentPage * flightsPerPage;
  const indexOfFirstFlight = indexOfLastFlight - flightsPerPage;
  const currentFlights = filteredFlights.slice(indexOfFirstFlight, indexOfLastFlight);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="letovi-container">
      <h1 className="letovi-title">Flights</h1>
      <input
        type="text"
        placeholder="Search flights"
        value={search}
        onChange={handleSearchChange}
        className="letovi-search"
      />
      <button className="toggle-create-flight" onClick={() => setShowCreateForm(!showCreateForm)}>
        {showCreateForm ? 'Hide Create Form' : 'Show Create Form'}
      </button>
      {showCreateForm && (
        <div className="create-flight">
          <h2>Create New Flight</h2>
          <input type="text" placeholder="Flight Number" name="flight_number" value={newFlight.flight_number} onChange={handleNewFlightChange} />
          <Select
            name="departure_city"
            value={airports.find(airport => airport.value === newFlight.departure_city)}
            onChange={handleSelectChange}
            options={airports}
            placeholder="Select Departure City"
          />
          <Select
            name="arrival_city"
            value={airports.find(airport => airport.value === newFlight.arrival_city)}
            onChange={handleSelectChange}
            options={airports}
            placeholder="Select Arrival City"
          />
          <input type="datetime-local" placeholder="Departure Time" name="departure_time" value={newFlight.departure_time} onChange={handleNewFlightChange} />
          <input type="datetime-local" placeholder="Arrival Time" name="arrival_time" value={newFlight.arrival_time} onChange={handleNewFlightChange} />
          <input type="number" placeholder="Price" name="price" value={newFlight.price} onChange={handleNewFlightChange} />
          <input type="number" placeholder="Total Seats" name="total_seats" value={newFlight.total_seats} onChange={handleNewFlightChange} />
          <input type="number" placeholder="Reserved Seats" name="reserved_seats" value={newFlight.reserved_seats} onChange={handleNewFlightChange} />
          <button onClick={handleCreate}>Create Flight</button>
        </div>
      )}
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
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {currentFlights.map(flight => (
            <Flight
              key={flight.id}
              flight={flight}
              lockFlight={lockFlight}
              unlockFlight={unlockFlight}
              isLocked={lockedFlights.includes(flight.id)}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))}
        </tbody>
      </table>
      <div className="pagination">
        {[...Array(Math.ceil(filteredFlights.length / flightsPerPage)).keys()].map(number => (
          <button key={number} onClick={() => paginate(number + 1)} className={`page-item ${currentPage === number + 1 ? 'active' : ''}`}>
            {number + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Letovi;
