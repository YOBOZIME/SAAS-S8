const sequelize = require('../config/database');

const User = require('./User');
const Etudiant = require('./Etudiant');
const Entreprise = require('./Entreprise');
const Stage = require('./Stage');
const Candidature = require('./Candidature');
const Tuteur = require('./Tuteur');

// Ici les associations sont déjà définies dans chaque fichier

const sync_databases = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('Base de données synchronisée');
  } catch (error) {
    console.error('Erreur de synchronisation', error);
  }
};

module.exports = { sequelize, sync_databases,User,Etudiant,Entreprise,Stage,Candidature,Tuteur};
