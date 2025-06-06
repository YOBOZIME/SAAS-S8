const sequelize = require('../config/database');

const User = require('./User');
const Etudiant = require('./Etudiant');
const Entreprise = require('./Entreprise');
const Stage = require('./Stage');
const Candidature = require('./Candidature');
const Tuteur = require('./Tuteur');
const Publication = require('./Publication');

// Ici les associations sont déjà définies dans chaque fichier

const sync_databases = async (options = {}) => {
  try {
    await sequelize.sync(options); // ici, 'alter' sera utilisé
    console.log('✅ Base de données synchronisée');
  } catch (err) {
    console.error('❌ Erreur de synchronisation :', err);
  }
};


module.exports = { sequelize, sync_databases, User, Etudiant, Entreprise, Stage, Candidature, Tuteur, Publication };
