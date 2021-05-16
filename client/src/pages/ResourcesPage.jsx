import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import Graph from "../components/Graph";
import News from "../components/News";
import StockList from "../components/StockList";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: 20,
    },
}));

const HomePage = () => {
    const classes = useStyles();

    return (
        <main className={classes.root}>
            <Grid container justify="center" spacing={3}>
            </Grid>
        </main>
    );
};

export default HomePage;
