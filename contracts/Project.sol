
pragma solidity ^0.4.3;

contract Project {

	ProjectInfo projectInfo;

	address[] contributors;
	mapping (address => Contribution) contributions;
	
	uint raised;

	event refundHasBeenMade(address indexed contributor);
	event payoutHasBeenMade(address indexed owner);

	function () payable {

	}

	struct ProjectInfo {
		address owner;
		uint target;
		uint deadline;
	} 				

	struct Contribution {
		address contributor;
		uint contribution;
		uint date;
	}	
	
	function Project(address _owner, uint _target, uint _deadline) {
		projectInfo.owner = _owner;
		projectInfo.target = _target;
		projectInfo.deadline = _deadline;
		raised = 0;
	}
	
	function getProjectInfo() returns (
		address project,
		address owner, 
		uint target, 
		uint deadline, 
		uint balance) {
			return (
				this,
				projectInfo.owner, 
				projectInfo.target, 
				projectInfo.deadline, 
				this.balance
			);
	}
	
	function fund(address _from, uint _amount, uint _date) {
		
		contributors.push(_from);
		contributions[_from].contributor = _from;
		contributions[_from].contribution = _amount;
		contributions[_from].date = _date;
		raised += _amount;

		if (_date > projectInfo.deadline) {
			/* Deadline passed, target not reached */
			refund();
		}
		else if ((_date < projectInfo.deadline) && (raised >= projectInfo.target)) {
			/* Before deadline, target is reached */
			payout();
		}
		
	}
	
	function payout() {
		uint ref = raised - projectInfo.target;
		address lastContributed = contributors[contributors.length - 1];
		if (lastContributed.send(ref)) {
			refundHasBeenMade(lastContributed);
		}
		if (projectInfo.owner.send(projectInfo.target)) {
			payoutHasBeenMade(projectInfo.owner);
		}
	}
	
	function refund() {
		for (uint index = 0; index < contributors.length; index++) {
			address contributor = contributors[index];
			uint contribution = contributions[contributor].contribution;
			if (contributor.send(contribution)) {
				refundHasBeenMade(contributor);
			}
		}
	}
	

}
