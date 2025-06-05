import React, { useState } from 'react';
import './CreateStage.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
console.log("✅ createStage appelé");

const CreateStage = () => {
  const [stage, setStage] = useState({
    titre: '',
    description: '',
    domaine: '',
    lieu: '',
    dateDebut: '',
    dateFin: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setStage({ ...stage, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/stages', stage, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      alert("Stage publié avec succès !");
      navigate("/entreprise");
    } catch (error) {
      console.error("Erreur lors de la publication :", error.response?.data || error.message);
      alert("Erreur lors de la publication du stage");
    }
  };

  return (
    <div className="stage-form-container">
      <h2>Publier une offre de stage</h2>
      <form className="stage-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <input type="text" name="titre" placeholder="Titre" onChange={handleChange} required />
          <input type="text" name="domaine" placeholder="Domaine" onChange={handleChange} required />
        </div>
        <div className="form-row">
          <input type="text" name="lieu" placeholder="Lieu" onChange={handleChange} required />
          <input type="date" name="dateDebut" onChange={handleChange} required />
          <input type="date" name="dateFin" onChange={handleChange} required />
        </div>
        <div className="form-row">
          <textarea name="description" placeholder="Description" onChange={handleChange} required></textarea>
        </div>
        <button type="submit">Publier</button>
      </form>
    </div>
  );
};

export default CreateStage;
