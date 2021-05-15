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
    const [holdings, setHoldings] = useState([]);

    useEffect(() => {
        const getHoldings = async () => {
            let res = await axios.get("http://localhost:8080/api/holdings/user/1")
            if (res.status === 200) {
                const stockIds = res.data.map((obj, i ) => {
                    return obj["stockId"];
                })
                
            }
            console.log(res.data);
        }

        getHoldings();
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
                        stockList={["VOO", "MSFT", "SPY"]}
                    />
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                    <StockList
                        title="Watchlist"
                        stockList={["GME", "COIN", "RBLX"]}
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
