var express = require('express');
var router = express.Router();
var portfolioManager  = require('../service/portfolioManager');


router.get('/', function(req, res, next) {
    res.sendStatus(400);
});
router.post('/', function(req, res, next) {
    var action = null;
    var portfolio = req.body;
    action = req.param("action");
    if (action == null || action == undefined) {
        res.status(400);
        res.send("Please specify an action to perform on the incoming portfolio. example ?action=rebalance");
    } else if(action != "rebalance"){
        res.status(400);
        res.send("unsupported action '" + action + "'");
    }
    else if(portfolio == null || !portfolioManager.validatePortfolioObject(portfolio)){
        res.status(400);
        res.send("Please send a valid portfolio example:" + JSON.stringify(portfolioManager.SAMPLE_PORTFOLIO,null,2));
    }
    else {
        portfolioManager.rebalance(portfolio);
        var message = "";
        portfolio.investments.forEach(function(investment, index){
            if(investment.buyShares > 0){
                message+= "Buy " + investment.buyShares + " shares of " + investment.name;
            }
            if(investment.sellShares > 0){
                message+= "Sell " + investment.sellShares + " shares of " + investment.name;
            }

            if(index < portfolio.investments.length-1)
                message +=", ";
        });
        res.send(message);
    }
});

module.exports = router;
