import { Card, makeStyles, Typography } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles({
    root: {
        height: "450px",
        paddingLeft: "15px"
    },
    title: {
        fontSize: 24,
        paddingTop: "15px",
    },
});

function StockList({ title, stocks, }) {
    const classes = useStyles();

    return (
        <Card className={classes.root} variant="outlined" >
            <Typography className={classes.title} variant="h5" component="h2">
                { title }
            </Typography>
            <hr /> 
        </Card>
    )
}

export default StockList
