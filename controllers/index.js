const router = require('express').Router();

const apiRoutes = require('./api');

router.use('/api', apiRoutes);

module.exprts = router;