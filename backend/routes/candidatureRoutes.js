const express = require('express');
const router = express.Router();
const controller = require('../controllers/candidatureController');
const verifyToken = require('../middlewares/verifyToken');
const checkRole = require('../middlewares/checkRole');

// Toutes les routes protégées par JWT
router.post('/', verifyToken, checkRole(['etudiant']), controller.create);       // Créer une candidature
router.get('/', verifyToken, checkRole(['admin', 'entreprise']), controller.getAll); // Voir toutes les candidatures (admin, entreprise)
router.get('/:id', verifyToken, checkRole(['admin', 'entreprise', 'etudiant']), controller.getOne); // Voir une candidature
router.put('/:id', verifyToken, checkRole(['entreprise', 'admin']), controller.update); // Modifier (statut)
router.delete('/:id', verifyToken, checkRole(['admin']), controller.remove);    // Supprimer candidature (admin uniquement)

module.exports = router;
