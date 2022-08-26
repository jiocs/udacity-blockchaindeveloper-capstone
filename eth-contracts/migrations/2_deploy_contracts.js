// migrating the appropriate contracts
var SolnSquareVerifier = artifacts.require("SolnSquareVerifier");
var CustomERC721Token = artifacts.require("CustomERC721Token");
var SquareVerifier = artifacts.require("Verifier");

module.exports = function(deployer) {
  deployer.deploy(SolnSquareVerifier);
  deployer.deploy(CustomERC721Token);
  deployer.deploy(SquareVerifier);
};
