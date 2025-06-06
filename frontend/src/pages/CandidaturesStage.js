import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const CandidaturesStage = () => {
  const { id } = useParams();
  const [candidatures, setCandidatures] = useState([]);

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

  const updateStatus = async (candidatureId, status) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(`http://localhost:5000/api/candidatures/${candidatureId}/status`, {
        statut: status
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });      
      fetchCandidatures();
    } catch (err) {
      console.error("Erreur mise à jour du statut :", err);
    }
  };
  

  return (
    <div style={{ padding: '40px', backgroundColor: '#f3eae0', minHeight: '100vh' }}>
      <h2>📥 Candidatures pour ce stage</h2>
      {candidatures.length === 0 ? (
        <p>Aucune candidature reçue.</p>
      ) : (
        candidatures.map((c) => (
          <div key={c.id} style={{ background: '#fff', margin: '20px 0', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
            <p><strong>Lettre de motivation :</strong> {c.message}</p>
            <p><strong>CV :</strong> {c.cv ? <a href={`http://localhost:5000/uploads/${c.cv}`} target="_blank" rel="noreferrer">Voir le CV</a>
 : "Non fourni"}</p>
            <p><strong>Statut :</strong> {c.statut}</p>

            <button onClick={() => updateStatus(c.id, 'acceptée')}>✅ Accepter</button>
            <button onClick={() => updateStatus(c.id, 'refusée')}>❌ Refuser</button>
          </div>
        ))
      )}
    </div>
  );
};

export default CandidaturesStage;
