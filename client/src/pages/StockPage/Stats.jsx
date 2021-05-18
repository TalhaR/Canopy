import { Card, makeStyles, Typography } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles({
    root: {
        height: "450px",
        paddingLeft: "15px",
    },
    title: {
        fontSize: 24,
        paddingTop: "15px",
    },
});

const Stats = () => {
    const classes = useStyles();

    return (
        <Card className={classes.root} variant="outlined">
            <Typography className={classes.title} variant="h5" component="h2">
                Stats
            </Typography>
            <hr />

            <Typography variant="p">
                Open
            </Typography>

        </Card>
    );
};

export default Stats;
