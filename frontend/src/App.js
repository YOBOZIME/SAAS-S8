import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import EtudiantDashboard from './pages/EtudiantDashboard';
import EntrepriseDashboard from './pages/EntrepriseDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Unauthorized from './pages/Unauthorized';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        
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
