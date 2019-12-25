function searchPersonOnLoad() {

}

function requestPersonById(key) {
	document.getElementById("info").innerHTML = "<div class='container'>" +
	"<div class='row'>"+
		"<div class='col-sm-3' style='display: flex;align-items: center;justify-content: center'>"+
		"<div style='margin-top:12px;' id='img'></div>"+
		"</div>"+
		"<div class='col-sm-9'>"+
		"<div style='min-height:100px;' id='personInfo'></div>" +
		"</div>"+
		"</div>"+
	"</div>" +
	"<div class='row'>" +
		"<div class='col-sm' id='personExtendedInfo'>" +
		"</div>" +
	"</div>";
	var httpRequest = typeof XMLHttpRequest != 'undefined'
			? new XMLHttpRequest()
			: new ActiveXObject('Microsoft.XMLHTTP');
		var requestUrl = appData.nodeUrl + "/api/person/" + key;
		httpRequest.open('GET', requestUrl, true);
		httpRequest.onreadystatechange = function() {
			if (httpRequest.readyState === XMLHttpRequest.DONE && this.status === 200) {
				var personArray = JSON.parse(this.responseText);
				var  gender = "Female";
				if ( personArray["gender"] == 0 ) {
					gender = "Man";
				}
				var currentDate = new Date();
				tzOffset = currentDate.getTimezoneOffset() * 60000;
				var bdate = new Date(personArray["birthday"]);// + tzOffset
				var descriptionFormatted = personArray["description"];
				if ( /^#.*/.test(descriptionFormatted) ) {
					if ( /^#\n.*/.test(descriptionFormatted) ) {
						descriptionFormatted = descriptionFormatted.substring(2);
					}
					descriptionFormatted = marked(descriptionFormatted);
				}
				var options = {
					// era: 'long',
					year: 'numeric',
					month: 'numeric',
					day: 'numeric',
					// weekday: 'long',
					timezone: 'UTC',
					hour: 'numeric',
					minute: 'numeric',
					second: 'numeric'
				};

				let explorerPerson = requestExplorerPerson(personArray["key"]);
				let htmlPersonInfo = "<table class='person-table-info mail-table'>" +
					"<tr><td>Name</td><td><a href=" + appData.nodeUrl + "/index/blockexplorer.html?person=" + personArray["key"] + " target=_blank>" + personArray["name"] + "</a></td></tr>" +
					"<tr><td>Creator</td><td><a href=" + appData.nodeUrl + "/index/blockexplorer.html?address=" + personArray["creator"] + " target=_blank>" + personArray["creator"] + "</a></td></tr>" +
					"<tr><td>Birthday</td><td>" + bdate.toLocaleString("ru", options) + "</td></tr>" +
					"<tr><td>Gender</td><td>" + gender + "</td></tr>" +
					"<tr><td>Description</td><td>" + descriptionFormatted + "</td></tr>" +
					"</table>";

				if(explorerPerson.compu_balance !== undefined){
					htmlPersonInfo += "<div class='person-balances'>" +
						"<p>ERA: A:"+explorerPerson.era_balance_a+" B:"+explorerPerson.era_balance_b+" C:"+explorerPerson.era_balance_c+"</p>" +
						"<p>COMPU: "+explorerPerson.compu_balance+"</p>" +
						"<p>Registered: "+explorerPerson.lia_balance_a+", Certified: "+explorerPerson.lia_balance_b+"</p>" +
						"</div>";
				}

				document.getElementById("personInfo").innerHTML = htmlPersonInfo;

				let htmlExtendedPersonInfo = '';

				if(explorerPerson.statuses !== undefined && explorerPerson.statuses[0] !== undefined){
					htmlExtendedPersonInfo += "<p><strong>Statuses:</strong></p>"+
						"<table class='mail-table'>" +
						"<tr>" +
						"<th>Status</th>" +
						"<th>Period</th>" +
						"<th>Creator</th>" +
						"</tr>";
					Object.keys(explorerPerson.statuses).map(function (key, index) {
						let object = explorerPerson.statuses[key];

						htmlExtendedPersonInfo += "<tr>" +
							"<td><a href='"+ appData.nodeUrl +"/index/blockexplorer.html?person=" + personArray["key"] + "&status=" + object.status_key + "&lang=en' target='_blank'>" + object.status_name + "</a></td>" +
							"<td>" + object.status_period + "</td>" +
							"<td><a href='"+ appData.nodeUrl +"/index/blockexplorer.html?address=" + object.status_creator_address + "&lang=en' target='_blank'>" + object.status_creator + "</a></td>" +
							"</tr>";
					});
					htmlExtendedPersonInfo += "</table>";
				}

				if(explorerPerson.accounts !== undefined && explorerPerson.accounts[0] !== undefined){
					htmlExtendedPersonInfo += "<p><strong>Accounts:</strong></p>"+
						"<table class='mail-table'>" +
						"<tr>" +
						"<th>Address</th>" +
						"<th>Till date</th>" +
						"<th>Creator</th>" +
						"</tr>";
					Object.keys(explorerPerson.accounts).map(function (key, index) {
						let object = explorerPerson.accounts[key];

						htmlExtendedPersonInfo += "<tr>" +
							"<td><a href='"+ appData.nodeUrl +"/index/blockexplorer.html?address=" + object.address + "&lang=en' target='_blank'>" + object.address + "</a></td>" +
							"<td>" + new Date(object.to_date).toLocaleString('en-US', { hour12: false }) + "</td>" +
							"<td><a href='"+ appData.nodeUrl +"/index/blockexplorer.html?address=" + object.creator_address + "&lang=en' target='_blank'>" + object.creator + "</a></td>" +
							"</tr>";
					});
					htmlExtendedPersonInfo += "</table>";
				}

				if(explorerPerson.My_Persons !== undefined && explorerPerson.My_Persons[0] !== undefined){
					htmlExtendedPersonInfo += "<p><strong>My Person:</strong></p>"+
						"<table class='mail-table'>" +
						"<tr>" +
						"<th>Key</th>" +
						"<th>Creation Date</th>" +
						"<th>Name</th>" +
						"</tr>";
					Object.keys(explorerPerson.My_Persons).map(function (key, index) {
						let object = explorerPerson.My_Persons[key];

						htmlExtendedPersonInfo += "<tr>" +
							"<td>" + object.key + "</td>" +
							"<td>" + new Date(object.timestamp).toLocaleString('en-US', { hour12: false }) + "</td>" +
							"<td><a href='"+ appData.nodeUrl +"/index/blockexplorer.html?person=" + object.key + "&lang=en' target='_blank'>" + object.name + "</a></td>" +
							"</tr>";
					});
					htmlExtendedPersonInfo += "</table>";
				}
				document.getElementById("personExtendedInfo").innerHTML = htmlExtendedPersonInfo;
			}
		};
		httpRequest.send();
		var ss = '<img src="'+ appData.nodeUrl +'/api/personimage/' + key +'" style="max-width:250px; height: AUTO;"/>';
		$("#img").html(ss);
	}

function requestPersonByName(value) {
	document.getElementById("info").innerHTML = "<div style='min-height:100px;' id='personInfo'></div>";	
	var httpRequest = typeof XMLHttpRequest != 'undefined'
		? new XMLHttpRequest()
		: new ActiveXObject('Microsoft.XMLHTTP');
	var requestUrl = appData.nodeUrl + "/api/personsfilter/" + value;
	httpRequest.open('GET', requestUrl, true);
	httpRequest.onreadystatechange = function() {
		if ( httpRequest.readyState === XMLHttpRequest.DONE && this.status === 200 ) {
			var personList = JSON.parse(this.responseText);
			var personListHtml = "<table class='table'><thead><tr><th>Person key</th><th>Person name</th></tr></thead><tbody>";
			for (var key in personList) {
				personListHtml = personListHtml + "<tr><td><a href=# onclick=\"appData.requestPerson('" + personList[key]["key"] + "')\">" + personList[key]["key"] + "</td><td>" + personList[key]["name"] + "</td></tr>";
			}
			personListHtml = personListHtml + "</tbody></table>";
			document.getElementById("personInfo").innerHTML = personListHtml;
		}
	};
	httpRequest.send();
}

function requestExplorerPerson(key) {
	try {
		var httpRequestName = typeof XMLHttpRequest != 'undefined'
			? new XMLHttpRequest()
			: new ActiveXObject('Microsoft.XMLHTTP');
		var requestNameUrl = appData.nodeUrl + "/index/blockexplorer.json?person=" + key;
		httpRequestName.open('GET',requestNameUrl, false);
		httpRequestName.send();

		return JSON.parse(httpRequestName.responseText);
	} catch (e) {
	}
}