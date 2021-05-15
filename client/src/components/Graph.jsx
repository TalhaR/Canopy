import { Card, makeStyles, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import Chart from 'chart.js/auto';

const useStyles = makeStyles({
    root: {
        // height: "450px",
        paddingLeft: "15px",
        paddingTop: "15px",
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

const Graph = ({ title, value }) => {
    const classes = useStyles();

    useEffect(() => {
        // https://www.chartjs.org/docs/latest/configuration/responsive.html
        const labels = [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
            'Sunday'
        ];
        const data = {
            labels: labels,
            datasets: [{
                label: '',
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: [1000, 1050, 1033, 1150, 1200, 1234, 1234.56],
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

        // chart.canvas.style.height = '400px';

        return () => {
            chart.clear();
        }
    }, [])

    return (
        <Card className={classes.root} variant="outlined">
            {title != null && <Typography className={classes.title} variant="h4" component="h2">
                { title }
            </Typography>}
            <Typography className={classes.value} variant="h5" component="h2">
                ${value}
            </Typography>
            <hr />
            <div style={{position: "relative"}}>
                <canvas id="chart"></canvas>
            </div>
        </Card>
    );
}

export default Graph;
