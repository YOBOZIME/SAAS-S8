const sequelize = require('./config/database');
const Etudiant = require('./models/Etudiant');

(async () => {
  try {
    await sequelize.authenticate();
    await Etudiant.create({
      userId: 3,
      niveau: 'M1',
      filiere: 'IA'
    });
    console.log("✅ Étudiant inséré");
  } catch (err) {
    console.error("❌ Erreur :", err);
  } finally {
    await sequelize.close();
  }
})();
