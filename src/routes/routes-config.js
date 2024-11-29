const express = require('express');
const RenderController = require('../controllers/Render/servicesController');
const authenticationController = require('../controllers/Authorization/AuthorizationController');

const router = express.Router();


/**RENDER API ROUTES  */
router.get('/v1/AppServices', RenderController.servicesController.getCurrentServices)

/**AUTHENTICATION AND ACCOUNTS ROUTES */
router.post('/v1/Accounts/NewAccount', authenticationController.authenticationController.postNewAccount)
router.post('/v1/Accounts/Authentication', authenticationController.authenticationController.postNewAuthentication)
router.delete('/v1/Accounts/DeleteAccount', authenticationController.authenticationController.deleteAccount)

module.exports = router;