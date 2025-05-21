const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Entreprise = require('./Entreprise');

const Stage = sequelize.define('Stage', {
  titre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  },
  domaine: {
    type: DataTypes.STRING
  },
  lieu: {
    type: DataTypes.STRING
  },
  dateDebut: {
    type: DataTypes.DATE
  },
  dateFin: {
    type: DataTypes.DATE
  },
  estDisponible: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
});

// Association : un stage appartient à une entreprise
Stage.belongsTo(Entreprise, { foreignKey: 'entrepriseId', onDelete: 'CASCADE' });
Entreprise.hasMany(Stage, { foreignKey: 'entrepriseId' });

module.exports = Stage;
