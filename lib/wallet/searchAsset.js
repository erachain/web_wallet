function searchAssetOnLoad() {

}

function requestAssetById() {
    document.getElementById("assetInfo").innerHTML = "";
		var key = $("#key").val();
		var httpRequest = typeof XMLHttpRequest != 'undefined'
				? new XMLHttpRequest()
				: new ActiveXObject('Microsoft.XMLHTTP');
			var requestUrl = appData.nodeUrl + "/api/asset/" + key;
			httpRequest.open('GET', requestUrl, true);
			try {
				httpRequest.onreadystatechange = function() {
					if (this.status == 200) {
						try {
							var assetArray = JSON.parse(this.responseText);//["asset"]["this"];
							var divisible = "No";
							if ( assetArray["divisible"] == true ) {
								divisible = "Yes";
							}
							document.getElementById("assetInfo").innerHTML = "<br><b>Name</b>: " + assetArray["name"] + "<br><br>" +
								"<b>Creator</b>: <a href=http://datachain.world:9067/index/blockexplorer.html?addr=" + assetArray["creator"] + " target=_blank>" + assetArray["creator"] + "</a><br><br>" +
								"<b>Description</b>:<br> " + assetArray["description"] + "<br><br>" +
								"<b>Divisible</b>: " + divisible + "<br><br>" +
								"<b>Quantity</b>: " + assetArray["quantity"] + "<br><br>" + 
								"<a href=" + appData.nodeUrl + "/index/blockexplorer.html?top=allnotzero&asset=" + key + " target=_blank>Holders</a>";
						} catch (e) { 
							document.getElementById("assetInfo").innerHTML = "Error occured.";
						}
					}
				};
				httpRequest.send();
			} catch (e) { }
			var ss = '<img src="'+ appData.nodeUrl +'/api/assetimage/' + key +'" style="max-width:250px; height: AUTO;"/>';
			$("#img").html(ss);
}