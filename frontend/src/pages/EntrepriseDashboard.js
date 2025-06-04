import React from 'react';
import { logout } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import './EntrepriseDashboard.css';

const EntrepriseDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Bienvenue sur votre espace entreprise</h1>
        <button className="logout-button" onClick={handleLogout}>Se déconnecter</button>
      </header>

      <section className="dashboard-section">
        <h2>Actions disponibles</h2>
        <div className="card-grid">
          <div className="card">
            <h3>Publier une offre de stage</h3>
            <p>Créez une nouvelle offre de stage pour attirer les étudiants.</p>
            <button>Nouvelle offre</button>
          </div>

          <div className="card">
            <h3>Consulter les candidatures</h3>
            <p>Parcourez les candidatures reçues pour vos offres publiées.</p>
            <button>Voir les candidatures</button>
          </div>

          <div className="card">
            <h3>Gérer les offres</h3>
            <p>Modifiez ou supprimez les offres de stage existantes.</p>
            <button>Mes offres</button>
          </div>

          <div className="card">
            <h3>Profil de l'entreprise</h3>
            <p>Consultez ou mettez à jour les informations de votre société.</p>
            <button>Mon profil</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EntrepriseDashboard;
