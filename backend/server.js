const express = require('express');
const sequilize = require('sequelize');
const dotenv = require('dotenv').config();
const cookieParser = require('cookie-parser');
const db = require('./Models');
const userRoutes = require('./Routes/userRoutes');

const app = express();

// port
const PORT = process.env.PORT || 5000;

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

//synchronizing the db
db.sequelize.sync().then(() => {
  console.log('db has been synced');
});

//routes
app.use('/api/users', userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
