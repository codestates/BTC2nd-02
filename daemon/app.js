const express = require("express");
const mongoose = require("mongoose");

const WebSocket = require('ws');

const ws = new WebSocket('wss://public-node-api.klaytnapi.com/v1/cypress/ws')

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


module.exports = app.listen(3000, () => {
  console.log("Server is starting on 3000");
});



