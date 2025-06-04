import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import EtudiantDashboard from './pages/EtudiantDashboard';
import EntrepriseDashboard from './pages/EntrepriseDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Unauthorized from './pages/Unauthorized';
import PrivateRoute from './components/PrivateRoute';
import Register from './pages/Register';
import CreateStage from './pages/CreateStage';
import MesStages from './pages/MesStages';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/creer-stage" element={<CreateStage />} />
        <Route path="/mes-stages" element={<MesStages />} />

        <Route path="/etudiant" element={
          <PrivateRoute role="etudiant">
            <EtudiantDashboard />
          </PrivateRoute>
        } />

        <Route path="/entreprise" element={
          <PrivateRoute role="entreprise">
            <EntrepriseDashboard />
          </PrivateRoute>
        } />

        <Route path="/admin" element={
          <PrivateRoute role="admin">
            <AdminDashboard />
          </PrivateRoute>
        } />

        <Route path="/unauthorized" element={<Unauthorized />} />
      </Routes>
    </Router>
  );
}

export default App;
