const functions = require('firebase-functions');

const app = require('express')();

const {
    getStocks
} = require('./API/stocks');

app.get('/stocks', getStocks);

const {
    createStocks
} = require('./API/stocks');

app.post('/stocks', createStocks);

exports.api = functions.https.onRequest(app);
