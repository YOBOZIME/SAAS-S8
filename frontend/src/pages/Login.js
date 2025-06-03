import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login(email, password);
      if (data.user.role === "etudiant") navigate("/etudiant");
      else if (data.user.role === "entreprise") navigate("/entreprise");
      else if (data.user.role === "admin") navigate("/admin");
    } catch (err) {
      alert("Erreur de connexion !");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mot de passe" />
      <button type="submit">Se connecter</button>
    </form>
  );
};

export default Login;
