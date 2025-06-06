import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const CandidaturesStage = () => {
  const { id } = useParams();
  const [candidatures, setCandidatures] = useState([]);

  useEffect(() => {
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

    fetchCandidatures();
  }, [id]);

  const updateStatut = async (candidatureId, statut) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(`http://localhost:5000/api/candidatures/${candidatureId}/status`, 
        { status: statut },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCandidatures(prev =>
        prev.map(c =>
          c.id === candidatureId ? { ...c, statut } : c
        )
      );
    } catch (err) {
      console.error("Erreur mise à jour du statut :", err);
    }
  };

  return (
    <div style={{ padding: '40px', fontFamily: 'Segoe UI, sans-serif' }}>
      <h2>📥 Candidatures pour ce stage</h2>
      {candidatures.length === 0 ? (
        <p>Aucune candidature reçue.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {candidatures.map(c => (
            <li key={c.id} style={{
              backgroundColor: '#fff',
              marginBottom: '20px',
              padding: '20px',
              borderRadius: '10px',
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
              borderLeft: '5px solid #2f486d'
            }}>
              <h4>{c.etudiant?.user?.prenom} {c.etudiant?.user?.nom}</h4>
              <p><strong>Filière :</strong> {c.etudiant?.filiere}</p>
              <p><strong>Niveau :</strong> {c.etudiant?.niveau}</p>
              <p><strong>CV :</strong> <a href={`http://localhost:5000/uploads/${c.etudiant?.cv}`} target="_blank" rel="noreferrer">Voir CV</a></p>
              <p><strong>Lettre de motivation :</strong> {c.etudiant?.lettreMotivation || 'Non fournie'}</p>
              <p><strong>Statut :</strong> {c.statut}</p>

              <div style={{ marginTop: '10px' }}>
                <button onClick={() => updateStatut(c.id, 'acceptée')} style={{ marginRight: '10px' }}>✅ Accepter</button>
                <button onClick={() => updateStatut(c.id, 'refusée')} style={{ marginRight: '10px' }}>❌ Refuser</button>
                <button onClick={() => alert("Fonction de message à implémenter")}>✉️ Envoyer message</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CandidaturesStage;
