const express = require('express');

const server = express();
server.use(express.json());

const cohortsRoutes = require('./cohorts/routes.js');
server.use('/api/cohorts', cohortsRoutes);

const studentsRoutes = require('./students/routes.js');
server.use('/api/students', studentsRoutes);

server.listen(3400, () => console.log("API running on port 3400."));
