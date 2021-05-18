import { Box, Card, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import ListElement from "./ListElement";

const useStyles = makeStyles({
    root: {
        height: "450px",
        paddingLeft: "15px",
        paddingRight: "15px",
    },
    title: {
        fontSize: 24,
        paddingTop: "15px",
    },
});

const StockList = ({ title, stockList, quantities }) => {
    const classes = useStyles();

    console.log(quantities);

    return (
        <Card className={classes.root} variant="outlined">
            <Typography className={classes.title} variant="h5" component="h2">
                {title}
            </Typography>
            <hr />
            <Box spacing={1}>
                {quantities
                    ? stockList.map((stock, i) => {
                          return (
                              <ListElement
                                  key={i}
                                  ticker={stock}
                                  quantity={quantities[i]}
                              />
                          );
                      })
                    : stockList.map((stock, i) => {
                          return <ListElement key={i} ticker={stock} />;
                      })}
            </Box>
        </Card>
    );
};

export default StockList;
