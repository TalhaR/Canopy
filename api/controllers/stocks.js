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


// Query the Polygon.io API to update
// price, open, close, high, low, volume, market cap, P/E ratio, and dividend yield
router.put('/:stockTicker/', async(req, res) => {
    try {
        const { stockTicker } = req.params;
        // const { date } = req.params;

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

                    console.log(month.length)

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
        
        formattedDates = Last10Days();
        console.log(formattedDates);

        fiveDates = formattedDates.slice(0, 5);
        console.log(fiveDates);

        const axios = require('axios');
        resultData = [];
        getPrices = async () => {
            let id = await StockHistory.count() + 1;
            for(let i = 0; i < fiveDates.length; i++) {
                await ( async function(i) {

                    setTimeout( async (i) => {
                        let response = await axios.get(`https://api.polygon.io/v1/open-close/${stockTicker}/${fiveDates[i]}?apiKey=YezH1NTxZjofbNK4HCUblp5BvmrMNlLT`)
                        let responseData = await response.data;
                        if (responseData["status"] == "OK") {
                            let dateObject = new Date(responseData["from"]);
                            let price = parseFloat(responseData["close"]);
                            let stockId = req.body.stockId;

                            // if the date already exists as an entry in the stock history database, don't add
                            if ( await StockHistory.findOne({where: { date: new Date(responseData["from"]) }}) === null ) {
                                resultData.push({"id": id, "date": dateObject, "price": price, "stockId": stockId})
                            }
                        }
                        id++;
                    }, 15000);
                }(i));
            }
            console.log(resultData);

            StockHistory.bulkCreate(
                resultData, {returning: true, ignoreDuplicates: true}
            );
            // let updatedHistoricalStockPrices = await stockHistories.create(
            //     {date: responseData["from"], price: responseData["price"]},
            //     {where: {ticker: stockTicker}, returning: true}
            // );
        }

        getPrices();

        res.json("Added historical prices to database")

        // res.json(updatedHistoricalStockPrices);

        // let response = await axios.get(`https://api.polygon.io/v1/open-close/${stockTicker}/${date}?apiKey=YezH1NTxZjofbNK4HCUblp5BvmrMNlLT`)
        // let responseData = await response.data;
        // let updatedStock = await Stock.update(
        //     {price: responseData["afterHours"], open: responseData["open"], high: responseData["high"], low: responseData["low"], close: responseData["close"], volume: responseData["volume"]}, 
        //     {where: {ticker: stockTicker}, returning: true}
        // );
        // res.json(updatedStock);
    }
    catch(error) {
        console.log(error);
    }
});

module.exports = router;
