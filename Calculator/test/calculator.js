const Calculator = artifacts.require("Calculator");

contract("Calculator", () => {
  let contractInstance;
  // Create instance before all est cases
  before(() => {
    Calculator.deployed().then((callInstance) => {
      contractInstance = callInstance;
      console.log("Creating instance for all test cases");
    });
  });

  it("should return 10", () => {
    contractInstance.getVal.call().then((result) => {
      assert.equal(result.valueOf(), 10, "Test failed : should return 10");
    });
  });

  it("should return 23", () => {
    contractInstance.addNumber(10);
    contractInstance.subNumber(7);
    contractInstance.getVal
      .call()
      .then((result) => {
        assert.equal(result.valueOf(), 13, "Test failed : should return 13");
        contractInstance.addNumber(10);
        return contractInstance.getVal.call();
      })
      .then((result) => {
        assert.equal(result.valueOf(), 23, "Test failed : should return 23");
      });
  });
});