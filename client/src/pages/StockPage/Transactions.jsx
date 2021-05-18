import React from "react";
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

function TabPanel({ children, value, index, ...other }) {
    const classes = useStyles();

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
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="outlined"
                            required={true}
                        />
                    </Box>
                    <Box p={1} display="flex" alignItems="center">
                        <Typography variant="body1">
                            Market Price: 
                        </Typography>
                        <Typography variant="h6" >
                            $123.45
                        </Typography>
                    </Box>
                    <hr />
                    <Box p={1} display="flex" alignItems="center">
                        <Typography variant="body1">
                            Transaction { value === 0 ? "Cost" : "Credit"}: 
                        </Typography>
                        <Typography variant="h6" >
                            $123.45
                        </Typography>
                    </Box>
                    <Box p={1} display="flex" justifyContent="center">
                        <Button variant="contained" color="primary">
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
