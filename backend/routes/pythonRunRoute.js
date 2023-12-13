const express = require('express');
const pythonController = require('../controllers/pythonRunController');

const router = express.Router();

router.get('/', pythonController.getRecommendedMates);

module.exports = router;
