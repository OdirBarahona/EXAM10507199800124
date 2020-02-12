var express= require('express');
var router = express.Router();

var personaRoutes = require('./imagenes');

router.use('/imagenes', personaRoutes);

module.exports = router;
