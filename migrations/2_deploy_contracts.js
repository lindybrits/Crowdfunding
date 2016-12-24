module.exports = function(deployer) {
	deployer.deploy(FundingHub, {gas: 3000000});
	//deployer.deploy(Project, {from: web3.eth.coinbase, gas: 3000000});
};
