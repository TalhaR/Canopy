import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState, useEffect } from "react";
import Graph from "../../components/Graph";
import News from "../../components/News";
import Transactions from "./Transactions";
import Stats from "./Stats";
import { useParams } from "react-router";
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: 20,
    },
}));

const StockPage = () => {
    const classes = useStyles();
    const { ticker } = useParams();
    const [data, setData] = useState([]);


    useEffect(() => {
        const getData = async () => {
            let res = await axios.get("http://localhost:8080/api/stocks/" + ticker)
            res.ticker = ticker;
            if (res.status === 200) {
                // console.log(res.data);
                setData(res.data)
            } else {
                console.log(res.data);
            }
        }
        getData();
    }, []);

    return (
        <div className={classes.root}>
            <Grid container justify="center" spacing={3}>
                <Grid item xs={12} md={6}>
                    <Graph title={ticker} value={1234.56} />
              
                </Grid>

                <Grid item xs={12} sm={6} md={4} style={{display: "flex"}}>
                    <Stats />
                </Grid>

                <Grid item xs={12} md={6} style={{display: "flex"}}>
                    <News />
                </Grid>
            </Grid>
        </div>
    );
};

export default StockPage;
