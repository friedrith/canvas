const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize');

var User = sequelize.define('user', {
    email: {type: Sequelize.STRING, unique: true, validate: { isEmail: true } },
    salt: { type: Sequelize.STRING },
    password: {type: Sequelize.STRING }
}, {
    freezeTableName: true // Model tableName will be the same as the model name
});

// User.sync({force: true});

module.exports = User;
