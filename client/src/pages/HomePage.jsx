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

function HomePage() {
    const classes = useStyles();

    return (
        <main className={classes.root}>
            <Grid container justify="center" spacing={3}>
                <Grid item xs={12} md={6}>
                    <Graph />
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                    <StockList title="Portfolio" />
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                    <StockList title="Watchlist" />
                </Grid>

                <Grid item xs={12} md={6}>
                    <News />
                </Grid>
            </Grid>
        </main>
    );
}

export default HomePage;
