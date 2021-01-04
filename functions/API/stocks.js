/* eslint-disable promise/always-return */
/* eslint-disable promise/catch-or-return */
// const auth = require('../admin/auth');
const { db } = require('../admin/admin');
const { auth } = require('../admin/auth');
exports.getStocks = async (request, response) => {
    const isValid = await auth(request, response);
    if (isValid !== true) return;

    db
    .collection('stocks')
    .where('userId', '==', request.user.uid)
    .get()
    .then((data) => {
        let stocks = [];
        data.forEach((doc) => {
            stocks.push({
                id: doc.id,
                units: doc.data().units,
                ticker: doc.data().ticker,
                valueOnAquired: doc.data().valueOnAquired,
            });
        });
        return response.json(stocks);
    })
    .catch((err) => {
        console.error(err);
        return response.status(500).json({ error: err.code});
    });
}

exports.createStocks = async (request, response) => {
    const isValid = await auth(request, response);
    if (isValid !== true) return;
    
    if (request.body.units.trim() === '') {
        response.status(400).json({ units: 'Must not be empty' });
        return;
    }

    if (request.body.ticker.trim() === '') {
        response.status(400).json({ ticker: 'Must not be empty' });
        return;
    }

    if (request.body.valueOnAquired.trim() === '') {
        response.status(400).json({ valueOnAquired: 'Must not be empty' });
        return;
    }
    
    const newStock = {
        units: request.body.units,
        ticker: request.body.ticker,
        valueOnAquired: request.body.valueOnAquired,
        userId: request.user.uid,
    };

    db
        .collection('stocks')
        .add(newStock)
        .then((doc)=>{
            const returnedStock = newStock;
            returnedStock.id = doc.id;
            return response.json(returnedStock);
        })
        .catch((err) => {
			response.status(500).json({ error: 'Something went wrong' });
			console.error(err);
		});
}