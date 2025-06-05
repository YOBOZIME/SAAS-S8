import React, { useState, useEffect } from 'react';
import './EtudiantDashboard.css';
import { logout } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const EtudiantDashboard = () => {
  const [offers, setOffers] = useState([]);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  useEffect(() => {
    axios.get("http://localhost:5000/api/stages")
      .then(res => setOffers(res.data))
      .catch(err => console.error("Erreur chargement des stages", err));
  }, []);

  return (
    <div className="etudiant-dashboard">
      <nav className="navbar">
        <h1>🎓 Opportunités de Stage</h1>
        <button onClick={handleLogout}>Se déconnecter</button>
      </nav>

      <div className="dashboard-content">
        <div className="offer-list">
          {offers.map((offer, index) => (
            <div
              key={index}
              className={`offer-card ${selectedOffer === offer ? 'active' : ''}`}
              onClick={() => setSelectedOffer(offer)}
            >
              <h3>{offer.titre}</h3>
              <p><strong>Entreprise:</strong> {offer.entreprise?.nomSociete || 'N/A'}</p>
              <p><strong>Lieu:</strong> {offer.lieu}</p>
              <p><strong>Domaine:</strong> {offer.domaine}</p>
              <p><strong>Période:</strong> {offer.dateDebut?.slice(0,10)} - {offer.dateFin?.slice(0,10)}</p>
            </div>
          ))}
        </div>

        <div className="offer-details">
          {selectedOffer ? (
            <div>
              <h2>{selectedOffer.titre}</h2>
              <h4>{selectedOffer.entreprise?.nomSociete}</h4>
              <p><strong>Lieu:</strong> {selectedOffer.lieu}</p>
              <p><strong>Domaine:</strong> {selectedOffer.domaine}</p>
              <p><strong>Dates:</strong> {selectedOffer.dateDebut?.slice(0,10)} - {selectedOffer.dateFin?.slice(0,10)}</p>
              <hr />
              <h3>Description du stage</h3>
              <p>{selectedOffer.description || "Aucune description fournie."}</p>
            </div>
          ) : (
            <p style={{ textAlign: 'center', marginTop: '50px' }}>
              Sélectionnez une offre pour voir les détails.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EtudiantDashboard;
