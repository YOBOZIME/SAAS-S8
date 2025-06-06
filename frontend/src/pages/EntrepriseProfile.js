import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import './EntrepriseProfile.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const EntrepriseProfile = () => {
  const [profil, setProfil] = useState(null);
  const [stages, setStages] = useState([]);
  const [candidatures, setCandidatures] = useState([]);
  const [photoPreview, setPhotoPreview] = useState(null);

  const token = localStorage.getItem('token');

  useEffect(() => {
    const saved = localStorage.getItem("entreprisePhoto");
    if (saved) setPhotoPreview(saved);

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

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      localStorage.setItem("entreprisePhoto", reader.result);
      setPhotoPreview(reader.result);
    };
    reader.readAsDataURL(file);

    const formData = new FormData();
    formData.append('photo', file);

    try {
      await axios.patch('http://localhost:5000/api/entreprises/photo', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setProfil(prev => ({ ...prev, photo: file.name }));
      localStorage.removeItem("entreprisePhoto");
    } catch (err) {
      console.error("Erreur upload photo :", err);
    }
  };

  const handleCandidature = async (id, newStatus) => {
    try {
      await axios.patch(`http://localhost:5000/api/candidatures/${id}/status`, { status: newStatus }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setCandidatures(prev =>
        prev.map(c => c.id === id ? { ...c, status: newStatus } : c)
      );
    } catch (err) {
      console.error("Erreur mise à jour de la candidature :", err);
      alert("Échec de la mise à jour.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  if (!profil) return <p>Chargement du profil...</p>;

  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  return (
    <div className="entreprise-profile">
      <div className="navbar">
  <div className="navbar-logo" onClick={() => window.location.href = '/entreprise'}>
    Intern'<span style={{ color: '#2f486d' }}>Net</span>
  </div>

  <div className="navbar-actions">
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
            <label className="upload-button">
              Choisir une image
              <input type="file" onChange={handleFileChange} hidden />
            </label>
          </div>
        </div>

        <div className="profile-info">
          <h2>{profil.nomSociete}</h2>
          <p><span>Secteur :</span> {profil.secteur}</p>
          <p><span>Adresse :</span> {profil.adresse}</p>
          <p><span>Email RH :</span> {profil.hr_email}</p>
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
