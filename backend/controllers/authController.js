const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User , Etudiant, Entreprise } = require('../models');
require('dotenv').config();

exports.register = async (req, res) => {
  try {
    const { nom, prenom, email, motdepasse, role, niveau, filiere } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) return res.status(400).json({ message: 'Email déjà utilisé' });

    const hashedPassword = await bcrypt.hash(motdepasse, 10);

    const newUser = await User.create({ nom, prenom, email, motdepasse: hashedPassword, role });

    if (role === 'etudiant') {
      await Etudiant.create({ userId: newUser.id, niveau, filiere, cv: '', lettreMotivation: '' });
    } else if (role === 'entreprise') {
      const { nomSociete, secteur, adresse, hr_email } = req.body;
      await Entreprise.create({ userId: newUser.id, nomSociete, secteur, adresse, hr_email });
    }

    res.status(201).json({ message: 'Utilisateur créé avec succès', user: newUser });
  } catch (err) {
    console.error("Erreur dans register:", err); // Garde ce log
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};


exports.login = async (req, res) => {
  console.log("📩 Données reçues :", req.body);

  console.log("🔁 login route hit");
  try {
    const { email, motdepasse } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: 'Utilisateur introuvable' });

    const isMatch = await bcrypt.compare(motdepasse, user.motdepasse);
    if (!isMatch) return res.status(401).json({ message: 'Mot de passe incorrect' });

    const token = jwt.sign(
      { id: user.id, role: user.role }, // ← ⚠️ ici, il faut absolument inclure le `role`
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({ message: 'Connexion réussie', token, user });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};
