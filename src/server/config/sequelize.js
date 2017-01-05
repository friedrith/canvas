const Sequelize = require('sequelize');
const fs = require('fs-extra');
const path = require('path');

const config = require('./../../../package.json').config;

var dataDirPath = path.join(__dirname, '../../../', config.data);

fs.ensureDirSync(dataDirPath);

var sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: 'localhost',
  dialect: 'sqlite',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },

  // SQLite only
  storage: path.join(dataDirPath, 'data.sqlite')
});

module.exports = sequelize;
