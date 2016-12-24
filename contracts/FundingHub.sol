
pragma solidity ^0.4.3;

import "Project.sol";

contract FundingHub {
	
	mapping (address => Project) projects;
	address[] projectAddrs;
	uint[] amounts;
	address[] addrs;
	
	function FundingHub() {
		
	}

	function () payable {

	}
	
	function createProject(address _owner, uint _target, uint _deadline) {
		Project project = new Project(_owner, _target, _deadline);
		projects[project] = project;
		projectAddrs.push(project);
	}

	function getProjectAddrs() returns (address[]) {
		return projectAddrs;
	}

	function getProjectByAddr(address _projAddr) returns (
		address projAddr,
		address owner, 
		uint target, 
		uint deadline, 
		uint256 balance) {
			return projects[_projAddr].getProjectInfo();
	}
	
	function contribute(address _projAddr, uint _date) payable {
		if (_projAddr.send(msg.value)) {
			amounts.push(msg.value);
			projects[_projAddr].fund(msg.sender, msg.value, _date);
		} 
	}

	function getAmounts() returns (uint[]) {
		return amounts;
	}

	function getBalance(address _addr) returns (uint) {
		return _addr.balance;
	}
	
}
