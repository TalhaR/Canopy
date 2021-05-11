const router = require('express').Router();

router.get('/:id/:date/', (req, res) => {
    const { id } = req.params;
    const { date } = req.params;
    var request = require('request');
    var options = {
        'method': 'GET',
        'url': 'https://api.polygon.io/v1/open-close/' +
            id + '/' +
            date + '?apiKey=XyfmuBbERNvdd5hY6rLmFfevKgmSGnKo&unadjusted=true',
        'headers': {}
    };
    console.log(options.url);
    request(options, function(error, response) {
        if (error) throw new Error(error);
        res.end(response.body);
    });

});
module.exports = router;