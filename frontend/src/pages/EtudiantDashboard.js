import React, { useState, useEffect } from 'react';
import './EtudiantDashboard.css';
import { logout } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

const EtudiantDashboard = () => {
  const [offers, setOffers] = useState([]);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ message: '', cv: null });

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleApplyClick = () => {
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'cv') {
      setForm({ ...form, cv: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedOffer) return;

    const token = localStorage.getItem('token');
    const data = new FormData();
    data.append('message', form.message);
    data.append('cv', form.cv);
    data.append('stageId', selectedOffer.id);

    try {
      await axios.post('http://localhost:5000/api/candidatures', data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      alert("✅ Candidature envoyée avec succès !");
      setShowModal(false);
      setForm({ message: '', cv: null });
    } catch (error) {
      console.error("Erreur candidature", error);
      alert("❌ Une erreur est survenue !");
    }
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
        <Link to="/profil">
          <button className="btn btn-outline">Profil</button>
        </Link>
        <button onClick={handleLogout}>Se déconnecter</button>
      </nav>

      <div className="dashboard-main">
        <aside className="offre-liste">
          <h2>📋 Liste des offres</h2>
          {offers.map((offer, index) => (
            <div
              key={index}
              className={`offre-item ${selectedOffer === offer ? 'active' : ''}`}
              onClick={() => setSelectedOffer(offer)}
            >
              <h3>{offer.titre}</h3>
              <p><strong>Entreprise:</strong> {offer.entreprise?.nomSociete || 'N/A'}</p>
              <p><strong>Lieu:</strong> {offer.lieu}</p>
              <p><strong>Domaine:</strong> {offer.domaine}</p>
              <p><strong>Période:</strong> {offer.dateDebut?.slice(0, 10)} - {offer.dateFin?.slice(0, 10)}</p>
            </div>
          ))}
        </aside>

        <section className="details-panel">
          {selectedOffer ? (
            <div>
              <h2>{selectedOffer.titre}</h2>
              <p><strong>Lieu:</strong> {selectedOffer.lieu}</p>
              <p><strong>Domaine:</strong> {selectedOffer.domaine}</p>
              <p><strong>Dates:</strong> {selectedOffer.dateDebut?.slice(0, 10)} - {selectedOffer.dateFin?.slice(0, 10)}</p>
              <hr />
              <h3>Description du stage</h3>
              <p>{selectedOffer.description || "Aucune description fournie."}</p>

              <button className="apply-btn" onClick={handleApplyClick}>
                📩 Postuler
              </button>
            </div>
          ) : (
            <p>Sélectionnez une offre pour voir les détails.</p>
          )}
        </section>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Formulaire de candidature</h3>
            <form onSubmit={handleSubmit}>
              <label>Message de motivation</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
              />
              <label>CV (PDF)</label>
              <input
                type="file"
                name="cv"
                accept="application/pdf"
                onChange={handleChange}
                required
              />
              <div className="modal-actions">
                <button type="submit">Envoyer</button>
                <button type="button" className="cancel" onClick={() => setShowModal(false)}>Annuler</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EtudiantDashboard;
