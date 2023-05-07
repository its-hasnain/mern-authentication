import React, { useState } from "react";
import axios from "axios";
import Cars from "../cars/cars";
import Categories from "../category/category";
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();
    const [numCars, setNumCars] = useState(0);
    const [carData, setCarData] = useState({
        make: '',
        model: '',
        year: '',
        // other fields
      });
    
  
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/cars");
        setNumCars(res.data.length); // set the number of cars in state
          
        
      } catch (err) {
        console.log(err.response.data.message); // error message from server
      }
    };
  
    fetchData()
    const handleLogout = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/logout');
        console.log(res.data.message); // Handle the response message as needed
        // Perform any necessary client-side logout operations
        alert('Logout successful!!');
        navigate('/');
      } catch (error) {
        console.error('Error logging out:', error);
      }
    };
    return (
      <div>
     <button onClick={handleLogout}>
      Logout
    </button>
        <h2>Dashboard</h2>
        <p>Number of registered cars: {numCars}</p>
       <Cars/>
       <Categories/>
      </div>
    );
  }
  export default Dashboard;