import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './EntrepriseProfile.css';

const EntrepriseProfile = () => {
  const [profil, setProfil] = useState(null);
  const [stages, setStages] = useState([]);
  const token = localStorage.getItem('token');

  const fetchProfile = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/entreprises/profil', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProfil(res.data);
    } catch (err) {
      console.error('Erreur chargement profil :', err);
    }
  };

  useEffect(() => {
    fetchProfile();
    fetchStages();
  }, []);

  const fetchStages = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/stages/mine', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStages(res.data);
    } catch (err) {
      console.error('Erreur chargement stages :', err);
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('photo', file);

    try {
      await axios.patch('http://localhost:5000/api/entreprises/photo', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      await fetchProfile(); // 🔁 recharger le profil après upload
    } catch (err) {
      console.error('Erreur upload photo :', err);
    }
  };

  if (!profil) return <p>Chargement...</p>;

  return (
    <div className="entreprise-profile">
      <div className="navbar">
        <div className="navbar-logo" onClick={() => window.location.href = '/entreprise'}>
          Intern'<span style={{ color: '#2f486d' }}>Net</span>
        </div>
        <div className="navbar-actions">
          <button onClick={() => {
            localStorage.clear();
            window.location.href = '/login';
          }}>Déconnexion</button>
        </div>
      </div>

      <div className="profile-container">
        <div className="profile-left">
          <img
            className="profile-pic"
            src={
              profil.photo
                ? `http://localhost:5000/uploads/${profil.photo}?${Date.now()}`
                : '/default-avatar.png'
            }
            alt="Profil"
          />
          <div className="file-upload">
            <label className="upload-button">
              Choisir une image
              <input type="file" onChange={handleFileChange} hidden />
            </label>
          </div>
        </div>

        <div className="profile-info">
          <h2>{profil.nomSociete}</h2>
          <p><strong>Secteur :</strong> {profil.secteur}</p>
          <p><strong>Adresse :</strong> {profil.adresse}</p>
          <p><strong>Email RH :</strong> {profil.hr_email}</p>
        </div>
      </div>

      <h3 className="section-title">📌 Offres de Stage</h3>
      
      <div className="section-cards">
        {stages.length === 0 ? (
          <p style={{ marginLeft: '40px' }}>Aucune offre pour le moment.</p>
        ) : (
          stages.map(stage => (
            <div className="card" key={stage.id}>
              <h4>{stage.titre}</h4>
              <p><strong>Domaine:</strong> {stage.domaine}</p>
              <p><strong>Lieu:</strong> {stage.lieu}</p>
              <p><strong>Période:</strong> {stage.dateDebut?.slice(0, 10)} - {stage.dateFin?.slice(0, 10)}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default EntrepriseProfile;
