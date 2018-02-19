
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
var os = require("os")

const hostname = "127.0.0.1";
const port = 80;

const server = express();

server.use(express.static(path.join(__dirname, 'dist')));

server.listen(port,hostname, () => {
    console.log(`Server is running at http://${hostname}:${port}/`);
});

console.log(`Aantal cpu-cores: ${os.cpus().length}, totaal: ${os.totalmem()}}/`);