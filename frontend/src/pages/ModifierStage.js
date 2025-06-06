import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

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
    <div style={{ padding: '40px', fontFamily: 'Segoe UI', backgroundColor: '#f3cae0', minHeight: '100vh' }}>
      <h2 style={{ color: '#223148' }}>📝 Modifier Stage</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: '600px', background: '#fff', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
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

        <button type="submit" style={{ marginTop: '20px', background: '#2f486d', color: 'white', padding: '10px 18px', borderRadius: '6px', border: 'none', cursor: 'pointer' }}>
          💾 Enregistrer
        </button>
      </form>
    </div>
  );
};

export default ModifierStage;
