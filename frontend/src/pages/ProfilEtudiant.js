import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ProfilEtudiant() {
  const [etudiant, setEtudiant] = useState(null);
  const [candidatures, setCandidatures] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    const fetchData = async () => {
      try {
        const res1 = await axios.get(`http://localhost:5000/api/etudiants/me`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        setEtudiant(res1.data);

        const res2 = await axios.get(`http://localhost:5000/api/etudiants/etudiant`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setCandidatures(res2.data);
      } catch (err) {
        console.error("Erreur lors du chargement du profil :", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading || !etudiant) return <div>Chargement...</div>;

  return (
    <div>
      <h2>Profil Étudiant</h2>
      <img
        src="/default-profile.png"
        alt="Photo de profil"
        style={{ width: "150px", height: "150px", borderRadius: "50%" }}
      />
      <p><strong>Nom :</strong> {etudiant.User.nom}</p>
      <p><strong>Prénom :</strong> {etudiant.User.prenom}</p>
      <p><strong>Email :</strong> {etudiant.User.email}</p>
      <p><strong>Niveau :</strong> {etudiant.niveau}</p>
      <p><strong>Filière :</strong> {etudiant.filiere}</p>

      <h3>Mes Candidatures</h3>
      {candidatures.length === 0 ? (
        <p>Aucune candidature envoyée.</p>
      ) : (
        <ul>
          {candidatures.map(c => (
            <li key={c.id}>
              Stage : {c.Stage?.titre} — Statut : {c.statut}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ProfilEtudiant;
