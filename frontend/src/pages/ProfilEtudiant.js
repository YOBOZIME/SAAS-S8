import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './EntrepriseProfile.css'; // ✅ on réutilise le même style
import defaultImg from '../assets/Img.png';

const ProfilEtudiant = () => {
  const [profil, setProfil] = useState(null);
  const [candidatures, setCandidatures] = useState([]);
  const token = localStorage.getItem('token');

  const fetchProfile = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/etudiants/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProfil(res.data);
    } catch (err) {
      console.error('Erreur lors du chargement du profil :', err);
    }
  };

  const fetchCandidatures = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/etudiants/mes-candidatures', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCandidatures(res.data);
    } catch (err) {
      console.error('Erreur chargement candidatures :', err);
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('photo', file);

    try {
      await axios.patch('http://localhost:5000/api/etudiants/photo', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      await fetchProfile();
    } catch (err) {
      console.error('Erreur upload photo :', err);
    }
  };

  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
  
    const formData = new FormData();
    formData.append("photo", file);
    const token = localStorage.getItem("token");
  
    try {
      await axios.patch("http://localhost:5000/api/etudiants/photo", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      window.location.reload(); // ou refetch le profil
    } catch (err) {
      console.error("Erreur upload photo étudiant :", err);
    }
  };
  

  useEffect(() => {
    fetchProfile();
    fetchCandidatures();
  }, []);

  if (!profil) return <p>Chargement...</p>;

  const getStatusClass = (statut) => {
    switch (statut.toLowerCase()) {
      case 'acceptée':
        return 'status accepted';
      case 'refusée':
        return 'status rejected';
      case 'en attente':
      default:
        return 'status pending';
    }
  };
  
  return (
    <div className="entreprise-profile">
      <div className="navbar">
        <div className="navbar-logo" onClick={() => window.location.href = '/etudiant'}>
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
                : defaultImg
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
          <h2>{profil.User?.prenom} {profil.User?.nom}</h2>
          <p><strong>Email :</strong> {profil.User?.email}</p>
          <p><strong>Filière :</strong> {profil.filiere}</p>
          <p><strong>Niveau :</strong> {profil.niveau}</p>
        </div>
      </div>

      <h3 className="section-title">📩 Candidatures Envoyées</h3>
      <div className="section-cards">
        {candidatures.length === 0 ? (
          <p style={{ marginLeft: '40px' }}>Aucune candidature envoyée.</p>
        ) : (
          candidatures.map((cand) => (
            <div className="card" key={cand.id}>
              <h4>{cand.Stage?.titre}</h4>
              <p><strong>Domaine:</strong> {cand.Stage?.domaine}</p>
              <p><strong>Lieu:</strong> {cand.Stage?.lieu}</p>
              <p><strong>Statut:</strong> <span className={getStatusClass(cand.statut)}>{cand.statut}</span></p>
              <p><strong>Message:</strong> {cand.message}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProfilEtudiant;
