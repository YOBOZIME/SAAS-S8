import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { logout } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import './EntrepriseDashboard.css';

const EntrepriseDashboard = () => {
  const [photo, setPhoto] = useState(null);
  const [posts, setPosts] = useState([]);
  const [otherStages, setOtherStages] = useState([]); // ✅ Étape 1
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    const fetchProfile = async () => {
      const saved = localStorage.getItem("entreprisePhoto");
      if (saved) {
        setPhoto(saved);
      } else {
        try {
          const res = await axios.get("http://localhost:5000/api/entreprises/profil", {
            headers: { Authorization: `Bearer ${token}` }
          });
          if (res.data.photo) {
            setPhoto(`http://localhost:5000/uploads/${res.data.photo}`);
          } else {
            setPhoto('/default-avatar.png');
          }
        } catch (err) {
          console.error("Erreur chargement photo :", err);
        }
      }
    };

    const fetchPosts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/publications", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setPosts(res.data);
      } catch (err) {
        console.error("Erreur chargement publications :", err);
      }
    };

    const fetchOtherStages = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/stages/others", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setOtherStages(res.data);
      } catch (err) {
        console.error("Erreur chargement stages autres entreprises :", err);
      }
    };

    fetchProfile();
    fetchPosts();
    fetchOtherStages(); // ✅ Étape 3
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleProfil = () => {
    navigate('/entreprise/profil');
  };

  return (
    <div className="dashboard-container">
      <nav className="navbar">
        <div className="navbar-logo" onClick={() => navigate('/entreprise')}>
          Intern'<span style={{ color: '#1C274C' }}>Net</span>
        </div>

        <div className="navbar-actions">
          <button className="nav-button" onClick={() => navigate('/mes-stages')}>
            Mes Offres
          </button>
          <button onClick={handleLogout}>Déconnexion</button>
          <img
            src={photo || '/default-avatar.png'}
            alt="Profil"
            className="navbar-avatar"
            onClick={handleProfil}
          />
        </div>
      </nav>

      <div className="main-content">
        <div className="feed">
          <h3>Fil d’actualité</h3>

          {posts.length === 0 && otherStages.length === 0 ? (
            <p>Aucune actualité disponible.</p>
          ) : (
            <>
              {posts.map((post, index) => (
                <div className="post" key={index}>
                  <strong>{post.auteur}</strong>
                  <p>{post.contenu}</p>
                  <small>{post.date}</small>
                </div>
              ))}

              {otherStages.map((stage, index) => (
                <div className="post post-stage" key={`stage-${index}`}>
                  <strong>{stage.Entreprise?.nomSociete}</strong>
                  <p><strong>{stage.titre}</strong></p>
                  <p>Domaine : {stage.domaine}</p>
                  <p>Lieu : {stage.lieu}</p>
                  <p className="description">{stage.description}</p>
                  <small>Stage publié</small>
                </div>
              ))}

            </>
          )}
        </div>

        <div className="sidebar">
          <h4>Suggestions</h4>
          <p>Ajoutez un nouveau stage pour attirer des talents !</p>
          <button className="btn-ajouter" onClick={() => navigate('/creer-stage')}>
            Publier une offre
          </button>
        </div>
      </div>
    </div>
  );
};

export default EntrepriseDashboard;
