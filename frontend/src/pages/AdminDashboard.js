import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState(null);

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

  useEffect(() => {
    fetchUsers();
    fetchStats();
  }, []);

  return (
    <div className="admin-dashboard">
      <h2>Tableau de Bord Admin</h2>

      {stats && (
        <div className="stats">
          <p>Stages en attente : {stats.enAttente}</p>
          <p>Stages validés : {stats.valides}</p>
          <p>Stages refusés : {stats.refuses}</p>
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
    </div>
  );
};

export default AdminDashboard;
