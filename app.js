const express = require('express');
const app = express();

const abuse = require('./routes/abuseVt.routes');

app.use("/api/v1", abuse);

module.exports = app;