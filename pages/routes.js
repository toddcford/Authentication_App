import React, { useState, useEffect } from 'react';
import axios from 'axios';


const Home = () => {
  const [name, setName] = useState('World');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.request('http://localhost:4000/api/hello');
      
      if (response.status === 200 && response) {
        setLoading(false);
        setName(response.data);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return 'Loading...';
  }

  return (
    <h1 className='title'> Hello {name} </h1>
  )
}

export default Home