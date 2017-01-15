const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize');

var Canvas = sequelize.define('canvas', {
    link: {type: Sequelize.STRING, defaultValue: '', unique: true },
    public: {type: Sequelize.STRING, defaultValue: '', unique: true },
    type: {type: Sequelize.STRING, defaultValue: 'value-proposition'},
    name: {type: Sequelize.STRING, defaultValue: 'Untitled' },
    content: {type: Sequelize.TEXT},
    target: {type: Sequelize.STRING, defaultValue: 'all' },
    zoom: {type: Sequelize.INTEGER, defaultValue: 70 }
}, {
    freezeTableName: true // Model tableName will be the same as the model name
});

Canvas.sync({force: false});

module.exports = Canvas;
