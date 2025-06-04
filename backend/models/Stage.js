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
    type: DataTypes.STRING,
    allowNull: false
  },
  lieu: {
    type: DataTypes.STRING,
    allowNull: false
  },
  dateDebut: {
    type: DataTypes.DATE,
    allowNull: false
  },
  dateFin: {
    type: DataTypes.DATE,
    allowNull: false
  },
  estDisponible: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  commentaire: {
    type: DataTypes.TEXT
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'en attente',
    validate: {
      isIn: [['en attente', 'validé', 'refusé']]
    }
  }
});

// Association : un stage appartient à une entreprise
Stage.belongsTo(Entreprise, { foreignKey: 'entrepriseId', onDelete: 'CASCADE' });
Entreprise.hasMany(Stage, { foreignKey: 'entrepriseId' });

module.exports = Stage;
