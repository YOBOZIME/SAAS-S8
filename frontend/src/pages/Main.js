import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Main.css';

const Main = () => {
  const navigate = useNavigate();

  return (
    <div className="main-wrapper">
      <div className="main-container">
        <div className="left-panel">
          <h1>Bienvenue !</h1>
          <p>Connectez-vous pour accéder à votre espace personnel.</p>
          <button className="btn-outline" onClick={() => navigate('/login')}>Se connecter</button>
        </div>

        <div className="right-panel">
          <h2>Créer un compte</h2>
          <p>Choisissez votre rôle pour commencer :</p>
          <div className="btn-group">
            <button onClick={() => navigate('/register')} className="btn-primary">Inscription</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
