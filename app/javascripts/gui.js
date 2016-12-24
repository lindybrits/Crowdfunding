

function updateGUI() {
	getProjects();
	
	var interval = setInterval(checkIfProjectsLoaded, 100);
	
	function checkIfProjectsLoaded() {
		if ((projOwners.length == projsInfo.length) && (projOwners.length > 0)) {
			clearInterval(interval);
			
			var tableHTML = '<table><tr><td>Owner Address</td><td>Project Target</td><td>Project Deadline</td><td>Project Funds</td></tr>';
			var selectHTML = "";
			
			for (i = 0; i < projOwners.length; i++) {
				tableHTML += '<tr><td>' + projsInfo[i][0] + '</td><td>' + projsInfo[i][1] + '</td><td>' + projsInfo[i][2] + '</td><td>' + projsInfo[i][3] + '</td></tr>';
				selectHTML += '<option id="' + projsInfo[i][0] + '">Owner Address: ' + projsInfo[i][0] + '</option>';
			}
			
			tableHTML += '</table>';
			
			$("#projectsTable").html(tableHTML);
			$("#projects").html(selectHTML);
		}
	}
}

window.onload = function() {

	/* UPDATE GUI */
	updateGUI();
	
	getHubAddress();
	
	
	
	/* INITIALIZE EVENTS AND PLUGINS */
	$("#deadline").datepicker();
	
	$("#btnProj").click(function(){
		var owner = $("#owner").val();
		var target = Number($("#target").val());
		var deadline = Number(dateToUTCMilliSeconds($("#deadline").datepicker("getDate")));
		
		createProject(owner, target, deadline);
	});
	
	$("#btnContribute").click(function(){
		var owner = $("#projects").children(":selected").attr("id");
		var from = $("#from").val();
		var amount = $("#amount").val();
		
		contributeToProject(owner, from, amount);
	});
	
	$("#btnProjAddr").click(function(){
	
		var owner = $("#addrOwner").val();
		
		FundingHub.deployed().getProjectAddress.call(owner)
		.then(function(addr){
			alert(addr);
		})
		.catch(function(e){
			console.log(e);
		});
	});
	
	$("#btnAddrBalance").click(function(){
		var addr = $("#addr").val();
		
		FundingHub.deployed().getBalance.call(addr)
		.then(function(balance){
			alert(balance);
		})
		.catch(function(e){
			console.log(e);
		});
	});
}
