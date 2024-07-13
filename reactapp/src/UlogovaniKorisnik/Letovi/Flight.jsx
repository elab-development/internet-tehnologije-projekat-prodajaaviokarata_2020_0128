import React, { useState } from 'react';

const Flight = ({ flight, lockFlight, unlockFlight, isLocked, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedFlight, setEditedFlight] = useState({ ...flight });

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedFlight({ ...editedFlight, [name]: value });
  };

  const handleSave = () => {
    onEdit(editedFlight);
    setIsEditing(false);
  };

  return (
    <tr className={isLocked ? 'locked' : ''}>
      {isEditing ? (
        <>
          <td><input type="text" name="flight_number" value={editedFlight.flight_number} onChange={handleEditChange} /></td>
          <td><input type="text" name="departure_city" value={editedFlight.departure_city} onChange={handleEditChange} /></td>
          <td><input type="text" name="arrival_city" value={editedFlight.arrival_city} onChange={handleEditChange} /></td>
          <td><input type="datetime-local" name="departure_time" value={editedFlight.departure_time} onChange={handleEditChange} /></td>
          <td><input type="datetime-local" name="arrival_time" value={editedFlight.arrival_time} onChange={handleEditChange} /></td>
          <td><input type="number" name="price" value={editedFlight.price} onChange={handleEditChange} /></td>
          <td><input type="number" name="total_seats" value={editedFlight.total_seats} onChange={handleEditChange} /></td>
          <td><input type="number" name="reserved_seats" value={editedFlight.reserved_seats} onChange={handleEditChange} /></td>
          
          <td><button onClick={handleSave}>Save</button></td>
          <td><button onClick={() => setIsEditing(false)}>Cancel</button></td>
          <td><input type="hidden" name="version" value={editedFlight.version} onChange={handleEditChange} /></td>
        </>
      ) : (
        <>
          <td>{flight.flight_number}</td>
          <td>{flight.departure_city}</td>
          <td>{flight.arrival_city}</td>
          <td>{flight.departure_time}</td>
          <td>{flight.arrival_time}</td>
          <td>{flight.price}</td>
          <td>{flight.total_seats}</td>
          <td>{flight.reserved_seats}</td>
          <td><button onClick={() => setIsEditing(true)}>Edit</button></td>
          <td><button onClick={() => onDelete(flight.id)}>Delete</button></td>
        </>
      )}
    </tr>
  );
};

export default Flight;
