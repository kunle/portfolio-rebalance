var assert = require("assert");
var portfolioManager = require("../service/portfolioManager");
var portfolio = {
    investments: [
        {
            name: "Stock 1",
            targetAllocationPercent: 10,
            actualAllocationPercent: 20,
            actualAllocationAmount: null,
            sharesOwned: 20,
            sharePrice: 2,
            rebalanceAllocation: null
        },
        {
            name: "Stock 2",
            targetAllocationPercent: 20,
            actualAllocationPercent: 10,
            actualAllocationAmount: null,
            sharesOwned: 10,
            sharePrice: 1,
            rebalanceAllocation: null
        },
        {
            name: "Stock 3",
            targetAllocationPercent: 40,
            actualAllocationPercent: 60,
            actualAllocationAmount: null,
            sharesOwned: 60,
            sharePrice: 1,
            rebalanceAllocation: null
        },
        {
            name: "Stock 4",
            targetAllocationPercent: 30,
            actualAllocationPercent: 20,
            actualAllocationAmount: null,
            sharesOwned: 20,
            sharePrice: 1,
            rebalanceAllocation: null
        }

    ]
}

describe('PortfolioManager', function () {
    describe('#validatePortfolioObject', function () {
        it('should return false when null or undefined', function () {
            var result = portfolioManager.validatePortfolioObject(null);
            var something;
            assert.equal(false, result);
            result = portfolioManager.validatePortfolioObject(something);
            assert.equal(false, result);
        });
        it('should return false when object is empty', function () {
            var result = portfolioManager.validatePortfolioObject({});
            assert.equal(false, result);
        });
        it('should return false when object is not portfolio', function () {
            var result = portfolioManager.validatePortfolioObject({name: "random object"});
            assert.equal(false, result);
        });
        it('should return true when object is valid  portfolio', function () {
            var result = portfolioManager.validatePortfolioObject(portfolio);
            assert.equal(true, result);
        });
    });

    describe('#getTotalAllocationAmount', function () {
        it('should return 130 as the total $ amount of allocation', function () {
            var totalAmount = portfolioManager.getTotalAllocationAmount(portfolio.investments);
            assert.equal(totalAmount, 130);
        });
    });

    describe('#loadActualAllocationAmount', function () {
        it('should have actual amount as 40 for stock 1', function () {
            portfolioManager.loadActualAllocationAmount(portfolio.investments[0].actualAllocationAmount);
            assert.equal(portfolio.investments[0].actualAllocationAmount, 40);
        });
        it('should have actual amount as 10 for stock 2', function () {
            portfolioManager.loadActualAllocationAmount(portfolio.investments[1].actualAllocationAmount);
            assert.equal(portfolio.investments[1].actualAllocationAmount, 10);
        });
    });

    describe('#rebalance', function () {
        before(function () {
            portfolioManager.rebalance(portfolio);
        });

        it('should have rebalance allocation as -27 for stock 1', function () {
            assert.equal(portfolio.investments[0].rebalanceAllocation, -27);
        });
        it('should have sell shares 27 for stock 1', function () {
            assert.equal(portfolio.investments[0].sellShares, 27);
        });
        it('should have rebalance allocation as 16 for stock 2', function () {
            assert.equal(portfolio.investments[1].rebalanceAllocation, 16);
        });
        it('should have buy shares 16 for stock 2', function () {
            assert.equal(portfolio.investments[1].buyShares, 16);
        });
    });
});