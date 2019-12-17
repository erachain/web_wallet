function searchAssetOnLoad() {

}

function requestAssetById(key) {
	document.getElementById("info").innerHTML = "<div class='container'>" +
	"<div class='row'>"+
	"<div class='col-sm'>"+
	"<div style='min-height:100px;' id='assetInfo'></div>" +
	"</div>"+
	"<div class='col-sm'>"+
	"<div style='margin-top:12px;' id='img-icon'></div>"+
	"<div style='margin-top:12px;' id='img-image'></div>"+
	"</div>"+
	"</div>"+
	"</div>";
	var httpRequest = typeof XMLHttpRequest != 'undefined'
			? new XMLHttpRequest()
			: new ActiveXObject('Microsoft.XMLHTTP');
		var requestUrl = appData.nodeUrl + "/api/asset/" + key;
		httpRequest.open('GET', requestUrl, true);
		httpRequest.onreadystatechange = function() {
			if (httpRequest.readyState === XMLHttpRequest.DONE && this.status === 200) {
				var assetArray = JSON.parse(this.responseText);//["asset"]["this"];
				var divisible = "No";
				if ( assetArray["divisible"] == true ) {
					divisible = "Yes";
				}
				var descriptionFormatted =  assetArray["description"];
				if ( /^#.*/.test(descriptionFormatted) ) {
					if ( /^#\n.*/.test(descriptionFormatted) ) {
						descriptionFormatted = descriptionFormatted.substring(2);
					}
					descriptionFormatted = marked(descriptionFormatted);
				}
				document.getElementById("assetInfo").innerHTML = "<br><b>Name</b>: " + assetArray["name"] + "<br><br>" +
					"<b>Creator</b>: <a href=http://erachain.org:9067/index/blockexplorer.html?address=" + assetArray["creator"] + " target=_blank>" + assetArray["creator"] + "</a><br><br>" +
					"<b>Description</b>:<br> " + descriptionFormatted + "<br><br>" +
					"<b>Divisible</b>: " + divisible + "<br><br>" +
					"<b>Quantity</b>: " + assetArray["quantity"] + "<br><br>" + 
					"<a href=" + appData.nodeUrl + "/index/blockexplorer.html?top=allnotzero&asset=" + key + " target=_blank>Holders</a>";

				getAssetImage(key, 'icon');
				getAssetImage(key, 'image');
			}
		};
		httpRequest.send();
	}

function requestAssetByName(value) {
	document.getElementById("info").innerHTML = "<div style='min-height:100px;' id='assetInfo'></div>";
	var httpRequest = typeof XMLHttpRequest != 'undefined'
		? new XMLHttpRequest()
		: new ActiveXObject('Microsoft.XMLHTTP');
	var requestUrl = appData.nodeUrl + "/api/assetsfilter/" + value;
	httpRequest.open('GET', requestUrl, true);
	httpRequest.onreadystatechange = function() {
		if ( httpRequest.readyState === XMLHttpRequest.DONE && this.status === 200 ) {
			var assetList = JSON.parse(this.responseText);
			var assetListHtml = "<table class='table'><thead><tr><th>Asset key</th><th>Asset name</th></tr></thead><tbody>";
			for (var key in assetList) {
				assetListHtml = assetListHtml + "<tr><td><a href=# onclick=\"appData.requestAsset('" + assetList[key]["key"] + "')\">" + assetList[key]["key"] + "</td><td>" + assetList[key]["name"] + "</td></tr>";
			}
			assetListHtml = assetListHtml + "</tbody></table>";
			document.getElementById("assetInfo").innerHTML = assetListHtml;
		}
	};
	httpRequest.send();
}

function getAssetImage(key, type) {
	let ss = '<img src="'+ appData.nodeUrl + "/api/asset" + type + "/" + key+'" ' +
		'style="max-width:250px; height: AUTO;" ' +
		'onerror="this.style.display=\'none\'"' +
		'/>';
	$("#img-" + type).html(ss);
}