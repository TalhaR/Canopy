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
const request = require('request');
async function stocksFetch() {
    return await fetch('http://localhost:8080/api/stocks/GME')
        .then(response => response.json());
}
function TabPanel({ children, value, index, ...other }) {
    const classes = useStyles();
    // const data =  fetch('http://localhost:8080/api/stocks/GME')
    //     .then(response => response.json());
    // var data = stocksFetch();
    var data = {
        "id": 1,
        "ticker": "GME",
        "name": "Gamestop",
        "price": 154.69,
        "createdAt": "2021-05-18T19:20:45.776Z",
        "updatedAt": "2021-05-18T19:20:45.776Z"
    };

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
                        />
                    </Box>
                    <Box p={2} display="flex" alignItems="center">
                        <Typography variant="body1">
                            Market Price:
                        </Typography>
                        <Typography variant="h6" >
                            {data.price}
                        </Typography>
                    </Box>
                    <hr />
                    <Box p={2} display="flex" alignItems="center">
                        <Typography variant="body1">
                            Transaction {value === 0 ? "Cost" : "Credit"}:
                        </Typography>
                        <Typography variant="h6" >
                            $123.45
                        </Typography>
                    </Box>
                    <Box p={1} display="flex" justifyContent="center">
                        <Button variant="contained" color="primary" onClick={handleClick({ value })}>
                            Submit
                        </Button>
                    </Box>
                    <hr />
                    <Box p={1} display="flex" justifyContent="center">
                        <Typography variant="subtitle1">
                            Buying Power: $100,000.00
                        </Typography>
                    </Box>
                </form>
            )}
        </div>
    );

}
function handleClick(value) {
    console.log("Click submit")
    console.log(value)
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

const Transactions = () => {
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
            <TabPanel value={value} index={0}>
                Buy
            </TabPanel>
            <TabPanel value={value} index={1}>
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



function BuyStocks(quantity) {
    const request = require('request');
    const [value, setValue] = React.useState(0);
    const stockId = value;
    const options = {
        method: 'POST',
        url: 'http://localhost:8080/api/holdings/user/2',
        headers: { 'Content-Type': 'application/json' },
        body: { stockId, quantity },
        json: true
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        console.log(body);
    });

}