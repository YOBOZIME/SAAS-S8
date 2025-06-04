import React from 'react';
import { logout } from '../services/authService';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div>
      <h2>Dashboard Admin</h2>
      <button onClick={handleLogout}>Se déconnecter</button>
    </div>
  );
};

export default AdminDashboard;
