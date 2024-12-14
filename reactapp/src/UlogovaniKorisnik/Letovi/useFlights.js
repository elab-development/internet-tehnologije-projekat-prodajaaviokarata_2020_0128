import { useState, useEffect } from 'react';

const useFlights = () => {
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const token = sessionStorage.getItem('token'); 
        const response = await fetch('http://127.0.0.1:8000/api/flights', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setFlights(data.data);
      } catch (error) {
        console.error('Failed to fetch flights:', error);
      }
    };

    fetchFlights();
  }, []);

  return [flights, setFlights];
};

export default useFlights;
