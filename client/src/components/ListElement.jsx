import { Card, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
    root: {
        height: "50px",
        padding: "0px 10px",
        marginBottom: "5px",
        display: "flex",
        alignItems: "center",
    },
    title: {
        fontSize: 24,
    },
});

const ListElement = ({ ticker }) => {
    const classes = useStyles();

    return (
        <Card className={classes.root} variant="outlined">
            <Typography className={classes.title} variant="h5" component="h2">
                <Link to={"/stocks/" + ticker}> {ticker} </Link>
            </Typography>
        </Card>
    );
};

export default ListElement;
