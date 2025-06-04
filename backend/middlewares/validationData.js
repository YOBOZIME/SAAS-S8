const validateStageData = (req, res, next) => {
  const { titre, domaine, lieu, dateDebut, dateFin, description } = req.body;

  if (!titre || !domaine || !lieu || !dateDebut || !dateFin || !description) {
    return res.status(400).json({ message: 'Tous les champs du stage sont requis.' });
  }

  if (new Date(dateDebut) > new Date(dateFin)) {
    return res.status(400).json({ message: 'La date de début doit être avant la date de fin.' });
  }

  next();
};


const validateUserRegistration = (req, res, next) => {
  console.log("🔍 Corps reçu dans validateUserRegistration :", req.body);

  const {
    nom,
    prenom,
    email,
    motdepasse,
    role,
    niveau,
    filiere,
    nomSociete,
    secteur,
    adresse,
    hr_email
  } = req.body;

  if (!nom || !prenom || !email || !motdepasse || !role) {
    return res.status(400).json({ message: 'Tous les champs utilisateur sont requis.' });
  }

  const validRoles = ['etudiant', 'entreprise', 'admin'];
  if (!validRoles.includes(role)) {
    return res.status(400).json({ message: 'Rôle invalide.' });
  }

  if (role === 'etudiant') {
    if (!niveau || !filiere) {
      return res.status(400).json({ message: 'Les champs niveau et filière sont requis pour un étudiant.' });
    }
  }

  if (role === 'entreprise') {
    if (!nomSociete || !secteur || !adresse || !hr_email) {
      return res.status(400).json({ message: 'Tous les champs entreprise sont requis.' });
    }
  }

  next();
};

const validateEtudiantData = (req, res, next) => {
  const { niveau, filiere, cv, lettreMotivation } = req.body;

  if (!niveau || !filiere || !cv || !lettreMotivation) {
    return res.status(400).json({ message: 'Tous les champs de l’étudiant sont requis.' });
  }

  next();
};

const validateEntrepriseData = (req, res, next) => {
  const { nomSociete, secteur, adresse, hr_email } = req.body;

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
