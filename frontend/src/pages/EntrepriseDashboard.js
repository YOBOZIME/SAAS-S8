import React, { useState } from 'react';
import { logout } from '../services/authService';
import { useNavigate, Link } from 'react-router-dom';
import './EntrepriseDashboard.css';

const EntrepriseDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleProfil = () => {
    navigate('/entreprise/profil');
  };

  const posts = [
    {
      auteur: "Etudiant · Oussama",
      contenu: "Je cherche un stage en développement web pour cet été.",
      date: "Il y a 2 jours"
    },
    {
      auteur: "Entreprise · TechSolutions",
      contenu: "Nous recrutons un stagiaire en data science pour 3 mois. Envoyez-nous vos CVs !",
      date: "Il y a 1 jour"
    }
  ];

  return (
    <div className="dashboard-container">
      <nav className="navbar">
        <div className="navbar-logo">StageConnect</div>
        <div className="navbar-actions">
          <button onClick={handleProfil}>Mon Profil</button>
          <Link to="/mes-stages" className="nav-button">Mes Offres</Link>
          <button onClick={handleLogout}>Déconnexion</button>
        </div>
      </nav>

      <div className="main-content">
        <div className="feed">
          <h3>Fil d’actualité</h3>
          {posts.map((post, index) => (
            <div className="post" key={index}>
              <strong>{post.auteur}</strong>
              <p>{post.contenu}</p>
              <small>{post.date}</small>
            </div>
          ))}
        </div>

        <div className="sidebar">
          <h4>Suggestions</h4>
          <p>Ajoutez un nouveau stage pour attirer des talents !</p>
          <button className="btn-ajouter" onClick={() => navigate('/creer-stage')}>Publier une offre</button>
        </div>
      </div>
    </div>
  );
};

export default EntrepriseDashboard;
