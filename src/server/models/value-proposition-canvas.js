const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize');

var ValuePropositionCanvas = sequelize.define('valuepropositioncanvas', {
    link: {type: Sequelize.STRING, defaultValue: '', unique: true },
    name: {type: Sequelize.STRING, defaultValue: 'Untitled' },
    job: {type: Sequelize.STRING, defaultValue: '' },
    gaincreator: {type: Sequelize.STRING, defaultValue: '' },
    painrelievers: {type: Sequelize.STRING, defaultValue: '' },
    product: {type: Sequelize.STRING, defaultValue: '' },
    gains: {type: Sequelize.STRING, defaultValue: '' },
    pains: {type: Sequelize.STRING, defaultValue: '' },
    target: {type: Sequelize.STRING, defaultValue: 'all' },
    zoom: {type: Sequelize.INTEGER, defaultValue: 70 }
}, {
    freezeTableName: true // Model tableName will be the same as the model name
});

// ValuePropositionCanvas.sync({force: true});

module.exports = ValuePropositionCanvas;
