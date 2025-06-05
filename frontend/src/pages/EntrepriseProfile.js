import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './EntrepriseProfile.css';

const EntrepriseProfile = () => {
  const [profil, setProfil] = useState(null);
  const [stages, setStages] = useState([]);
  const [candidatures, setCandidatures] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profilRes, stageRes, candRes] = await Promise.all([
          axios.get('http://localhost:5000/api/entreprises/profil', {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get('http://localhost:5000/api/stages/mine', {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get('http://localhost:5000/api/entreprises/candidatures', {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setProfil(profilRes.data);
        setStages(stageRes.data);
        setCandidatures(candRes.data);
      } catch (err) {
        console.error("Erreur lors du chargement :", err);
      }
    };

    fetchData();
  }, [token]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setPhotoPreview(URL.createObjectURL(file));
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    const formData = new FormData();
    formData.append('photo', selectedFile);

    try {
      await axios.patch('http://localhost:5000/api/entreprises/photo', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setProfil(prev => ({ ...prev, photo: selectedFile.name }));
      alert("Photo mise à jour !");
    } catch (err) {
      console.error("Erreur upload photo :", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  if (!profil) return <p>Chargement du profil...</p>;

  return (
    <div className="entreprise-profile">
      <div className="navbar">
        <h1>StageConnect</h1>
        <div className="nav-actions">
          <button onClick={handleLogout}>Déconnexion</button>
        </div>
      </div>


      <div className="profile-container">
        <div className="profile-left">
          <img
            className="profile-pic"
            src={
              photoPreview
                ? photoPreview
                : profil.photo
                  ? `http://localhost:5000/uploads/${profil.photo}`
                  : '/default-avatar.png'
            }
            alt="Profil"
          />
          <div className="file-upload">
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Mettre à jour</button>
          </div>
        </div>

        <div className="profile-info">
          <h2>{profil.nomSociete}</h2>
          <p><span>Secteur :</span> {profil.secteur}</p>
          <p><span>Adresse :</span> {profil.adresse}</p>
          <p><span>Email RH :</span> {profil.hr_email}</p>
          <p><span>Téléphone :</span> {profil.telephone || 'Non renseigné'}</p>
          <p><span>Site Web :</span> {profil.siteWeb || 'Non renseigné'}</p>
          <p><span>Description :</span> {profil.description || 'Non renseignée'}</p>
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

      <h3 className="section-title">🎓 Candidatures reçues</h3>
      <div className="section-cards">
        {candidatures.length === 0 ? (
          <p style={{ marginLeft: '40px' }}>Aucune candidature pour l’instant.</p>
        ) : (
          candidatures.map(c => (
            <div className="card" key={c.id}>
              <h4>{c.etudiant?.prenom} {c.etudiant?.nom}</h4>
              <p><strong>Filière :</strong> {c.etudiant?.filiere}</p>
              <p><strong>Niveau :</strong> {c.etudiant?.niveau}</p>
              <p><strong>Status :</strong> {c.status}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default EntrepriseProfile;
