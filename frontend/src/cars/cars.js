import { useState, useEffect } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';

function Cars() {
  const [newCar, setNewCar] = useState({
    category: '',
    color: '',
    make: '',
    model: '',
    registrationNo: '',
  });
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');
  const [cars, setCars] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(3);
  // Change page
  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  // Calculate the index of the last car to be displayed on the current page
  const lastIndex = currentPage * perPage;

  // Calculate the index of the first car to be displayed on the current page
  const firstIndex = lastIndex - perPage;

  // Get the cars to be displayed on the current page
  const displayedCars = cars.slice(firstIndex, lastIndex);

  useEffect(() => {
    // Fetch categories from the server and update the state
    const fetchCategories = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/categories');
        setCategories(res.data); // Update the categories state with the fetched data
      } catch (err) {
        setError('Error fetching categories');
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    // Fetch cars from the server and update the state
    const fetchCars = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/cars');
        setCars(res.data); // Update the cars state with the fetched data
      } catch (err) {
        setError('Error fetching cars');
      }
    };

    fetchCars();
  }, []);

  async function handleAddCar(e) {
    e.preventDefault();

    if (
      !newCar.category ||
      !newCar.color ||
      !newCar.make ||
      !newCar.model ||
      !newCar.registrationNo
    ) {
      setError('All fields are required');
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/cars', newCar);
      console.log(res.data); // Handle the response as needed
      setError('');
      setNewCar({
        category: '',
        color: '',
        make: '',
        model: '',
        registrationNo: '',
      });
      setCars(prevCars => [...prevCars, res.data.car]); // Add the newly created car to the cars state

    } catch (err) {
      setError(err.response.data.message);
    }
  }

  async function handleUpdateCar(carId, updatedCar) {
    try {
      const res = await axios.put(`http://localhost:5000/api/cars/${carId}`, updatedCar);
      console.log(res.data); // Handle the response as needed
      setError('');
      setCars(prevCars => {
        const updatedCars = prevCars.map(car => {
          if (car._id === carId) {
            return { ...res.data.car, category: res.data.car.category.name }; // Replace the updated car in the cars state and map the category to category name
          }
          return car;
        });
        return updatedCars;
      });
    } catch (err) {
      setError(err.response.data.message);
    }
  }

  async function handleDeleteCar(carId) {
    try {
      const res = await axios.delete(`http://localhost:5000/api/cars/${carId}`);
      console.log(res.data); // Handle the response as needed
      setError('');
      setCars(prevCars => prevCars.filter(car => car._id !== carId)); // Remove the deleted car from the cars state
    } catch (err) {
      setError(err.response.data.message);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setNewCar((prevCar) => ({
      ...prevCar,
      [name
      ]: value,
    }));
  }

  const [editCarId, setEditCarId] = useState(null);

  function handleEditCar(carId) {
    setEditCarId(carId);
  }

  function handleCancelEdit() {
    setEditCarId(null);
  }

  function isEditMode(carId) {
    return editCarId === carId;
  }

  function renderCarFields(car) {
    if (isEditMode(car._id)) {
      return (
        <>
          <input type="text" name="color" value={car.color} onChange={(e) => handleCarChange(car._id, e)} />
          <input type="text" name="make" value={car.make} onChange={(e) => handleCarChange(car._id, e)} />
          <input type="text" name="model" value={car.model} onChange={(e) => handleCarChange(car._id, e)} />
          <input
            type="text"
            name="registrationNo"
            value={car.registrationNo}
            onChange={(e) => handleCarChange(car._id, e)}
          />
          <button onClick={() => handleUpdateCar(car._id, car)}>Save</button>
          <button onClick={handleCancelEdit}>Cancel</button>
        </>
      );
    }

    return (
      <>
        <p>Color: {car.color}</p>
        <p>Make: {car.make}</p>
        <p>Model: {car.model}</p>
        <p>Registration No: {car.registrationNo}</p>
        <button onClick={() => handleEditCar(car._id)}>Update</button>
        <button onClick={() => handleDeleteCar(car._id)}>Delete</button>
      </>
    );
  }

  function handleCarChange(carId, e) {
    const { name, value } = e.target;
    setCars(prevCars =>
      prevCars.map(car => {
        if (car._id === carId) {
          return { ...car, [name]: value };
        }
        return car;
      })
    );
  }

  return (
    <div className="cars-container">
      <h1 className="cars-heading">Cars</h1>
      <form className="car-form" onSubmit={handleAddCar}>
        <div className="form-group">
          <label htmlFor="category">Category:</label>
          <select name="category" id="category" value={newCar.category} onChange={handleChange}>
            <option value="">--Select a category--</option>
            {categories.map(category => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="color">Color:</label>
          <input type="text" name="color" id="color" value={newCar.color} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="make">Make:</label>
          <input type="text" name="make" id="make" value={newCar.make} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="model">Model:</label>
          <input type="text" name="model" id="model" value={newCar.model} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="registrationNo">Registration No:</label>
          <input
            type="text"
            name="registrationNo"
            id="registrationNo"
            value={newCar.registrationNo}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Add Car</button>
      </form>
      {error && <p className="error-message">{error}</p>}

      <div className="cars-list">
        <h2>Cars List</h2>
        <ul>
          {displayedCars.map((car) => (
            <li key={car._id}>
              <p>Category: {car.category.name}</p>
              {renderCarFields(car)}
            </li>
          ))}
        </ul>
      </div>
      <div>
      
      {/* Pagination */}
      <ReactPaginate
        previousLabel="Previous"
        nextLabel="Next"
        breakLabel="..."
        breakClassName="break"
        pageCount={Math.ceil(cars.length / perPage)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName="pagination"
        activeClassName="active"
      />
    </div>
    </div>
  );
}

export default Cars;
