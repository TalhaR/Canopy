import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        color: "white",
    },
    center: {
        textAlign: "center",
    },
}));

const HomePage = () => {
    const classes = useStyles();

    return (
        <Box p={5} component="section" className={classes.root}>
            <Typography variant="h1" align="center">
                Resources
            </Typography>
            <br />

            <Typography variant="h2">Definitions of Common Terms</Typography>
            <br />

            <Typography variant="h4">Stock</Typography>
            <Typography variant="h6">
                A stock (also known as equity) is a security that represents the
                ownership of a fraction of a corporation. This entitles the
                owner of the stock to a proportion of the corporation's assets
                and profits equal to how much stock they own. Units of stock are
                called "shares."
            </Typography>
            <br />

            <Typography variant="h4">Stock Market</Typography>
            <Typography variant="h6">
                The stock market refers to the collection of markets and
                exchanges where regular activities of buying, selling, and
                issuance of shares of publicly-held companies take place. Such
                financial activities are conducted through institutionalized
                formal exchanges or over-the-counter (OTC) marketplaces which
                operate under a defined set of regulations.
            </Typography>
            <br />

            <Typography variant="h4">Stock Exchange</Typography>
            <Typography variant="h6">
                A market where stock buyers connect with stock sellers. The most
                prominent exchanges include the New York Stock Exchange(NYSE),
                NASDAQ, and the Japan Exchange Group.
            </Typography>
            <br />

            <Typography variant="h4">Over-the-counter</Typography>
            <Typography variant="h6">
                Over-the-counter or off-exchange trading is done directly
                between two parties, without the supervision of an exchange. OTC
                trading is necessary for securities that do not meet the strict
                requirements to be listed on exchanges (such as having at least
                1.1 million publicly traded shares outstanding with a collective
                market value of at least $100 million for NYSE).
            </Typography>
            <br />

            <Typography variant="h4">Bull Market</Typography>
            <Typography variant="h6">
                The condition of a financial market in which securityprices are
                rising or are expected to rise. Bull markets tend to last for
                months or even years.
            </Typography>
            <br />

            <Typography variant="h4">Bear Market</Typography>
            <Typography variant="h6">
                When a market experiences prolonged price declines. It typically
                describes a condition in which securities prices fall 20% or
                more from recent highs amid widespread pessimism and negative
                investor sentiment.
            </Typography>
            <br />

            <Typography variant="h4">Bid</Typography>
            <Typography variant="h6">
                The price someone is willing to pay for a share.
            </Typography>
            <br />

            <Typography variant="h4">Ask</Typography>
            <Typography variant="h6">
                The price someone is willing to sell a share.
            </Typography>
            <br />

            <Typography variant="h4">Bid-Ask Spread</Typography>
            <Typography variant="h6">
                A bid-ask spread is the amount by which the ask price exceeds
                the bid price for an asset in the market. The bid-ask spread is
                essentially the difference between the highest price that a
                buyer is willing to pay for an asset and the lowest price that a
                seller is willing to accept. An individual looking to sell will
                receive the bid price while one looking to buy will pay the ask
                price.
            </Typography>
            <br />

            <Typography variant="h4">Market Order</Typography>
            <Typography variant="h6">
                A market order is an instruction to buy or sell a security
                immediately at the current price.
            </Typography>
            <br />

            <Typography variant="h4">Limit order</Typography>
            <Typography variant="h6">
                A limit order is an instruction to buy or sell only at a price
                specified by the investor.
            </Typography>
            <br />

            <Typography variant="h4">Volume</Typography>
            <Typography variant="h6">
                The number of shares of a security traded between its daily open
                and close. Generally the higher the volume, the more liquid a
                stock is.
            </Typography>
            <br />

            <Typography variant="h4">Liquidity</Typography>
            <Typography variant="h6">
                How rapidly shares of a stock can be bought or sold without
                substantially impacting the stock price. Stocks with low
                liquidity may be difficult to sell at the price that you want,
                as the bid-ask spread is much larger.
            </Typography>
            <br />

            <Typography variant="h4">Dividends</Typography>
            <Typography variant="h6">
                A dividend is a payment made by publicly-listed companies as a
                reward to its shareholders. Dividends may be paid out as cash or
                in th form of additional stock.
            </Typography>
            <br />

            <Typography variant="h4">Initial Public Offering (IPO)</Typography>
            <Typography variant="h6">
                An initial public offering (IPO) refers to the process of
                offering shares of a private corporation to the public in a new
                stock issuance. Public share issuance allows a company to raise
                capital from public investors.
            </Typography>
            <br />

            <Typography variant="h4">Market Capitalization</Typography>
            <Typography variant="h6">
                Market capitalization refers to the total dollar market value of
                a company's outstanding shares of stock. Commonly referred to as
                "market cap," it is calculated by multiplying the total number
                of a company's outstanding shares by the current market price of
                one share.
                <br />
                As an example, a company with 10 million shares selling for $100
                each would have a market cap of $1 billion.
            </Typography>
            <br />

            <Typography variant="h4">Shares Outstanding</Typography>
            <Typography variant="h6">
                Shares outstanding refer to a company's stock currently held by
                all its shareholders, including share blocks held by
                institutional investors and restricted shares owned by the
                company’s officers and insiders.
            </Typography>
            <br />

            <Typography variant="h4">Float</Typography>
            <Typography variant="h6">
                The number of shares available to be traded by the public. It
                can be found by subtracting the total number of closely held
                shares (by company insiders, employees, etc.) from the total
                number of outstanding shares. A company's float is an important
                number for investors because it indicates how many shares are
                actually available to be bought and sold by the general
                investing public.
            </Typography>
            <br />

            <Typography variant="h4">Exchange Traded Fund (ETF)</Typography>
            <Typography variant="h6">
                An exchange traded fund (ETF) is a type of security that tracks
                an index, sector, commodity, or other asset, but which can be
                purchased or sold on a stock exchange the same as a regular
                stock. An ETF can be structured to track anything from the price
                of an individual commodity to a large and diverse collection of
                securities.
                <br />A well-known example is the SPDR S&P 500 ETF (SPY), which
                tracks the S&P 500 Index.
            </Typography>
            <br />

            <Typography variant="h4">Index</Typography>
            <Typography variant="h6">
                An index is a method to track the performance of a group of
                assets in a standardized way. Indexes typically measure the
                performance of a basket of securities intended to replicate a
                certain area of the market. It is also commonly used by
                investors and fund managers to compare their own market
                performance.
            </Typography>
            <br />
        </Box>
    );
};

export default HomePage;
