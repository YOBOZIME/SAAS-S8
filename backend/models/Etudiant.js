const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const Etudiant = sequelize.define('Etudiant', {
  niveau: {
    type: DataTypes.STRING,
    allowNull: false
  },
  filiere: {
    type: DataTypes.STRING,
    allowNull: false
  },
  cv: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lettreMotivation: {
    type: DataTypes.STRING
  }
});

// Association : un étudiant est un utilisateur
Etudiant.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });
User.hasOne(Etudiant, { foreignKey: 'userId' });

module.exports = Etudiant;
