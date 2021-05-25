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
            let res = await axios.get("http://localhost:8080/api/portfolios/1")
            if (res.status === 200) {
                setPortfolio(res.data);
                console.log(res.data);
                console.log(portfolio);
                console.log(portfolio.buyingPower);
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
                    <Box p={2} display="flex" alignItems="center">
                        <Typography variant="body1">
                            Shares:
                        </Typography>
                        <TextField
                            id="outlined-number"
                            placeholder="0"
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
                    <Box p={2} display="flex" alignItems="center">
                        <Typography variant="body1">
                            Market Price:
                        </Typography>
                        <Typography variant="h6" >
                            {stockData.price}
                        </Typography>
                    </Box>
                    <hr />
                    <Box p={2} display="flex" alignItems="center">
                        <Typography variant="body1">
                            Transaction {value === 0 ? "Cost" : "Credit"}:
                        </Typography>
                        <Typography variant="h6" >
                            {transaction}
                        </Typography>
                    </Box>
                    <Box p={1} display="flex" justifyContent="center">
                        <Button variant="contained" color="primary"
                            onClick={(e) => {
                                handleClick(e, stockData.id, quantity, value, transaction, portfolio, setPortfolio);
                            }}
                        >
                            Submit
                        </Button>
                    </Box>
                    <hr />
                    <Box p={1} display="flex" justifyContent="center">
                        <Typography variant="subtitle1">
                            Buying Power: {portfolio.buyingPower}
                        </Typography>
                    </Box>
                </form>
            )}
        </div>
    );

}
async function handleClick(event, ticker, quantity, action, transaction, portfolio, setPortfolio) {
    console.log(ticker, quantity, action)
    if (action == 0) {
        BuyStocks(ticker, quantity);
        let updatedBuyingPower = portfolio.buyingPower - transaction;
        setPortfolio({buyingPower: updatedBuyingPower});
        console.log(portfolio.buyingPower);
        await axios.put(`http://localhost:8080/api/portfolios/1`, {buyingPower: updatedBuyingPower}, {headers: {'Content-Type': 'application/json'}} );
    } else if (action == 1) {
        SellStocks(ticker, quantity);
        let updatedBuyingPower = portfolio.buyingPower + transaction;
        setPortfolio({buyingPower: updatedBuyingPower});
        await axios.put(`http://localhost:8080/api/portfolios/1`, {buyingPower: updatedBuyingPower}, {headers: {'Content-Type': 'application/json'}} );
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
        height: "450px",
        backgroundColor: "white",
    },
    rootPanel: {
        "& .MuiTextField-root": {
            margin: theme.spacing(1),
            width: "10ch",
        },
    },
}));

const Transactions = ({ data }) => {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    // var [stockData, setStockData] = useState(0);
    // setStockData(data.price);
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

function BuyStocks(ticker, quantity) {
    var options = {
        method: 'PUT',
        url: 'http://localhost:8080/api/holdings/user/1',
        headers: { 'Content-Type': 'application/json' },
        data: { stockId: ticker, quantity: quantity }
    };

    axios.request(options).then(function (response) {
        console.log(response.data);
    }).catch(function (error) {
        console.error(error);
    });

}

function SellStocks(ticker, quantity) {
    var options = {
        method: 'PUT',
        url: 'http://localhost:8080/api/holdings/user/1',
        headers: { 'Content-Type': 'application/json' },
        data: { stockId: ticker, quantity: -Math.abs(quantity) }
    };

    axios.request(options).then(function (response) {
        console.log(response.data);
    }).catch(function (error) {
        console.error(error);
    });

}