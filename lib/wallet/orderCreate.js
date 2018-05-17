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

function orderCreateOnLoad()
{
    $("#base58SenderAccountAddress").val(appData.base58AccountAddress);
	$("#nodeUrl").val(appData.nodeUrl);
	$("#port").val(appData.getUrlPort());	
}

function requestOrderbook() {
    //document.getElementById("orderbook").innerHTML = "";
    var httpRequest = typeof XMLHttpRequest != 'undefined'
            ? new XMLHttpRequest()
			: new ActiveXObject('Microsoft.XMLHTTP');
		var have_asset = $('#haveasset').val();     // 1
		var want_asset = $('#wantasset').val();     // 2
        var requestUrl = appData.nodeUrl + "/api/exchangeorders/" + have_asset + "/" + want_asset;
        httpRequest.open('GET', requestUrl, true);
        try {
            httpRequest.onreadystatechange = function() {
                if (httpRequest.readyState === XMLHttpRequest.DONE && this.status === 200) {
                    try {
						var orderbook = JSON.parse(this.responseText);
						var answerString = "";
						answerString = "<table class='table'><thead><tr><th width='50%' style='text-align: right'>Qty</th><th width='50%' style='text-align: left'>Price</th></tr></thead><tbody>";
						var elementsArray = new Array();
                        for (var key in orderbook["sell"]) {
							elementsArray.push([orderbook["sell"][key][0],orderbook["sell"][key][1]]);
						}
						elementsArray.sort(function (a, b) {
							return a[0]-b[0];
						});
						for (var item in elementsArray) {
							answerString = answerString + "<tr><td class=text-info style='text-align: right'>" + elementsArray[item][0]  + "</td><td class=text-info style='text-align: left'>" + elementsArray[item][1] + "</td></tr>";
						}
						var elementsArray = new Array();
						for (var key in orderbook["buy"]) {
							elementsArray.push([orderbook["buy"][key][0],orderbook["buy"][key][1]]);
						}
						elementsArray.sort(function (a, b) {
							return a[0]-b[0];
						});
						for (var item in elementsArray) {
							answerString = answerString + "<tr><td class=text-danger style='text-align: right'>" + elementsArray[item][0]  + "</td><td class=text-danger style='text-align: left'>" + elementsArray[item][1] + "</td></tr>";
						}
						answerString = answerString + "</tbody></table>";
                        document.getElementById("orderbook").innerHTML = answerString;
                    } catch (e) { }
                }
            };
            httpRequest.send();
        } catch (e) { }
    }
