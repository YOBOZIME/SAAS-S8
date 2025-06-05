const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  nom: {
    type: DataTypes.STRING,
    allowNull: false
  },
  prenom: {
    type: DataTypes.STRING, 
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  motdepasse: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM('etudiant', 'entreprise', 'admin'),
    defaultValue: 'etudiant',
    allowNull: false
  },
  dateInscription: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  actif: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
});

module.exports = User;
