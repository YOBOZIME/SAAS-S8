const express = require('express');
const router = express.Router();

// Route vide de test
router.get('/', (req, res) => {
    res.json([]); // ✅ un tableau vide au lieu d'un objet
});

module.exports = router;
