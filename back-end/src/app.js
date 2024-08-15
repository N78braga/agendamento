const express = require('express');
const cors = require('cors');
const router = require('./router')

const app = express();

app.use(express.json());
app.use(cors({
    origin: '*',
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
}));

app.use(router);

module.exports = app;