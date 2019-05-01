const express = require('express');

const server = express();
server.use(express.json());

const cohortsRoutes = require('./cohorts/routes.js');
server.use('/api/cohorts', cohortsRoutes);

server.listen(3400, () => console.log("API running on port 3400."));
