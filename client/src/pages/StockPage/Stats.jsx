import { Card, makeStyles, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
const axios = require("axios");

const useStyles = makeStyles({
    root: {
        height: "-webkit-fill-available",
        width: "-webkit-fill-available",
        padding: "15px 15px",
    },
    title: {
        fontSize: 24,
    },
});

const Stats = () => {
    const classes = useStyles();
    const { ticker } = useParams();
    
    const [stats, setStats] = useState([]);

    useEffect(() => {

        const getStats = async () => {
            let res = await axios.get(`http://localhost:8080/api/stocks/${ticker}`);
            if (res.status === 200) {
                setStats(res.data);
                console.log(stats);
            } else {
                console.log(res.data);
            }
        }

        getStats();
    }, [])

    return (
        <Card className={classes.root} variant="outlined">
            <Typography className={classes.title} variant="h5" component="h2">
                Stats
            </Typography>
            <hr />

            <Typography variant="p">
                Open: {stats.open}
            </Typography>
            <hr />

            <Typography variant="p">
                High: {stats.high}
            </Typography>
            <hr />

            <Typography variant="p">
                Low: {stats.low}
            </Typography>
            <hr />

            <Typography variant="p">
                Close: {stats.close}
            </Typography>
            <hr />

            <Typography variant="p">
                Volume: {stats.volume}
            </Typography>
            <hr />

            <Typography variant="p">
                Market Capitalization: {stats.marketCapitalization}
            </Typography>
            <hr />

            <Typography variant="p">
                Price to Earnings Ratio: {stats.priceToEarningsRatio}
            </Typography>
            <hr />

            <Typography variant="p">
                Dividend Yield: {stats.dividendYield}%
            </Typography>
            <hr />

        </Card>
    );
};

export default Stats;
