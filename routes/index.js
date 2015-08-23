var express = require('express');
var router = express.Router();
var portfolioManager  = require('../service/portfolioManager');

/* GET home page. */
router.get('/', function(req, res, next) {
    var message = "Resource available is /portfolio" + "\n";
    message += "You can perform an action of rebalance like /portfolio?action=rebalance" + "\n";
    message +="POST /portfolio?action=rebalance with sample body below" + "\n";
    message +=JSON.stringify(portfolioManager.SAMPLE_PORTFOLIO,null,2);
  res.send(message);
});

module.exports = router;
