import { Card, makeStyles, Typography } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles({
    root: {
        height: "450px",
        paddingLeft: "15px",
    },
    value: {
        fontSize: 24,
        paddingTop: "15px",
    },
    change: {},
});

function News() {
    const classes = useStyles();

    return (
        <Card className={classes.root} variant="outlined">
            <Typography className={classes.value} variant="h5" component="h2">
                News
            </Typography>
            <hr />
        </Card>
    );
}

export default News;
