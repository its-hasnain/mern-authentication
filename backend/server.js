const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const auth = require('./routes/auth');
const cars = require('./routes/cars');
const category = require('./routes/category');
const db = require('./config/connection');
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/api', auth);
app.use('/api', cars);
app.use('/api', category);

app.listen(5000, () => {
  console.log('Server started on port 5000');
});