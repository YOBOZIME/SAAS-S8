const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const Entreprise = sequelize.define('Entreprise', {
  nomSociete: {
    type: DataTypes.STRING,
    allowNull: false
  },
  secteur: {
    type: DataTypes.STRING,
    allowNull: false
  },
  adresse: {
    type: DataTypes.STRING,
    allowNull: false
  },
  siteWeb: {
    type: DataTypes.STRING
  },
  telephone: {
    type: DataTypes.STRING
  },
  hr_email:{
    type: DataTypes.STRING,
    allowNull: false
  },
  description:{
    type: DataTypes.TEXT
  }
});

// Association : une entreprise est un utilisateur
Entreprise.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });
User.hasOne(Entreprise, { foreignKey: 'userId' });

module.exports = Entreprise;
