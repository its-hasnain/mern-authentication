import { useState, useEffect } from 'react';
import axios from 'axios';

function Categories() {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');



  useEffect(() => {
    function fetchCategories() {
      axios.get('http://localhost:5000/api/categories')
        .then(res => {
          setCategories(res.data);
          console.log("im here",categories);
        })
        .catch(err => {
          console.log(err.response.data.message);
        });
    }
  
    fetchCategories();
  }, []);
  

  
  async function handleAddCategory(e) {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/categories', { name: newCategory });
      setCategories([...categories, res.data.category]);
      setNewCategory('');
    } catch (err) {
      console.log(err.response.data.message);
    }
  }

  async function handleDeleteCategory(id) {
    try {
      await axios.delete(`http://localhost:5000/api/categories/${id}`);
      setCategories(categories.filter(category => category._id !== id));
    } catch (err) {
      console.log(err.response.data.message);
    }
  }

  return (
    <div style={{ margin: '20px auto', width: '400px' }}>
      <h1 style={{ textAlign: 'center' }}>Categories</h1>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {categories.map(category => (
          <li key={category._id} style={{ display: 'flex', justifyContent:'space-between', alignItems: 'center' }}>
            {category.name}
            <button style={{ backgroundColor: 'red', color: 'white', border: 'none', padding: '5px 10px' }} onClick={() => handleDeleteCategory(category._id)}>Delete</button>
          </li>
        ))}
      </ul>
      <form style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }} onSubmit={handleAddCategory}>
        <input type="text" value={newCategory} onChange={e => setNewCategory(e.target.value)} style={{ marginRight: '10px', flex: 1 }} />
        <button type="submit" style={{ backgroundColor: 'green', color: 'white', border: 'none', padding: '5px 10px' }}>Add Category</button>
      </form>
    </div>
  );
}

export default Categories;
