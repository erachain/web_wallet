function searchAssetOnLoad() {

}

function requestAssetById() {
    document.getElementById("assetInfo").innerHTML = "";
		var key = $("#key").val();
		var httpRequest = typeof XMLHttpRequest != 'undefined'
				? new XMLHttpRequest()
				: new ActiveXObject('Microsoft.XMLHTTP');
			var requestUrl = appData.nodeUrl + "/index/blockexplorer.json?asset=" + key + "&lang=en";
			httpRequest.open('GET', requestUrl, true);
			try {
				httpRequest.onreadystatechange = function() {
					if (this.status == 200) {
						try {
							var assetArray = JSON.parse(this.responseText)["asset"]["this"];
							//var bdate = new Date(assetArray["birthday"]);
							document.getElementById("assetInfo").innerHTML = "Name: <b>" + assetArray["name"] + "</b><br>Description: <b>" + assetArray["description"];
						} catch (e) { }
					}
				};
				httpRequest.send();
			} catch (e) { }
			var ss = '<img src="'+ appData.nodeUrl +'/api/assetimage/' + key +'" style="max-width:250px; height: AUTO;"/>';
			$("#img").html(ss);
}