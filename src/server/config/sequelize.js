const Sequelize = require('sequelize');
const fs = require('fs-extra');
const path = require('path');

fs.ensureDirSync(path.join(__dirname, '../../../data'));

var sequelize = new Sequelize('data', 'username', 'password', {
  host: 'localhost',
  dialect: 'sqlite',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },

  // SQLite only
  storage: 'data/data.sqlite'
});

module.exports = sequelize;
