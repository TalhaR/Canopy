import { Card, makeStyles, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
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

const Stats = ({ ticker }) => {
    const classes = useStyles();
    const [stats, setStats] = useState([]);

    useEffect(() => {
        const getStats = async () => {
            let res = await axios.get(`http://localhost:8080/api/stocks/${ticker}`);
            if (res.status === 200) {
                setStats(res.data);
            } else {
                console.log(res.data);
            }
        }

        getStats();
    }, [ticker])

    return (
        <Card className={classes.root} variant="outlined">
            <Typography className={classes.title} variant="h5" component="h2">
                Stats
            </Typography>
            <hr />

            <Typography component="p">
                Open: {stats.open}
            </Typography>
            <hr />

            <Typography component="p">
                High: {stats.high}
            </Typography>
            <hr />

            <Typography component="p">
                Low: {stats.low}
            </Typography>
            <hr />

            <Typography component="p">
                Close: {stats.close}
            </Typography>
            <hr />

            <Typography component="p">
                Volume: {stats.volume}
            </Typography>
            <hr />

            <Typography component="p">
                Market Capitalization: {stats.marketCapitalization}
            </Typography>
            <hr />

            <Typography component="p">
                Price to Earnings Ratio: {stats.priceToEarningsRatio}
            </Typography>
            <hr />

            <Typography component="p">
                Dividend Yield: {stats.dividendYield}%
            </Typography>
            <hr />
        </Card>
    );
};

export default Stats;
