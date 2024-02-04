const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(
  `postgres://postgres:joelgres420@localhost:5432/users`,
  { dialect: 'postgres' }
);

// checking for connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Connected to users database');
  })
  .catch((err) => {
    console.log('Connection failed: ' + err);
  });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// connecting models to the database
db.users = require('./userModel')(sequelize, DataTypes);

module.exports = db;
