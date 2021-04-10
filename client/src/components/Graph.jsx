import { Card, makeStyles, Typography } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles({
    root: {
        height: "400px",
        paddingLeft: "15px"
    },
    value: {
        fontSize: 24,
        paddingTop: "15px"
    },
    change: {}
});

function Graph() {
    const classes = useStyles();

    return (
        <Card className={classes.root} variant="outlined">
            <Typography className={classes.value} variant="h5" component="h2">
                $1234.56
            </Typography>
            <Typography className={classes.change} variant="subtitle2" >
                +123.45 (10%) Today
            </Typography>
            <hr />
        </Card>
    );
}

export default Graph;
