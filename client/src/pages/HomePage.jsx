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
    const [watchList, setWatchList] = useState([]);
    const [portfolioValue, setPortfolioValue] = useState(0)
    const [history, setHistory] = useState([])   

    useEffect(() => {
        const getHoldings = async () => {
            let res = await axios.get("http://localhost:8080/api/holdings/user/1")
            if (res.status === 200) {
                setHoldings(res.data.map((s) => s.ticker))
            } else {
                console.log(res.data);
            }
        }

        const getWatchList = async () => {
            let res = await axios.get("http://localhost:8080/api/watchlists/1")
            if (res.status === 200) {
                setWatchList(res.data["Watchlist"])
            } else {
                console.log(res.data);
            }
        }

        const getPortfolioValues = async () => {
            let res1 = await axios.get("http://localhost:8080/api/portfolios/1")
            let res2 = await axios.get("http://localhost:8080/api/portfolio-histories/1")
            if (res1.status === 200) {
                setPortfolioValue((Math.round(res1.data["netWorth"] * 100) / 100).toFixed(2))
                setHistory(res2.data);
            } else {
                console.log(res1.data, res2.data);
            }
        }

        getHoldings();
        getWatchList();
        getPortfolioValues()
    }, [])

    return (
        <main className={classes.root}>
            <Grid container justify="center" spacing={3}>
                <Grid item xs={12} md={6}>
                    <Graph 
                        value={portfolioValue} 
                        history={history} 
                    />
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
