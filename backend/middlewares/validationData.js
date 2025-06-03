const validateStageData = (req, res, next) => {
  const { titre, domaine,lieu, dateDébut, dateFin } = req.body;

  if (!titre || !domaine || !lieu || !dateDébut || !dateFin) {
    return res.status(400).json({ message: 'Tous les champs du stage sont requis.' });
  }

  if (new Date(dateDébut) > new Date(dateFin)) {
    return res.status(400).json({ message: 'La date de début doit être avant la date de fin.' });
  }

  next();
};

const validateUserRegistration = (req, res, next) => {
  const { nom, prenom, email, motdepasse, role } = req.body;

  if (!nom || !prenom || !email || !motdepasse || !role) {
    return res.status(400).json({ message: 'Tous les champs utilisateur sont requis.' });
  }

  const validRoles = ['etudiant', 'entreprise', 'admin'];
  if (!validRoles.includes(role)) {
    return res.status(400).json({ message: 'Rôle invalide.' });
  }

  next();
};

// Validator pour l'espace étudiant
const validateEtudiantData = (req, res, next) => {
  const { niveau, filiere, cv, lettreMotivation } = req.body;

  if (!niveau || !filiere || !cv || !lettreMotivation) {
    return res.status(400).json({ message: 'Tous les champs de l’étudiant sont requis.' });
  }

  next();
};

const validateEntrepriseData = (req, res, next) => {
  const { nomSociete, secteur, adresse,hr_email } = req.body;

  if (!nomSociete || !secteur || !adresse || !hr_email) {
    return res.status(400).json({ message: 'Tous les champs de l’entreprise sont requis.' });
  }

  next();
};
const validateCandidatureData = (req, res, next) => {
  const { stageId, etudiantId, entrepriseId } = req.body;

  if (!stageId || !etudiantId || !entrepriseId) {
    return res.status(400).json({ message: 'Champs requis manquants pour la candidature.' });
  }

  next();
};



module.exports = {
  validateStageData,
  validateUserRegistration,
  validateEtudiantData,
  validateEntrepriseData,
  validateCandidatureData
};
