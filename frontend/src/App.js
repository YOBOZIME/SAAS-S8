import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Main from './pages/Main';
import EtudiantDashboard from './pages/EtudiantDashboard';
import EntrepriseDashboard from './pages/EntrepriseDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Unauthorized from './pages/Unauthorized';
import PrivateRoute from './components/PrivateRoute';
import Register from './pages/Register';
import CreateStage from './pages/CreateStage';
import MesStages from './pages/MesStages';
import EntrepriseProfile from './pages/EntrepriseProfile';
import ProfilEtudiant from "./pages/ProfilEtudiant";
import ModifierStage from './pages/ModifierStage';
import CandidaturesStage from './pages/CandidaturesStage';
import OtherStages from './pages/OtherStages';
import AdminStagesList from './pages/AdminStagesList';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/creer-stage" element={<CreateStage />} />
        <Route path="/mes-stages" element={<MesStages />} />
        <Route path="/entreprise/profil" element={<EntrepriseProfile />} />
        <Route path="/profil" element={<ProfilEtudiant />} />
        <Route path="/modifier-stage/:id" element={<ModifierStage />} />
        <Route path="/candidatures-stage/:id" element={<CandidaturesStage />} />
        <Route path="/autres-stages" element={<OtherStages />} />
        <Route path="/admin/stages/:statut" element={<AdminStagesList />} />


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
