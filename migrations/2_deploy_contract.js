var main = artifacts.require("./main.sol");

module.exports = function(deployer) {
  deployer.deploy(main);
};