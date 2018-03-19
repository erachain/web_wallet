function searchPersonOnLoad() {

}

function requestSearchPersonById() {
    document.getElementById("personInfo").innerHTML = "";
        var key = $("#key").val();
        console.log(key);
		var httpRequest = typeof XMLHttpRequest != 'undefined'
				? new XMLHttpRequest()
				: new ActiveXObject('Microsoft.XMLHTTP');
			var requestUrl = appData.nodeUrl + "/api/person/" + key;
			httpRequest.open('GET', requestUrl, true);
			try {
				httpRequest.onreadystatechange = function() {
					if (this.status == 200) {
						try {
							var personArray = JSON.parse(this.responseText);//["asset"]["this"];
							//var bdate = new Date(assetArray["birthday"]);
							var  gender = "Female";
							if ( personArray["gender"] == 0 ) {
								gender = "Man";
                            }
                            console.log(personArray["gender"]);
                            var bdate = new Date(personArray["birthday"]);
							document.getElementById("personInfo").innerHTML = "<br><b>Name</b>: " + personArray["name"] + "<br><br>" +
								"<b>Birthday</b>: " + bdate.getDate() + "-" + bdate.getMonth() + "-" + bdate.getFullYear() + "<br><br>" +
                                "<b>Creator</b>: <a href=http://datachain.world:9067/index/blockexplorer.html?addr=" + personArray["creator"] + " target=_blank>" + personArray["creator"] + "</a><br><br>" +
                                "<b>Description</b>:<br> " + personArray["description"] + "<br><br>" +
								"<b>Gender</b>: " + gender + "<br><br>";
						} catch (e) { 
							document.getElementById("personInfo").innerHTML = "Error occured.";
						}
					}
				};
				httpRequest.send();
			} catch (e) { }
			var ss = '<img src="'+ appData.nodeUrl +'/index/personimage?key=' + key +'" style="max-width:250px; height: AUTO;"/>';
			$("#img").html(ss);
}