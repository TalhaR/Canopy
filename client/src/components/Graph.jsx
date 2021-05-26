import { Card, makeStyles, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Chart from 'chart.js/auto';
const axios = require("axios");

const useStyles = makeStyles({
    root: {
        // height: "450px",
        // paddingLeft: "15px",
        // paddingTop: "15px",
        padding: "15px 15px"
    },
    title: {
        fontSize: 36,
        paddingBottom: "5px"
    },
    value: {
        fontSize: 24,
    },
    change: {}
});

const Graph = ({ title, value, history }) => {
    const classes = useStyles();

    const [chartValues, setChartValues] = useState([]);  

    useEffect(() => {
        const getStockHistory = async () => {
            let res = await axios.get("http://localhost:8080/api/stock-histories/" + title.toUpperCase())
            if (res.status === 200) {
                setChartValues(res.data);
            } else {
                console.log(res.data);
            }
        }

        // if there is a title, we need to queue stock data
        if (title !== undefined) {
            getStockHistory();
        } else {
            setChartValues(history);
        }
    }, [title, value, history])

    useEffect(() => {
        // https://www.chartjs.org/docs/latest/configuration/responsive.html
        let labels = [1,2,3,4,5,6,7]

        if (chartValues?.length) {
            if (title === undefined) {
                chartValues[6]["netWorth"] = value;
            }
            const dates = chartValues.map((e) => new Date(e["date"]))
            labels = dates.map((e) => e.toDateString().substr(0, 3))
        }

        const y_plots =
            title === undefined
                ? chartValues?.map((e) => e["netWorth"])
                : chartValues?.map((e) => e["price"]);

        const data = {
            labels: labels,
            datasets: [{
                label: '',
                backgroundColor: '#3f51b5',
                borderColor: '#3f50b5',
                data: y_plots,
            }]
        };

        const config = {
            type: 'line',
            data,
            options: {
            }
        };

        let chart = new Chart(
            document.getElementById("chart"), config
        )

        return () => {
            chart.destroy()
        }
    }, [chartValues, value, title])

    return (
        <Card className={classes.root} variant="outlined">
            {title != null && <Typography className={classes.title} variant="h4" component="h2">
                { title }
            </Typography>}
            <Typography className={classes.value} variant="h5" component="h2">
                ${value || (chartValues[6] && chartValues[6]["price"])}
            </Typography>
            <hr />
            <div style={{position: "relative"}}>
                <canvas id="chart"></canvas>
            </div>
        </Card>
    );
}

export default Graph;
