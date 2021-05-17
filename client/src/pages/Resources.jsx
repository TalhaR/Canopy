import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        color: "white"
    },
    center: {
        textAlign: "center",
    }
}));

const HomePage = () => {
    const classes = useStyles();

    return (
        <Box p={5} component="section" className={classes.root}>
            <Typography variant="h1" align="center">
                Resources
            </Typography>

            <Typography variant="h2">
                Definitions
            </Typography>

            <Typography variant="h4">
                Stock
            </Typography>
            
            <Typography variant="body1">
                Fraction of a company that can be purchased 
            </Typography>
        
        </Box>
    );
};

export default HomePage;
