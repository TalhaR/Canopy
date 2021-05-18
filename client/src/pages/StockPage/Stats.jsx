import { Card, makeStyles, Typography } from "@material-ui/core";
import React from "react";

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

    return (
        <Card className={classes.root} variant="outlined">
            <Typography className={classes.title} variant="h5" component="h2">
                Stats
            </Typography>
            <hr />
        </Card>
    );
};

export default Stats;
