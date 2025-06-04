import React from 'react';
import { logout } from '../services/authService';
import { useNavigate } from 'react-router-dom';

const EntrepriseDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div>
      <h2>Dashboard Entreprise</h2>
      <button onClick={handleLogout}>Se déconnecter</button>
    </div>
  );
};

export default EntrepriseDashboard;
