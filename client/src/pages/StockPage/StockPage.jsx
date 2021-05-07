import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";

import Graph from "../../components/Graph";
import News from "../../components/News";
import Transactions from "./Transactions";
import Stats from "./Stats";
import { useParams } from "react-router";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: 20,
    },
}));

const StockPage = () => {
    const classes = useStyles();
    const { ticker } = useParams();

    return (
        <div className={classes.root}>
            <Grid container justify="center" spacing={3}>
                <Grid item xs={12} md={6}>
                    <Graph title={ticker} />
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                    <Transactions />
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                    <Stats />
                </Grid>

                <Grid item xs={12} md={6}>
                    <News />
                </Grid>
            </Grid>
        </div>
    );
};

export default StockPage;
