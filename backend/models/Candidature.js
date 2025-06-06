const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Etudiant = require('./Etudiant');
const Stage = require('./Stage');
const Entreprise = require('./Entreprise');

const Candidature = sequelize.define('Candidature', {
  message: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  statut: {
    type: DataTypes.ENUM('en_attente', 'acceptée', 'refusée'),
    defaultValue: 'en_attente'
  },
  messageEntreprise: {
    type: DataTypes.TEXT
  },
  dateCandidature: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  cv: {
    type: DataTypes.STRING,
    allowNull: true
  }
});


Candidature.belongsTo(Etudiant, { as: 'etudiant', foreignKey: 'etudiantId' });
Candidature.belongsTo(Stage, { foreignKey: 'stageId' });

// Relations
Candidature.belongsTo(Etudiant, { foreignKey: 'etudiantId', onDelete: 'CASCADE' });
Etudiant.hasMany(Candidature, { foreignKey: 'etudiantId' });

Candidature.belongsTo(Stage, { foreignKey: 'stageId', onDelete: 'CASCADE' });
Stage.hasMany(Candidature, { foreignKey: 'stageId' });

Candidature.belongsTo(Entreprise, { foreignKey: 'entrepriseId', onDelete: 'CASCADE' });
// Stage.hasMany(Candidature, { foreignKey: 'entrepriseId' });

module.exports = Candidature;
