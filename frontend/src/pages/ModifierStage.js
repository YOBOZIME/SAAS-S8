import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ModifierStage.css';

const ModifierStage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const stage = location.state;

  const [titre, setTitre] = useState(stage.titre || '');
  const [domaine, setDomaine] = useState(stage.domaine || '');
  const [lieu, setLieu] = useState(stage.lieu || '');
  const [dateDebut, setDateDebut] = useState(stage.dateDebut?.slice(0, 10) || '');
  const [dateFin, setDateFin] = useState(stage.dateFin?.slice(0, 10) || '');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/api/stages/${stage.id}`, {
        titre, domaine, lieu, dateDebut, dateFin
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Stage mis à jour avec succès !");
      navigate('/mes-stages');
    } catch (err) {
      console.error("Erreur lors de la mise à jour :", err);
      alert("Erreur lors de la mise à jour du stage.");
    }
  };

  return (
    <div className="modifier-stage-container">
      <div className="modifier-navbar">
        <div className="navbar-logo" onClick={() => navigate('/mes-stages')}>
          Intern'<span style={{ color: '#2f486d' }}>Net</span>
        </div>
      </div>


      <h2>📝 Modifier Stage</h2>

      <form onSubmit={handleSubmit} className="stage-form">
        <label>Titre :</label>
        <input type="text" value={titre} onChange={(e) => setTitre(e.target.value)} required />

        <label>Domaine :</label>
        <input type="text" value={domaine} onChange={(e) => setDomaine(e.target.value)} required />

        <label>Lieu :</label>
        <input type="text" value={lieu} onChange={(e) => setLieu(e.target.value)} required />

        <label>Date début :</label>
        <input type="date" value={dateDebut} onChange={(e) => setDateDebut(e.target.value)} required />

        <label>Date fin :</label>
        <input type="date" value={dateFin} onChange={(e) => setDateFin(e.target.value)} required />

        <button type="submit">💾 Enregistrer</button>
      </form>
    </div>
  );
};

export default ModifierStage;
