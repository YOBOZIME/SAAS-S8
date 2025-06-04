import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './MesStages.css';

const MesStages = () => {
  const [stages, setStages] = useState([]);
  const navigate = useNavigate();

  const fetchStages = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/stages/mine', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setStages(res.data);
    } catch (err) {
      console.error('Erreur lors du chargement des stages :', err);
    }
  };

  const deleteStage = async (id) => {
    if (!window.confirm("Supprimer ce stage ?")) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/stages/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setStages(stages.filter(stage => stage.id !== id));
    } catch (err) {
      console.error('Erreur de suppression :', err);
    }
  };

  const goToUpdate = (stage) => {
    navigate(`/modifier-stage/${stage.id}`, { state: stage });
  };

  useEffect(() => {
    fetchStages();
  }, []);

  return (
    <div className="mes-stages-container">
      <h2>Mes Offres de Stage</h2>
      <div className="stages-list">
        {stages.map(stage => (
          <div className="stage-card" key={stage.id}>
            <h3>{stage.titre}</h3>
            <p><strong>Domaine:</strong> {stage.domaine}</p>
            <p><strong>Lieu:</strong> {stage.lieu}</p>
            <p><strong>Période:</strong> {stage.dateDebut?.slice(0, 10)} au {stage.dateFin?.slice(0, 10)}</p>
            <div className="btn-group">
              <button className="edit-btn" onClick={() => goToUpdate(stage)}>Modifier</button>
              <button className="delete-btn" onClick={() => deleteStage(stage.id)}>Supprimer</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MesStages;
