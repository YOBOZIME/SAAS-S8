const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Stage = require('./Stage');

const Publication = sequelize.define('Publication', {
  auteur: {
    type: DataTypes.STRING,
    allowNull: false
  },
  contenu: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
});

// Association
Publication.belongsTo(Stage, { foreignKey: 'stageId', onDelete: 'CASCADE' });
Stage.hasMany(Publication, { foreignKey: 'stageId' });

module.exports = Publication;
