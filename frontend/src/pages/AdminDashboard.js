import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminDashboard.css';
import { useNavigate } from 'react-router-dom';
import { logout } from '../services/authService';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }

    window.history.pushState(null, null, window.location.href);
    window.onpopstate = function () {
      navigate('/login');
    };

    fetchUsers();
    fetchStats();
  }, []);

  const fetchUsers = async () => {
    const token = localStorage.getItem('token');
    const res = await axios.get('http://localhost:5000/api/admin/users', {
      headers: { Authorization: `Bearer ${token}` }
    });
    setUsers(res.data);
  };

  const toggleActivation = async (id) => {
    const token = localStorage.getItem('token');
    await axios.patch(`http://localhost:5000/api/admin/users/${id}/Active`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchUsers();
  };

  const fetchStats = async () => {
    const token = localStorage.getItem('token');
    const res = await axios.get('http://localhost:5000/api/admin/stats', {
      headers: { Authorization: `Bearer ${token}` }
    });
    setStats(res.data);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  useEffect(() => {
    fetchUsers();
    fetchStats();
  }, []);

  return (
    <div className="admin-dashboard">
      <nav className="navbar">
        <div className="navbar-logo" onClick={() => navigate('/admin')}>
          Intern'<span style={{ color: '#2f486d' }}>Net</span>
        </div>
        <div className="navbar-actions">
          <button onClick={handleLogout}>Déconnexion</button>
        </div>
      </nav>

      <main className="dashboard-main">
        <h2>Tableau de Bord Admin</h2>

        {stats && (
  <div className="stats">
    <div className="stat-card">
      <p>📋 Stages en attente : {stats.enAttente}</p>
      <button onClick={() => navigate('/admin/stages/en_attente')}>Détails</button>
    </div>
    <div className="stat-card">
      <p>✅ Stages validés : {stats.valides}</p>
      <button onClick={() => navigate('/admin/stages/validé')}>Détails</button>
    </div>
    <div className="stat-card">
      <p>❌ Stages refusés : {stats.refuses}</p>
      <button onClick={() => navigate('/admin/stages/refusé')}>Détails</button>
    </div>
  </div>
)}



        <h3>Utilisateurs inscrits</h3>
        <table>
          <thead>
            <tr>
              <th>Nom</th><th>Prénom</th><th>Email</th><th>Rôle</th><th>Actif</th><th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id}>
                <td>{u.nom}</td>
                <td>{u.prenom}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>
                <td>{u.actif ? '✅' : '❌'}</td>
                <td>
                  <button onClick={() => toggleActivation(u.id)}>
                    {u.actif ? 'Désactiver' : 'Activer'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default AdminDashboard;
