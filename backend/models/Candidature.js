const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Etudiant = require('./Etudiant');
const Stage = require('./Stage');

const Candidature = sequelize.define('Candidature', {
  statut: {
    type: DataTypes.ENUM('en_attente', 'acceptée', 'refusée'),
    defaultValue: 'en_attente'
  },
  message: {
    type: DataTypes.TEXT
  },
  dateCandidature: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
});

// Relations
Candidature.belongsTo(Etudiant, { foreignKey: 'etudiantId', onDelete: 'CASCADE' });
Etudiant.hasMany(Candidature, { foreignKey: 'etudiantId' });

Candidature.belongsTo(Stage, { foreignKey: 'stageId', onDelete: 'CASCADE' });
Stage.hasMany(Candidature, { foreignKey: 'stageId' });

module.exports = Candidature;
