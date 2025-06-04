import React, { useEffect, useState } from 'react';
import { postuler } from '../services/candidatureService';

const EtudiantDashboard = () => {
  const [stages, setStages] = useState([]);

  useEffect(() => {
    // Exemple de récupération de stages (à adapter selon ton backend)
    fetch("http://localhost:5000/api/stages")
      .then(res => res.json())
      .then(data => setStages(data))
      .catch(err => console.error("Erreur de chargement des stages", err));
  }, []);

  const handlePostuler = async (stageId) => {
    try {
      await postuler(stageId);
      alert("Candidature envoyée !");
    } catch (err) {
      alert("Erreur lors de la candidature");
    }
  };

  return (
    <div>
      <h2>Liste des stages</h2>
      <ul>
        {stages.map((stage) => (
          <li key={stage.id}>
            {stage.titre} – {stage.entreprise?.nom}
            <button onClick={() => handlePostuler(stage.id)}>
              Postuler
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EtudiantDashboard;
