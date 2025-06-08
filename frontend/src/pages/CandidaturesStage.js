import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './CandidaturesStage.css'; // Assure-toi que ce fichier existe
import { useNavigate } from 'react-router-dom';

const CandidaturesStage = () => {
  const { id } = useParams();
  const [candidatures, setCandidatures] = useState([]);
  const navigate = useNavigate();

  const fetchCandidatures = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`http://localhost:5000/api/candidatures/stage/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCandidatures(res.data);
    } catch (err) {
      console.error("Erreur chargement candidatures :", err);
    }
  };

  useEffect(() => {
    fetchCandidatures();
  }, [id]);

  const updateStatus = async (candidatureId, statut) => {
    try {
      const token = localStorage.getItem('token');
  
      // 1. Met à jour la candidature
      await axios.patch(`http://localhost:5000/api/candidatures/${candidatureId}/status`, {
        statut
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
  
      // 2. Recharge les candidatures
      const res = await axios.get(`http://localhost:5000/api/candidatures/stage/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      const updatedCandidatures = res.data;
      setCandidatures(updatedCandidatures);
  
      // 3. Déterminer le nouveau statut du stage
      const hasAccepted = updatedCandidatures.some(c => c.statut === 'acceptée');
      const allRefused = updatedCandidatures.every(c => c.statut === 'refusée');
  
      let stageStatus = null;
      if (hasAccepted) {
        stageStatus = 'validé';
      } else if (allRefused) {
        stageStatus = 'refusé';
      }
  
      // 4. Met à jour le statut du stage si nécessaire
      if (stageStatus) {
        await axios.patch(`http://localhost:5000/api/stages/${id}/status`, {
          status: stageStatus
        }, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
  
    } catch (err) {
      console.error("Erreur mise à jour du statut :", err);
    }
  };
  

  return (
    <div className="candidature-page">
      <div className="navbar-top">
  <div className="navbar-brand" onClick={() => navigate('/entreprise')}>
    Intern'<span style={{ color: '#2f486d' }}>Net</span>
  </div>
</div>

      <h2>📥 Candidatures pour ce stage</h2>
      {candidatures.length === 0 ? (
        <p style={{ paddingLeft: '10px' }}>Aucune candidature reçue.</p>
      ) : (
        <div className="candidature-grid">
          {candidatures.map((c) => (
            <div key={c.id} className="candidature-card">
              <p><strong>Lettre de motivation :</strong><br />{c.message || <em>(Non fournie)</em>}</p>
              <p><strong>CV :</strong> {c.cv ? (
                <a href={`http://localhost:5000/uploads/${c.cv}`} target="_blank" rel="noreferrer">Voir le CV</a>
              ) : "Non fourni"}</p>
              <p><strong>Statut :</strong> <span className={`candidature-status ${c.statut}`}>{c.statut}</span></p>

              <div className="candidature-actions">
                <button className="accept" onClick={() => updateStatus(c.id, 'acceptée')}>✅ Accepter</button>
                <button className="refuse" onClick={() => updateStatus(c.id, 'refusée')}>❌ Refuser</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CandidaturesStage;