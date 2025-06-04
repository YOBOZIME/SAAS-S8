import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/authService';
import './Register.css'; // Assure-toi de créer ce fichier

const Register = () => {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    motdepasse: '',
    role: 'etudiant',
    niveau: '',
    filiere: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(formData);
      alert('Inscription réussie');
      navigate('/login');
    } catch (err) {
      alert("Erreur d’inscription !");
      console.error(err.response?.data || err);
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit} className="register-form">
        <h2>Créer un compte</h2>
        <input name="nom" placeholder="Nom" onChange={handleChange} required />
        <input name="prenom" placeholder="Prénom" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="motdepasse" placeholder="Mot de passe" onChange={handleChange} required />

        <select name="role" onChange={handleChange}>
          <option value="etudiant">Étudiant</option>
          <option value="entreprise">Entreprise</option>
        </select>

        {formData.role === 'etudiant' && (
          <>
            <input name="niveau" placeholder="Niveau" onChange={handleChange} required />
            <input name="filiere" placeholder="Filière" onChange={handleChange} required />
          </>
        )}

        <button type="submit">S'inscrire</button>
      </form>
    </div>
  );
};

export default Register;
