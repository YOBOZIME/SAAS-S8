import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OtherStages = () => {
  const [stages, setStages] = useState([]);

  useEffect(() => {
    const fetchStages = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/stages/others', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setStages(res.data);
      } catch (err) {
        console.error("Erreur chargement stages autres entreprises :", err);
      }
    };

    fetchStages();
  }, []);

  return (
    <div style={{ padding: "40px" }}>
      <h2>🎯 Offres des autres entreprises</h2>
      {stages.length === 0 ? (
        <p>Aucune offre disponible.</p>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
          {stages.map(stage => (
            <div key={stage.id} style={{ background: "#fff", padding: "20px", borderRadius: "10px", width: "300px" }}>
              <h4>{stage.titre}</h4>
              <p><strong>Domaine:</strong> {stage.domaine}</p>
              <p><strong>Lieu:</strong> {stage.lieu}</p>
              <p><strong>Entreprise:</strong> {stage.Entreprise?.nomSociete}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OtherStages;
