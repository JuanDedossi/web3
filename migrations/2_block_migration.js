const block = artifacts.require("Block");
module.exports = function (deployer) {
      deployer.deploy(block);
};