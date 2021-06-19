import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import {
    AppBar,
    Tabs,
    Tab,
    Box,
    Typography,
    TextField,
    Button,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import axios from 'axios';

function TabPanel({ stockData, children, value, index, ...other }) {
    const classes = useStyles();
    var [transaction, setTransaction] = useState(0);
    var [quantity, setQuantity] = useState(0);

    const [portfolio, setPortfolio] = useState(0);

    function handleChange(event, price) {
        setQuantity(event.target.value);
        setTransaction(event.target.value * price)
    }

    useEffect(() => {
        const getPortfolio = async () => {
            if (window.location.origin === "http://localhost:3000") {
                axios.defaults.baseURL = "http://localhost:8080"; // development address
            } else {
            axios.defaults.baseURL = window.location.origin; // production address
            }    
            let res = await axios.get("api/portfolios/1")
            if (res.status === 200) {
                setPortfolio(res.data);
            } else {
                console.log(res.data);
            }
        }

        getPortfolio();
    }, [])


    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`transaction-tabpanel-${index}`}
            aria-labelledby={`transaction-tab-${index}`}
            {...other}
        >
            {value === index && (
                <form
                    className={classes.rootPanel}
                    noValidate
                    autoComplete="off"
                >
                    <Box p={1} display="flex" alignItems="center">
                        <Typography variant="body1">
                            Shares:
                        </Typography>
                        <TextField
                            id="outlined-number"
                            placeholder="0"
                            value={quantity}
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="outlined"
                            required={true}
                            onChange={(e) => {
                                handleChange(e, stockData.price);
                            }}
                        />
                    </Box>
                    <Box p={1} display="flex" alignItems="center">
                        <Typography variant="body1">
                            Market Price:
                        </Typography>
                        <Typography variant="h6" >
                            {stockData.price}
                        </Typography>
                    </Box>
                    <hr />
                    <Box p={1} display="flex" alignItems="center">
                        <Typography variant="body1">
                            Transaction {value === 0 ? "Cost" : "Credit"}:
                        </Typography>
                        <Typography variant="h6" >
                            {(Math.round(transaction * 100) / 100).toFixed(2)}
                        </Typography>
                    </Box>
                    <Box p={1} display="flex" justifyContent="center">
                        <Button variant="contained" color="primary"
                            onClick={(e) => {
                                handleClick(e, stockData.id, quantity, value, stockData, transaction, portfolio, setPortfolio);
                            }}
                        >
                            Submit
                        </Button>
                    </Box>
                    <hr />
                    <Box p={1} display="flex" justifyContent="center">
                        <Typography variant="subtitle1">
                            Buying Power: {(Math.round(portfolio.buyingPower * 100) / 100).toFixed(2)}
                        </Typography>
                    </Box>
                </form>
            )}
        </div>
    );

}

async function handleClick(event, ticker, quantity, action, data,  transaction, portfolio, setPortfolio) {
    if (quantity > 0) {
        if (action === 0) {
            console.log(ticker, quantity, action, data)
            stocksTransactions(ticker, quantity)
            let updatedBuyingPower = portfolio.buyingPower - transaction;
            await axios.put(`api/portfolios/1`, {buyingPower: updatedBuyingPower}, {headers: {'Content-Type': 'application/json'}} );
            setPortfolio({buyingPower: updatedBuyingPower});
            alert(`Brought ${quantity} shares of ${data.ticker}!`);
        } else if (action === 1) {
            quantity = parseInt(quantity) * (-1);
            let positiveQuantity = parseInt(quantity) * (-1);
            stocksTransactions(ticker, quantity);
            let updatedBuyingPower = portfolio.buyingPower + transaction;
            await axios.put(`api/portfolios/1`, {buyingPower: updatedBuyingPower}, {headers: {'Content-Type': 'application/json'}} );
            setPortfolio({buyingPower: updatedBuyingPower});
            alert(`Sold ${positiveQuantity} shares of ${data.ticker}!`);
            // if (quantity < data.quantity) {
            //     return 0;
            // } else {
            //     console.log(ticker, quantity, action)
            //     stocksTransactions(ticker, quantity)
            // }
        }
        quantity = 0
    }
}

function a11yProps(index) {
    return {
        id: `transaction-${index}`,
        "aria-controls": `transaction-panel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        // flexGrow: 1,
        color: "black",
        height: "-webkit-fill-available",
        width: "-webkit-fill-available",
        backgroundColor: "white",
    },
    rootPanel: {
        "& .MuiTextField-root": {
            margin: theme.spacing(0),
            width: "10ch",
        },
    },
}));

const Transactions = ({ data }) => {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="transactions"
                >
                    <Tab label="Buy" {...a11yProps(0)} />
                    <Tab label="Sell" {...a11yProps(1)} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} stockData={data} index={0}>
                Buy
            </TabPanel>
            <TabPanel value={value} stockData={data} index={1}>
                Sell
            </TabPanel>
        </div>
    );
};

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

export default Transactions;

function stocksTransactions(ticker, quantity) {
    var options = {
        method: 'POST',
        url: 'api/holdings/user/1',
        headers: { 'Content-Type': 'application/json' },
        data: { stockId: ticker, quantity: quantity }
    };

    axios.request(options).then(function (response) {
        console.log(response.data);
    }).catch(function (error) {
        console.error(error);
    });

}

// function SellStocks(ticker, quantity) {
//     var options = {
//         method: 'PATCH',
//         url: 'api/holdings/user/2',
//         headers: { 'Content-Type': 'application/json' },
//         data: { stockId: ticker, quantity: quantity }
//     };

// function SellStocks(ticker, quantity) {
//     var options = {
//         method: 'PUT',
//         url: 'api/holdings/user/1',
//         headers: { 'Content-Type': 'application/json' },
//         data: { stockId: ticker, quantity: -Math.abs(quantity) }
//     };
// }
