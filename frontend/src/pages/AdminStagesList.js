import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './AdminStagesList.css';

const statutMapping = {
  en_attente: 'en attente',
  validé: 'validé',
  refusé: 'refusé'
};

const AdminStagesList = () => {
  const { statut } = useParams();
  const navigate = useNavigate();
  const [stages, setStages] = useState([]);

  const statutReel = statutMapping[statut] || statut;

  const fetchStages = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`http://localhost:5000/api/stages?statut=${statutReel}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStages(res.data);
    } catch (error) {
      console.error("Erreur lors du chargement des stages :", error);
    }
  };

  useEffect(() => {
    fetchStages();
  }, [statut]);

  return (
    <div className="admin-stages-list">
      <button className="back-btn" onClick={() => navigate('/admin')}>← Retour</button>
      <h2>Stages {statut.replace('_', ' ')}</h2>

      {stages.length === 0 ? (
        <p>Aucun stage {statut.replace('_', ' ')} pour le moment.</p>
      ) : (
        <div className="stages-container">
          {stages.map(stage => (
            <div key={stage.id} className="stage-card">
              <h3>{stage.titre}</h3>
              <p><strong>Entreprise :</strong> {stage.entreprise?.nomSociete || 'N/A'}</p>
              <p><strong>Domaine :</strong> {stage.domaine}</p>
              <p><strong>Lieu :</strong> {stage.lieu}</p>
              <p><strong>Période :</strong> {stage.dateDebut?.slice(0,10)} - {stage.dateFin?.slice(0,10)}</p>
              <p><strong>Description :</strong> {stage.description || "Non précisée"}</p>
              {stage.Candidatures && stage.Candidatures.length > 0 && (
  <div className={statutReel === 'refusé' ? 'refused-student' : 'accepted-student'}>
    <p><strong>
      {statutReel === 'validé' ? 'Étudiant accepté :' : 'Étudiants refusés :'}
    </strong></p>

    {stage.Candidatures.map((candidature, index) => (
      <div key={index} style={{ paddingLeft: '10px' }}>
        <p>👤 {candidature.Etudiant?.User?.prenom} {candidature.Etudiant?.User?.nom}</p>
        <p>📧 {candidature.Etudiant?.User?.email}</p>
        <p>🎓 {candidature.Etudiant?.niveau} - {candidature.Etudiant?.filiere}</p>
      </div>
    ))}
  </div>
)}


            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminStagesList;
