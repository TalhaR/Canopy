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

// class TabPanel extends React.Component {
//     constructor(props) {
//         const classes = useStyles();
//         var Transaction = 0;
//         super(props);
//         this.state = { value: 'coconut' };

//         this.handleChange = this.handleChange.bind(this);
//         this.handleSubmit = this.handleSubmit.bind(this);
//     }
// //     const classes = useStyles();

// //     var Transaction = 0;

//     handleChange(event, price) {
//         Transaction = event.target.value * price
//         console.log(Transaction)
//     }
//     handleChange(event) {
//         this.setState({ value: event.target.value });
//     }

//     handleSubmit(event) {
//         alert('Your favorite flavor is: ' + this.state.value);
//         event.preventDefault();
//     }

//     render() {
//         return (
//             <div
//                 role="tabpanel"
//                 hidden={value !== index}
//                 id={`transaction-tabpanel-${index}`}
//                 aria-labelledby={`transaction-tab-${index}`}
//                 {...other}
//             >
//                 {value === index && (
//                     <form
//                         className={classes.rootPanel}
//                         noValidate
//                         autoComplete="off"
//                     >
//                         <Box p={2} display="flex" alignItems="center">
//                             <Typography variant="body1">
//                                 Shares:
//                     </Typography>
//                             <TextField
//                                 id="outlined-number"
//                                 placeholder="0"
//                                 type="number"
//                                 InputLabelProps={{
//                                     shrink: true,
//                                 }}
//                                 variant="outlined"
//                                 required={true}
//                                 onChange={(e) => {
//                                     handleChange(e, stockData.price);
//                                 }}
//                             />
//                         </Box>
//                         <Box p={2} display="flex" alignItems="center">
//                             <Typography variant="body1">
//                                 Market Price:
//                     </Typography>
//                             <Typography variant="h6" >
//                                 {stockData.price}
//                             </Typography>
//                         </Box>
//                         <hr />
//                         <Box p={2} display="flex" alignItems="center">
//                             <Typography variant="body1">
//                                 Transaction {value === 0 ? "Cost" : "Credit"}:
//                     </Typography>
//                             <Typography variant="h6" >
//                                 {Transaction}
//                             </Typography>
//                         </Box>
//                         <Box p={1} display="flex" justifyContent="center">
//                             <Button variant="contained" color="primary" onClick={handleClick({ value })}>
//                                 Submit
//                     </Button>
//                         </Box>
//                         <hr />
//                         <Box p={1} display="flex" justifyContent="center">
//                             <Typography variant="subtitle1">
//                                 Buying Power: $100,000.00
//                     </Typography>
//                         </Box>
//                     </form>
//                 )}
//             </div>
//         );
//     }
// }

function TabPanel({ stockData, children, value, index, ...other }) {
    const classes = useStyles();

    var Transaction = 0;
    var quantity = 0;
    function handleChange(event, price) {
        quantity = event.target.value;
        Transaction = event.target.value * price
        console.log(Transaction)
    }

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
                            {Transaction}
                        </Typography>
                    </Box>
                    <Box p={1} display="flex" justifyContent="center">
                        <Button variant="contained" color="primary"
                            onClick={(e) => {
                                handleClick(e, stockData.id, quantity);
                            }}
                        >
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
function handleClick(event, ticker, quantity) {
    BuyStocks(ticker, quantity)
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
            <TabPanel value={value} stockData={data} Tab={AppBar} index={0}>
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



function BuyStocks(ticker, quantity) {
    var options = {
        method: 'POST',
        url: 'http://localhost:8080/api/holdings/user/2',
        headers: { 'Content-Type': 'application/json' },
        data: { stockId: ticker, quantity: quantity }
    };

    axios.request(options).then(function (response) {
        console.log(response.data);
    }).catch(function (error) {
        console.error(error);
    });

}