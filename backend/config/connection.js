const mongoose = require('mongoose')

const DB_URI = 'mongodb+srv://itshasnain06:123456789000@cluster0.zhtdt5t.mongodb.net/test'
mongoose.connect(DB_URI,{useNewUrlParser:true, useUnifiedTopology:true})
.then(() => console.log('Connected to a database...'))

    .catch(() => console.error('Could not connect to MongoDB..'));

const connection = mongoose.connection

module.exports = connection