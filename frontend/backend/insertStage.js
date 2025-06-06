const sequelize = require('./config/database');
const Stage = require('./models/Stage');

(async () => {
  try {
    await sequelize.authenticate();

    const nouveauStage = await Stage.create({
      titre: 'Stage Big Data',
      description: 'Analyse de données massives',
      domaine: 'Informatique',
      lieu: 'Fès',
      dateDebut: new Date('2025-06-01'),
      dateFin: new Date('2025-09-01'),
      entrepriseId: 1  // ⚠️ Adapté à une entreprise existante dans ta DB
    });

    console.log("✅ Stage créé :", nouveauStage.id);
  } catch (err) {
    console.error("❌ Erreur :", err);
  } finally {
    await sequelize.close();
  }
})();
