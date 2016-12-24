var accounts;
var account;

window.onload = function() {
    web3.eth.getAccounts(function(err, accs) {
        if (err != null) {
            alert("There was an error fetching your accounts.");
            return;
        }

        if (accs.length == 0) {
            alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
            return;
        }

        accounts = accs;
        account = accounts[0];

        console.log(accounts);
    });

    /* PLUGINS */

    $("#projDeadline").datepicker();
    $("#contribDate").datepicker();

    /* CLICK EVENTS */
    $("#btn_addProject").click(function () {
        var owner = $("#projOwner").val();
        var target = Number($("#projTarget").val());
        var date = $("#projDeadline").datepicker("getDate");
        var deadline = dateToUTCMilliSeconds($("#projDeadline").datepicker("getDate"));
        addProject(owner, target, deadline);
    });

    $(".navbar-btn").click(function() {
        var idClick = ($(this).attr("id")).replace("navbtn_", "");
        $(".container").each(function() {
            var idFind = $(this).attr("id");
            if (idClick == idFind) {
                $(this).addClass("active");
            } else {
                $(this).removeClass("active");
            }
        });
    });

    $("#btn_contribute").click(function() {
        var projAddr = $("#dropdownProjs").find("select").children(":selected").attr("id");
        var from = $("#contributor").val();
        var amount = $("#contribAmount").val();
        var contribDate = dateToUTCMilliSeconds($("#contribDate").datepicker("getDate"));
        contribute(projAddr, from, amount, contribDate);
    });

    $("#dropdownCamps2").change(function() {
        var campaignID = Number($("#dropdownCamps2").find("select").children(":selected").attr("id"));
        viewContributors(campaignID);
    });

    viewProjects();
}

function contribute(projAddr, fromAcc, amount, date) {
    
    FundingHub.deployed().contribute(projAddr, date, {from: fromAcc, value: amount, gas: 3000000})
    .then(function(txhash){
        console.log("Contributed.");
        viewProjects();
    })
    .catch(function(err){
        console.error(err);
    });
}

function viewContributors(campaignID) {

    Crowdfunding.deployed().getFunderIDs.call(campaignID)
    .then(function(funderIDs) {
        console.log(funderIDs);
    })
    .catch(function(err) {
        console.error(err);
    });

}

function viewProjects() {

    FundingHub.deployed().getAmounts.call()
    .then(function(amounts) {
        alert("Amounts");
        alert(amounts);
    });

    FundingHub.deployed().getProjectAddrs.call()
    .then(function(projAddresses) {
        /* Get all project information */
        var projects = [];
        for (i = 0; i < projAddresses.length; i++) {
            FundingHub.deployed().getProjectByAddr.call(projAddresses[i])
            .then(function(project) {
                project[2] = Number(project[2]);
                project[4] = Number(project[4]);
                projects.push(project);
                if (projects.length == projAddresses.length) {
                    contructProjectTable(projects);
                    contructProjectDropdown(projects);
                }
            })
            .catch(function(err) {
                console.error(err);
            });
        }
    })
    .catch( function(err) {
        console.error(err);
    });
}

function contructProjectTable(projects) {
    $("#projects").html("");

    var html = '<table>';
    html += '<tr><td>Project Address</td>';
    html += '<td>Owner Address</td>';
    html += '<td>Target</td>';
    html += '<td>Deadline</td>';
    html += '<td>Funds Raised</td></tr>';

    for (i = 0; i < projects.length; i++) {
        html += '<tr><td>' + projects[i][0] + '</td>';
        html += '<td>' + projects[i][1] + '</td>';
        html += '<td>' + projects[i][2] + '</td>';
        html += '<td>' + UTCMilliSecondsToDate(projects[i][3]) + '</td>';
        html += '<td>' + projects[i][4] + '</td></tr>';
    }

    html += '</table>';

    $("#projects").html(html);
}

function contructProjectDropdown(projects) {
    $("#dropdownCamps").html("");
    $("#dropdownCamps2").html("");

    var html = '<select>';
    html += '<option>Not specified</option>';

    for (i = 0; i < projects.length; i++) {
        html += '<option id="' + projects[i][0] + '">Campaign ID: ' + projects[i][0] + '</option>';
    }

    html += '</select>';

    $("#dropdownProjs").html(html);
    $("#dropdownProjs2").html(html);   

}

function addProject(owner, target, deadline) {
    FundingHub.deployed().createProject(
        owner, 
        target,
        deadline,
        {from: web3.eth.coinbase, gas: 3000000}
    ).then(function(txhash) {
        FundingHub.deployed().getProjectAddrs.call()
        .then(function(addresses) {
            console.log(addresses);
        })
        .catch(function(err) {
            console.error(err);
        });
        //viewCampaigns();
    })
    .catch(function(err) {
        console.error(err);
    });
}
