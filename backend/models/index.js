const sequelize = require('../config/database');

const User = require('./User');
const Etudiant = require('./Etudiant');
const Entreprise = require('./Entreprise');
const Stage = require('./Stage');
const Candidature = require('./Candidature');
const Tuteur = require('./Tuteur');
const Publication = require('./Publication');

// 🔁 Associations (à forcer ici)
Stage.belongsTo(Entreprise, { foreignKey: 'entrepriseId' });
Entreprise.hasMany(Stage, { foreignKey: 'entrepriseId' });

Candidature.belongsTo(Etudiant, { foreignKey: 'etudiantId' });
Candidature.belongsTo(Stage, { foreignKey: 'stageId' });
Etudiant.hasMany(Candidature, { foreignKey: 'etudiantId' });
Stage.hasMany(Candidature, { foreignKey: 'stageId' });

Publication.belongsTo(Stage, { foreignKey: 'stageId' });
Stage.hasMany(Publication, { foreignKey: 'stageId' });

const sync_databases = async (options = {}) => {
  try {
    await sequelize.sync(options);
    console.log('✅ Base de données synchronisée');
  } catch (err) {
    console.error('❌ Erreur de synchronisation :', err);
  }
};

module.exports = {
  sequelize,
  sync_databases,
  User,
  Etudiant,
  Entreprise,
  Stage,
  Candidature,
  Tuteur,
  Publication
};
