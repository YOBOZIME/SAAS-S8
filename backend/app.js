const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./config/database');
const { sync_databases } = require('./models/index');
const path = require('path');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads/cvs')));

// Routes
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);
const tuteurRoutes = require('./routes/tuteurRoute');
app.use('/api/tuteurs', tuteurRoutes);
const privateRoutes = require('./routes/privateRoutes');
app.use('/api/private', privateRoutes);
const candidatureRoutes = require('./routes/candidatureRoutes');
app.use('/api/candidatures', candidatureRoutes);
const stageRoutes = require('./routes/stageRoutes');
app.use('/api/stages', stageRoutes);
const entrepriseRoutes = require('./routes/entrepriseRoutes');
app.use('/api/entreprises', entrepriseRoutes);
const etudiantRoutes = require('./routes/etudiantRoutes');
app.use('/api/etudiants', etudiantRoutes);
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);
const adminRoutes = require('./routes/adminRoute');
app.use('/api/admin', adminRoutes);
const errorHandler = require('./middlewares/errorHandler');
app.use(errorHandler);

sequelize.authenticate()
  .then(() => console.log('Connexion à la base de données réussie.'))
  .catch(err => console.error('Erreur de connexion à la base :', err));

//sync
sync_databases();

// Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));