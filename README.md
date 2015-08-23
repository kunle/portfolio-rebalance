# Portfolio rebalance

This is a webservice that reblances your portfolio.

The web resource available is ```/portfolio ```
You can perform a rebalance action on your portfolio like ```/portfolio?action=rebalance```

To rebalance your portfolio a post request like so:
```
POST /portfolio?action=rebalance
{
  "investments": [
    {
      "name": "Stock 1",
      "targetAllocationPercent": 10,
      "actualAllocationPercent": 20,
      "sharesOwned": 20,
      "sharePrice": 2
    },
    {
      "name": "Stock 2",
      "targetAllocationPercent": 20,
      "actualAllocationPercent": 10,
      "sharesOwned": 10,
      "sharePrice": 1
    },
    {
      "name": "Stock 3",
      "targetAllocationPercent": 40,
      "actualAllocationPercent": 60,
      "sharesOwned": 60,
      "sharePrice": 1
    },
    {
      "name": "Stock 4",
      "targetAllocationPercent": 30,
      "actualAllocationPercent": 20,
      "sharesOwned": 20,
      "sharePrice": 1
    }
  ]
}
```
### Tech stack
* [node.js] - evented I/O for the backend
* [Express] - fast node.js network app framework
* [Mocha] - Javascript testing framework

### Installation/setup

Install nodejs (https://nodejs.org/)

Clone this repo ```https://github.com/kunle/portfolio-rebalnce.git```

in the folder with source do the following to download all the dependencies
```
$ npm install
```
to run the tests, you will need to install mocha
```
$ npm install mocha -g
```
to run the tests

```
$ mocha test
```

sample test output
```
 #validatePortfolioObject
   √ should return false when null or undefined
   √ should return false when object is empty
   √ should return false when object is not portfolio
   √ should return true when object is valid  portfolio
 #getTotalAllocationAmount
   √ should return 130 as the total $ amount of allocation
 #loadActualAllocationAmount
   √ should have actual amount as 40 for stock 1
   √ should have actual amount as 10 for stock 2
 #rebalance
   √ should have rebalance allocation as -27 for stock 1
   √ should have sell shares 27 for stock 1
   √ should have rebalance allocation as 16 for stock 2
   √ should have buy shares 16 for stock 2

11 passing (17ms)
```

to start the app which would be hosted on ```localhost:3000```

```
$ npm start
```

### Why nodejs
I decided to implement the solution as a REST webservice in nodejs. I chose nodejs because I wanted to be able to spin up something quickly and really just focus on solving the problem, nodejs stays out of your way in terms of environment setup and plumbing, serving a REST service could not be easier in nodejs. I considered Java (rest webservice or command line app), but considering the time frame(few hours) and problem not being complex I went with nodejs. I also considered excel but it would have been too easy and will not serve the purpose.


