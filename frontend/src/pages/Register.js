import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../services/authService';
import './Register.css';
import illustration from '../assets/login.png'; // ✅ adapte le chemin si besoin

const Register = () => {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    user_email: '',
    user_password: '',
    role: 'etudiant',
    niveau: '',
    filiere: '',
    nomSociete: '',
    secteur: '',
    adresse: '',
    hr_email: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      nom: formData.nom,
      prenom: formData.prenom,
      email: formData.user_email,
      motdepasse: formData.user_password,
      role: formData.role,
      niveau: formData.niveau,
      filiere: formData.filiere,
      nomSociete: formData.nomSociete,
      secteur: formData.secteur,
      adresse: formData.adresse,
      hr_email: formData.hr_email,
    };

    try {
      await register(userData);
      alert('Inscription réussie');
      navigate('/login');
    } catch (err) {
      alert("Erreur d’inscription !");
      console.error(err.response?.data || err);
    }
  };

  return (
    <div className="register-page">
      <div className="register-card">
        <div className="register-left">
          <img src={illustration} alt="Inscription illustration" className="register-image" />
        </div>
        <div className="register-right">
          <h2>Créer un compte</h2>
          <form onSubmit={handleSubmit} className="register-form" autoComplete="off">
            <input name="nom" placeholder="Nom" onChange={handleChange} value={formData.nom} required />
            <input name="prenom" placeholder="Prénom" onChange={handleChange} value={formData.prenom} required />
            <input type="email" name="user_email" placeholder="Email" autoComplete="off" onChange={handleChange} value={formData.user_email} required />
            <input type="password" name="user_password" placeholder="Mot de passe" autoComplete="new-password" onChange={handleChange} value={formData.user_password} required />

            <select name="role" onChange={handleChange} value={formData.role}>
              <option value="etudiant">Étudiant</option>
              <option value="entreprise">Entreprise</option>
            </select>

            {formData.role === 'etudiant' && (
              <>
                <input name="niveau" placeholder="Niveau" onChange={handleChange} value={formData.niveau} required />
                <input name="filiere" placeholder="Filière" onChange={handleChange} value={formData.filiere} required />
              </>
            )}

            {formData.role === 'entreprise' && (
              <>
                <input name="nomSociete" placeholder="Nom de la société" onChange={handleChange} value={formData.nomSociete} required />
                <input name="secteur" placeholder="Secteur" onChange={handleChange} value={formData.secteur} required />
                <input name="adresse" placeholder="Adresse" onChange={handleChange} value={formData.adresse} required />
                <input name="hr_email" placeholder="Email RH" onChange={handleChange} value={formData.hr_email} required />
              </>
            )}

            <button type="submit">S'inscrire</button>
          </form>
          <p className="login-prompt">Déjà inscrit ? <Link to="/login">Se connecter</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Register;
