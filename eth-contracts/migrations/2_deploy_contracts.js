// migrating the appropriate contracts
var SquareVerifier = artifacts.require("SolnSquareVerifier");
var SolnSquareVerifier = artifacts.require("CustomERC721Token");

module.exports = function(deployer) {
  deployer.deploy(SquareVerifier);
  deployer.deploy(SolnSquareVerifier);
};
