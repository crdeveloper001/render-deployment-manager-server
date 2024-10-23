const express = require('express');
const Controller = require('../controllers/Render/servicesController');
const router = express.Router();

router.get('/v1/AppServices', Controller.servicesController.getCurrentServices)

module.exports = router;