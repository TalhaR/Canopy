import { Card, makeStyles, Typography } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles({
    root: {
        height: "450px",
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

function Graph({ title, value, increase }) {
    const classes = useStyles();

    return (
        <Card className={classes.root} variant="outlined">
            {title != null && <Typography className={classes.title} variant="h4" component="h2">
                { title }
            </Typography>}
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
