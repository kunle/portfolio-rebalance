var SAMPLE_PORTFOLIO = samplePortfolio = {
    investments: [
        {
            name: "Stock 1",
            targetAllocationPercent: 10,
            actualAllocationPercent: 20,
            sharesOwned: 20,
            sharePrice: 2
        },
        {
            name: "Stock 2",
            targetAllocationPercent: 20,
            actualAllocationPercent: 10,
            sharesOwned: 10,
            sharePrice: 1
        },
        {
            name: "Stock 3",
            targetAllocationPercent: 40,
            actualAllocationPercent: 60,
            sharesOwned: 60,
            sharePrice: 1
        },
        {
            name: "Stock 4",
            targetAllocationPercent: 30,
            actualAllocationPercent: 20,
            sharesOwned: 20,
            sharePrice: 1
        }

    ]
};

var getTotalAllocationAmount = function (investments) {
    var totalAmount = 0;
    investments.forEach(function (investment) {
        loadActualAllocationAmount(investment);
        totalAmount += investment.actualAllocationAmount;
    })

    return totalAmount;
};

var loadActualAllocationAmount = function (investment) {
    investment.actualAllocationAmount = investment.sharesOwned * investment.sharePrice;
}

var validatePortfolioObject = function (portfolio) {
    if (portfolio == null || portfolio == undefined)
        return false;
    if (!portfolio.hasOwnProperty("investments") && !Array.isArray(portfolio.investments))
        return false;
    portfolio.investments.forEach(function (investment) {
        if (!investment.hasOwnProperty("name"))
            return false;
        if (!investment.hasOwnProperty("targetAllocationPercent") && isNaN(investment.targetAllocationPercent))
            return false;
        if (!investment.hasOwnProperty("sharesOwned") && isNaN(investment.sharesOwned))
            return false;
        if (!investment.hasOwnProperty("sharePrice") && isNaN(investment.sharePrice))
            return false;
    })

    return true;
}

var rebalance = function (portfolio) {
    var investments = portfolio.investments;
    portfolio.totalAmount = getTotalAllocationAmount(investments);
    investments.forEach(function (investment) {
        investment.rebalanceAllocation = portfolio.totalAmount * investment.targetAllocationPercent / 100 - investment.actualAllocationAmount;
        investment.sellShares = investment.rebalanceAllocation < 0 ? -1 * investment.rebalanceAllocation : 0;
        investment.buyShares = investment.rebalanceAllocation > 0 ? investment.rebalanceAllocation : 0;
    });
    return portfolio;
}

module.exports = {
    rebalance: rebalance,
    getTotalAllocationAmount: getTotalAllocationAmount,
    loadActualAllocationAmount: loadActualAllocationAmount,
    SAMPLE_PORTFOLIO: SAMPLE_PORTFOLIO,
    validatePortfolioObject: validatePortfolioObject


};
