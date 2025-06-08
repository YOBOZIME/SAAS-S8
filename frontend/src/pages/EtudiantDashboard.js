import React, { useState, useEffect } from 'react';
import './EtudiantDashboard.css';
import { logout } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const EtudiantDashboard = () => {
  const [offers, setOffers] = useState([]);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ message: '', cv: null });
  const [appliedStages, setAppliedStages] = useState([]);
  const [photo, setPhoto] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const fetchPhoto = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/etudiants/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.photo) {
        const fullUrl = `http://localhost:5000/uploads/${res.data.photo}`;
        setPhoto(fullUrl);
      } else {
        setPhoto('/default-avatar.png');
      }
    } catch (err) {
      console.error("Erreur chargement photo étudiant :", err);
      setPhoto('/default-avatar.png');
    }
  };

  const fetchCandidatures = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/candidatures/mes", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const stageIds = res.data.map(c => c.Stage?.id || c.stageId);
      setAppliedStages(stageIds);
    } catch (err) {
      console.error("Erreur chargement candidatures", err);
    }
  };

  const fetchStages = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/stages");
      setOffers(res.data);
    } catch (err) {
      console.error("Erreur chargement des stages", err);
    }
  };

  const handleApplyClick = () => {
    if (appliedStages.includes(selectedOffer.id)) {
      alert("❗ Vous avez déjà postulé à ce stage.");
      return;
    }
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({ ...form, [name]: name === 'cv' ? files[0] : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedOffer) return;

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
      alert("✅ Candidature envoyée !");
      setAppliedStages([...appliedStages, selectedOffer.id]);
      setShowModal(false);
      setForm({ message: '', cv: null });
    } catch (error) {
      if (error.response?.status === 400 && error.response?.data?.message.includes("déjà")) {
        alert("❗ Vous avez déjà postulé à ce stage.");
      } else {
        alert("❌ Une erreur est survenue !");
      }
    }
  };

  useEffect(() => {
    const loadData = async () => {
      await fetchPhoto();
      await fetchCandidatures();
      await fetchStages();
      setLoading(false);
    };
    loadData();
  }, []);

  if (loading) return <p style={{ textAlign: 'center', marginTop: '40px' }}>Chargement...</p>;

  return (
    <div className="etudiant-dashboard">
      <nav className="navbar">
        <div className="navbar-logo" onClick={() => navigate('/etudiant')}>
          Intern'<span style={{ color: '#2f486d' }}>Net</span>
        </div>

        <div className="navbar-actions">
          <button onClick={handleLogout}>Déconnexion</button>
          <img
            src={photo || '/default-avatar.png'}
            alt="Profil"
            className="navbar-avatar"
            onClick={() => navigate('/profil')}
          />
          

        </div>
      </nav>

      <div className="dashboard-main">
        <aside className="offre-liste">
          <h2>Liste des offres</h2>
          <div className="search-wrapper">
  <span className="search-icon">🔍</span>
  <input
    type="text"
    className="search-input"
    placeholder="Rechercher un stage..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />
</div>

          {offers
  .filter((offer) => {
    const keyword = searchTerm.toLowerCase();
    return (
      offer.titre.toLowerCase().includes(keyword) ||
      offer.domaine.toLowerCase().includes(keyword)
    );
    
  })
  .map((offer, index) => (

            <div
              key={index}
              className={`offre-item ${selectedOffer === offer ? 'active' : ''}`}
              onClick={() => setSelectedOffer(offer)}
            >
              <h3>{offer.titre}</h3>
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

              <button
                className="apply-btn"
                onClick={handleApplyClick}
                disabled={appliedStages.includes(selectedOffer.id)}
                style={{
                  backgroundColor: appliedStages.includes(selectedOffer.id) ? '#ccc' : '',
                  cursor: appliedStages.includes(selectedOffer.id) ? 'not-allowed' : 'pointer'
                }}
              >
                {appliedStages.includes(selectedOffer.id) ? '✅ Candidature envoyée' : '📩 Postuler'}
              </button>
            </div>
          ) : (
            <p>Sélectionnez une offre pour voir les détails.</p>
          )}
        </section>
      </div>

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
