import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../services/authService';
import './Login.css';
import illustration from '../assets/login.png'; // change path if needed

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
      const role = data.user.role;
      if (role === "etudiant") navigate("/etudiant");
      else if (role === "entreprise") navigate("/entreprise");
      else if (role === "admin") navigate("/admin");
    } catch (err) {
      console.error("Erreur de connexion :", err.response?.data || err.message);
      alert("Email ou mot de passe incorrect !");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-left">
          <img src={illustration} alt="Internship illustration" className="login-image" />
        </div>
        <div className="login-right">
          <h2 className="login-title">Bienvenue 👋</h2>
          <p className="login-subtitle">Connectez-vous pour accéder à votre espace personnel</p>

          <form onSubmit={handleSubmit} className="login-form" autoComplete="off">
            <input
              type="email"
              name="user_email"
              placeholder="Email"
              value={credentials.user_email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="user_password"
              placeholder="Mot de passe"
              value={credentials.user_password}
              onChange={handleChange}
              required
            />
            <button type="submit" className="login-button">Se connecter</button>
          </form>

          <p className="register-prompt">
            Pas encore inscrit ? <Link to="/register">Créer un compte</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
