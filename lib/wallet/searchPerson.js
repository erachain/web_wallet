function searchPersonOnLoad() {

}

function requestPersonById(key) {
	document.getElementById("info").innerHTML = "<div class='container'>" +
	"<div class='row'>"+
	"<div class='col-sm'>"+
	"<div style='min-height:100px;' id='personInfo'></div>" +
	"</div>"+
	"<div class='col-sm'>"+
	"<div style='margin-top:12px;' id='img'></div>"+
	"</div>"+
	"</div>"+
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
				document.getElementById("personInfo").innerHTML = 
						"<br><b>Name</b>: <a href=" + appData.nodeUrl + "/index/blockexplorer.html?person=" + personArray["key"] + " target=_blank>" + personArray["name"] + "</a><br><br>" +
						"<b>Birthday</b>: " + bdate.toLocaleString("ru", options) + "<br><br>" +
						"<b>Creator</b>: <a href=" + appData.nodeUrl + "/index/blockexplorer.html?addr=" + personArray["creator"] + " target=_blank>" + personArray["creator"] + "</a><br><br>" +
						"<b>Description</b>:<br> " + descriptionFormatted + "<br><br>" +
						"<b>Gender</b>: " + gender + "<br><br>";
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