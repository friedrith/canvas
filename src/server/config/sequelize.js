const Sequelize = require('sequelize');
const fs = require('fs-extra');
const path = require('path');

const config = require('./../../../package.json').config;

var dataDirPath = path.join(__dirname, '../../../', config.data);

fs.ensureDirSync(dataDirPath);

var options = {
  host: 'localhost',
  dialect: process.env.DB_TYPE,

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
};

if (process.env.DB_TYPE == 'sqlite') {
    options.storage = path.join(dataDirPath, 'data.sqlite');
}

var sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, options);

module.exports = sequelize;
