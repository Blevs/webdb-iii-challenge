const express = require('express');

const server = express();
server.use(express.json());

server.listen(3400, () => console.log("API running on port 3400."));
