import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService';
import './Login.css';

const Login = () => {
  const [credentials, setCredentials] = useState({
    user_email: '',
    user_password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login(credentials.user_email, credentials.user_password);
      console.log("✅ Connexion réussie :", data);

      const role = data.user.role;
      if (role === "etudiant") navigate("/etudiant");
      else if (role === "entreprise") navigate("/entreprise");
      else if (role === "admin") navigate("/admin");

    } catch (err) {
      console.error("❌ Erreur de connexion :", err.response?.data || err.message);
      alert("Erreur de connexion !");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit} autoComplete="off">
        <h2>Connexion</h2>
        <input
          type="email"
          name="user_email"
          placeholder="Email"
          value={credentials.user_email}
          onChange={handleChange}
          autoComplete="off"
          required
        />
        <input
          type="password"
          name="user_password"
          placeholder="Mot de passe"
          value={credentials.user_password}
          onChange={handleChange}
          autoComplete="new-password"
          required
        />
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
};

export default Login;
