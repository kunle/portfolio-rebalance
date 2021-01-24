const express = require('express');
const router = express.Router();
const portfolioManager  = require('../service/portfolioManager');

/* GET home page. */
router.get('/', function(req, res, next) {
  const titleHead = '<head><title>Kooltant Portfolio Rebalance</title></head>'
  let message = `<html>${titleHead}<body><pre>Resource available is /portfolio` + '\n';
  message += 'You can perform an action of rebalance like /portfolio?action=rebalance' + '\n';
  message +='POST /portfolio?action=rebalance with sample body below' + '\n';
  message +=JSON.stringify(portfolioManager.SAMPLE_PORTFOLIO,null,2);
  message += '</pre></body></html>'
  res.send(message);
});

module.exports = router;
