var casheTimestamp = '';
var casheFee = '';
var casheAmount = '';

function orderCreateDoUpdate() 	{
	$('#base58SenderAccountAddress').html(appData.base58AccountAddress);
}

function orderCreateDoPaymentTransaction() {
	var timestamp = parseInt(doNowTime());
	var have_asset = $('#haveasset').val();     // 1
	var want_asset = $('#wantasset').val();     // 2
	var have_ammount = $('#haveammount').val(); //9876.54321;
	var want_ammount = $('#wantammount').val(); // 1234.567890;
	var port = appData.getUrlPort();
	$("#txRaw").val(Base58.encode(Create_Order(appData.keyPair, timestamp, have_asset, want_asset, have_ammount, want_ammount, port)));
	askPOSTProcess();
}

function orderCreateOnLoad(params)
{
    $("#base58SenderAccountAddress").val(appData.base58AccountAddress);
	$("#nodeUrl").val(appData.nodeUrl);
	$("#port").val(appData.getUrlPort());

	if(params !== null){
		$("#haveasset").val(params);
		$("#wantasset, #haveammount, #wantammount").val('');

		sendAssetDoUpdate("haveasset");
	}
}

function requestOrderbook() {
    //document.getElementById("orderbook").innerHTML = "";
    var httpRequest = typeof XMLHttpRequest != 'undefined'
            ? new XMLHttpRequest()
			: new ActiveXObject('Microsoft.XMLHTTP');
		var have_asset = $('#haveasset').val();     // 1
		var want_asset = $('#wantasset').val();     // 2
        var requestUrl = appData.nodeUrl + "/apiexchange/orders/" + have_asset + "/" + want_asset + "?limit=50";
        httpRequest.open('GET', requestUrl, true);
        try {
            httpRequest.onreadystatechange = function() {
                if (httpRequest.readyState === XMLHttpRequest.DONE && this.status === 200) {
                    try {
						var orderbook = JSON.parse(this.responseText);
						var answerString = "";
						let asset = new AssetsList;
						let haveName = asset.getName(have_asset);
						let wantName = asset.getName(want_asset);

						answerString = "<table class='table table__orderbook'><thead><tr>" +
							"<th>Pair</th>" +
							"<th>Quantity</th>" +
							"<th>Price</th>" +
							"<th>Total</th>" +
							"</tr></thead><tbody>";
						var elementsArray = new Array();
						for (var key in orderbook["have"]) {
							elementsArray.push([orderbook["have"][key]['amount'],orderbook["have"][key]['price'],orderbook["have"][key]['total']]);
						}

						elementsArray = elementsArray.reverse();

						for (var item in elementsArray) {
							answerString = answerString + "<tr>" +
								"<td class='text-info'>" +
									"<img src='" + appData.nodeUrl + "/api/asseticon/" + have_asset + "' onerror='this.style.display=\"none\"'>" + haveName + " &rarr; " +
									"<img src='" + appData.nodeUrl + "/api/asseticon/" + want_asset + "' onerror='this.style.display=\"none\"'>" + wantName +
								"</td>" +
								"<td class='text-info'>" + elementsArray[item][0] + "</td>" +
								"<td class='text-info'>" + elementsArray[item][1] + "</td>" +
								"<td class='text-info'>" + elementsArray[item][2] + "</td>" +
								"</tr>";
						}
						var elementsArray = new Array();
						for (var key in orderbook["want"]) {
							elementsArray.push([orderbook["want"][key]['amount'],orderbook["want"][key]['price'],orderbook["want"][key]['total']]);
						}

						for (var item in elementsArray) {
							answerString = answerString + "<tr>" +
								"<td class='text-danger'>" +
								"<img src='" + appData.nodeUrl + "/api/asseticon/" + have_asset + "' onerror='this.style.display=\"none\"'>" + haveName + " &larr; " +
								"<img src='" + appData.nodeUrl + "/api/asseticon/" + want_asset + "' onerror='this.style.display=\"none\"'>" + wantName +
								"</td>" +
								"<td class='text-danger'>" + elementsArray[item][0] + "</td>" +
								"<td class='text-danger'>" + elementsArray[item][1] + "</td>" +
								"<td class='text-danger'>" + elementsArray[item][2] + "</td>" +
								"</tr>";
						}
						answerString = answerString + "</tbody></table>";
                        document.getElementById("orderbook").innerHTML = answerString;
                    } catch (e) { }
                }
            };
            httpRequest.send();
        } catch (e) { }
    }
