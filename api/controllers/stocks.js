const express = require('express');
const router = express.Router();
const db = require('../models');
const { Stock, StockHistory} = db;

// This is a simple example for providing basic CRUD routes for
// a resource/model. It provides the following:
//    GET    /stocks
//    POST   /stocks
//    GET    /stocks/:id
//    PUT    /stocks/:id
//    DELETE /stocks/:id 

// query for last 15 weekdays in MM-DD-YYYY format
function Last10Days () {
    let result = [];
    let i = 1;
    while(result.length < 10) {
        let d = new Date();
        d.setDate(d.getDate() - i);
        if (d.getDay() !== 6 && d.getDay() !== 0) {
            let year = d.getFullYear()
            let month = d.getMonth() + 1
            let day = d.getDate()

            if (month < 10)
                month = '0' + month;
            if (day < 10)
                day = '0' + day;

            result.push( year + '-' + month + '-' + day )
        }
        i++;
            
    }

    return(result);
}

// Get a list of all the stocks in the database.
router.get('/', (req, res) => {
    Stock.findAll({})
        .then(stocks => res.json(stocks));
});


// Get a specific stock by its ticker. 
router.get('/:stockTicker', async (req, res) => {
    const { stockTicker } = req.params;
    try {
        const stock = await Stock.findOne({
            where: { ticker: stockTicker }
        })
        res.json(stock);
    } catch (error) {
        err => console.log(err);
        return res.status(404).json({ message: 'Stock not found' });
    }
});


// Update current price of a stock by its ticker.
router.patch('/:stockTicker', async (req, res) => {
    try {
        const { stockTicker } = req.params;
        const updatedStock = await Stock.update(
            { price: req.body.price },
            { where: { ticker: stockTicker }, returning: true }
        )
        res.json(updatedStock);
    } catch (error) {
        err => console.log(err);
        return res.status(404).json({ message: 'Stock not found' });
    }
});


// Query the Polygon.io API to update weekly historical prices
router.put('/price-history/:stockTicker/', async(req, res) => {
    try {
        const { stockTicker } = req.params;
        // const { date } = req.params;

        const stock = await Stock.findOne({where: { ticker: stockTicker }});

        // get the stock id from the ticker name
        let stockNum = stock["id"];
        console.log(stockNum);
        
        // retrieve last 10 weekdays
        formattedDates = Last10Days();
        console.log(formattedDates);

        sevenDates = formattedDates.slice(0, 7);
        console.log(sevenDates);

        const axios = require('axios');
        resultData = [];
        getPrices = async () => {
            let id = await StockHistory.count() + 1;
            for(let i = 0; i < sevenDates.length; i++) {
                await ( async (sevenDates) => {
                    await new Promise(resolve => setTimeout(resolve, 15000)); // wait 15 seconds
                    let response = await axios.get(`https://api.polygon.io/v1/open-close/${stockTicker}/${sevenDates[i]}?apiKey=YezH1NTxZjofbNK4HCUblp5BvmrMNlLT`)
                    let responseData = await response.data;
                    if (responseData["status"] == "OK") {
                        let dateObject = new Date(responseData["from"]);
                        let price = parseFloat(responseData["close"]);
                        let stockId = stockNum;

                        // if the date already exists as an entry in the stock history database, don't add
                        if ( await StockHistory.findOne({where: { date: new Date(responseData["from"]) }}) === null ) {
                            resultData.push({"id": id, "date": dateObject, "price": price, "stockId": stockId})
                        }
                    }
                    id++;
                })(sevenDates);
            }
            console.log(resultData);

            StockHistory.bulkCreate(
                resultData, {returning: true, ignoreDuplicates: true}
            );
        }

        getPrices();

        res.json("Added historical prices to database")
    }
    catch(error) {
        console.log(error);
    }
});

// Query the Polygon.io API to update key stock stats:
// open, close, high, low, volume, market cap, P/E ratio, and dividend yield
router.put('/stock-stats/:stockTicker/', async(req, res) => {
    try {
        const { stockTicker } = req.params;

        let previousDay = Last10Days().slice(0, 1).toString();

        const axios = require('axios');
        let response = await axios.get(`https://api.polygon.io/v1/open-close/${stockTicker}/${previousDay}?apiKey=YezH1NTxZjofbNK4HCUblp5BvmrMNlLT`)
        let responseData = await response.data;
        let updatedStock = await Stock.update(
            {price: responseData["afterHours"], open: responseData["open"], high: responseData["high"], low: responseData["low"], close: responseData["close"], volume: responseData["volume"]}, 
            {where: {ticker: stockTicker}, returning: true}
        );
        res.json(updatedStock);
    }
    catch(error) {
        console.log(error);
    }
});


module.exports = router;
