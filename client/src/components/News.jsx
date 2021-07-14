import { Box, Card, Link, makeStyles, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
const axios = require("axios");
const config = require("../config.json");

const useStyles = makeStyles({
    root: {
        // height: "450px",
        minHeight: "400px",
        width: "-webkit-fill-available",
        padding: "0px 10px",
    },
    value: {
        fontSize: 24,
        paddingTop: "15px",
    },
    cardRoot: {
        // height: "75px",
        padding: "0px 5px",
        marginBottom: "5px",
    },
    title: {
        fontSize: 18,
    },
    description: {
        fontSize: 12,
    },
});

const News = ({ topic }) => {
    const classes = useStyles();

    const [stories, setStories] = useState([
        {
            author: "Tejaswi Marthi",
            content:
                "* CBA hits A$100-mark for the first time\r\n* Benchmark snaps four day winning streak\r\n* Miners lead losses, down over 1% (Updates to close)\r\nMay 26 (Reuters) - Australian stocks snapped a four-day win… [+1883 chars]",
            description:
                "Australian stocks snapped a four-day winning streak on Wednesday as heavyweight miners tracked a downturn in iron ore prices and offset gains in gold stocks, while investors remained cautious ahead of U.S. inflation data later this week.",
            publishedAt: "2021-05-26T06:40:00Z",
            source: { id: "reuters", name: "Reuters" },
            title: "Australia shares snap 4-day winning streak as miners, inflation fears weigh - Reuters",
            url: "https://www.reuters.com/article/australia-stocks-close-idUSL3N2ND1FQ",
            urlToImage:
                "https://s1.reutersmedia.net/resources_v2/images/rcom-default.png?w=800",
        },
        {
            author: "Reuters Staff",
            content:
                "By Reuters Staff\r\n(Updates prices, adds sector details)\r\nMay 26 (Reuters) - Canadas main stock index rose on Wednesday, supported by material stocks as gold prices jumped on the back of softer Treasu… [+1925 chars]",
            description:
                "Canada's main stock index rose on Wednesday, supported by material stocks as gold prices jumped on the back of softer Treasury yields after U.S. Federal Reserve officials downplayed inflation concerns.",
            publishedAt: "2021-05-26T14:08:00Z",
            source: { id: "reuters", name: "Reuters" },
            title: "CANADA STOCKS-TSX rises as gold gains lift material stocks - Reuters",
            url: "https://www.reuters.com/article/canada-stocks-idUSL3N2ND3GG",
            urlToImage:
                "https://s1.reutersmedia.net/resources_v2/images/rcom-default.png?w=800",
        },
    ]);

    useEffect(() => {
        const getNews = async () => {
            const q = topic ?? "Stocks"
            let date = new Date();
            let currentDate = date.getFullYear()+ '-' + (date.getMonth()+1) + '-' + date.getDate();
            let res = await axios.get(
                `https://newsapi.org/v2/everything?q=${q}&from=${currentDate}&sortBy=popularity&apiKey=${config.NEWS_KEY}`
            );
            if (res.status === 200) {
                // setStories([res.data.articles[0], res.data.articles[1], res.data.articles[2]]);
                setStories(res.data.articles.slice(0, 5));
            } else {
            }
            console.log(res.data.articles.slice(0, 5));
        };

        getNews();
    }, [topic]);

    return (
        <Card className={classes.root} variant="outlined">
            <Typography className={classes.value} variant="h5" component="h2">
                News
            </Typography>
            <hr />
            <Box spacing={1}>
                {stories.map((story, i) => {
                    return (
                        <Card key={i} className={classes.cardRoot} variant="outlined">
                            <Typography
                                className={classes.title}
                                variant="h5"
                                component="h2"
                            >
                                <Link target="_blank" href={story.url}> {story.title} </Link>
                            </Typography>

                            <Typography
                                className={classes.description}
                                component="h2"
                            >
                                {story.description}
                            </Typography>
                        </Card>
                    );
                })}
            </Box>
        </Card>
    );
};

export default News;
