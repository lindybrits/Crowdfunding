
function dateToUTCMilliSeconds(date){
	var month = date.getMonth();
	if (month < 10) {
		month = "0" + month;
	}
	
	var day = date.getDate();
	var year = date.getFullYear();
	var dateUTCMilliSeconds = Date.UTC(year, month, day);
	
	return dateUTCMilliSeconds;
}

function UTCMilliSecondsToDate(milliseconds){
	var newDate = new Date(0);
	newDate.setUTCSeconds(milliseconds/1000);
		
	var day = newDate.getUTCDate();
	if (day < 10){
		day = "0" + day;
	}
	var month = newDate.getUTCMonth() + 1;
	if (month < 10){
		month = "0" + month;
	}
	var year = newDate.getUTCFullYear();
	
	return day + "/" + month + "/" + year;
}