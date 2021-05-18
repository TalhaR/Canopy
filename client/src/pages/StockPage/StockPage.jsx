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
    // const data = fetch('http://localhost:8080/api/stocks/GME')
    //     .then(response => response.json());

    useEffect(() => {
        const getData = async () => {
            let res = await axios.get("http://localhost:8080/api/stocks/GME")
            if (res.status === 200) {
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

                <Grid item xs={12} sm={6} md={4}>
                    <Transactions data={data} />
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
