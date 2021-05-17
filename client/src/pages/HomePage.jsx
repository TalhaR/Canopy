import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import Graph from "../components/Graph";
import News from "../components/News";
import StockList from "../components/StockList";
const axios = require("axios");

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: 20,
    },
}));

const HomePage = () => {
    const classes = useStyles();
    const [holdings, setHoldings] = useState(["VOO", "SPY", "MSFT"]);
    const [watchList, setWatchList] = useState(["GME", "RBLX", "COIN"]);

    useEffect(() => {
        const getHoldings = async () => {
            let res = await axios.get("http://localhost:8080/api/holdings/user/1")
            if (res.status === 200) {
                setHoldings(res.data.map((s) => s.ticker))
            }
            console.log(res.data);
        }

        const getWatchList = async () => {
            let res = await axios.get("http://localhost:8080/api/watchlist/user/1")
            if (res.status === 200) {
                setWatchList(res.data.map((s) => s.ticker))
            }
            console.log(res.data);
        }

        getHoldings();
        // getWatchList();
    }, [])

    return (
        <main className={classes.root}>
            <Grid container justify="center" spacing={3}>
                <Grid item xs={12} md={6}>
                    <Graph value={1234.56} />
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                    <StockList
                        title="Portfolio"
                        stockList={holdings}
                    />
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                    <StockList
                        title="Watchlist"
                        stockList={watchList}
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <News />
                </Grid>
            </Grid>
        </main>
    );
};

export default HomePage;
