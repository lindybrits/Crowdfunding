
contract("FundingHub", function(accounts) {
	
	it("should refund contributors", function() {
		var FH = FundingHub.deployed();

		FH.createProject(accounts[1], 1000, 1483142400000)
		.then(function() {
			FH.getProjectAddrs.call()
			.then(function(addresses) {
				console.log(addresses);
				FH.getBalance.call(addresses[0])
				.then(function(balance) {
					console.log(balance.toNumber());
					/* Make a valid contribution */

					FH.contribute(addresses[0], 1482192000000, {value: 500, from: accounts[0]})
					.then(function() {

						FH.getBalance.call(addresses[0])
						.then(function(balance) {
							console.log(balance.toNumber());

							//assert.equal(500, balance.toNumber(), "Contribution unsuccessful.");
							/* Make a contribution after deadline */
							FH.contribute(addresses[0], 1482192000000, {value: 300, from: accounts[1]})
							.then(function() {
								FH.getBalance.call(addresses[0])
								.then(function(balance) {
									console.log(balance.toNumber());
								});

								FH.contribute(addresses[0], 1483164800000, {value: 300, from: accounts[1]})
								.then(function() {
									FH.getBalance.call(addresses[0])
									.then(function(balance) {
										console.log(balance.toNumber());
									});
								});
							});
						});
					});
				})
				.catch(function(err) {
					console.error(err);
				});
			});
		})
		.catch(function(err){
			console.error("Project could not be created.");
		});
		
	});

});