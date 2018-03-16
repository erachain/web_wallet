    var casheBase58addressSeed = '';
	var casheBase58SenderAccountAddress = '';
	var casheBase58RecipientAccountAddress = '';
	var casheTimestamp = '';
	var casheFee = '';
	var casheAmount = '';
	
	function orderCreateDoUpdate() 
	{
		var base58addressSeed = $('#base58SenderAccountSeed').val();
		if ((base58addressSeed != '') && (casheBase58addressSeed != base58addressSeed)) {
			casheBase58addressSeed = base58addressSeed;
			if (Base58.decode(base58addressSeed).length == 32) {
				keyPair = getKeyPairFromSeed(base58addressSeed, false);
				var base58SenderAccountAddress = getAccountAddressFromPublicKey(keyPair.publicKey);				
				$('#base58SenderAccountAddress').html(base58SenderAccountAddress);	
				
			} else {
				$('#base58SenderAccountAddress').val('');
			}
		
		}
		var base58SenderAccountAddress = $('#base58SenderAccountAddress').html();
		if ((base58SenderAccountAddress != '') && (casheBase58SenderAccountAddress != base58SenderAccountAddress)) {
			casheBase58SenderAccountAddress = base58SenderAccountAddress;
			doLoadBalance(base58SenderAccountAddress, $('#senderBalance'));
		}
		var timestamp = $('#timestamp').val();		
		if (!(timestamp == '' || casheTimestamp == timestamp)) {
			casheTimestamp = timestamp;
			if (! isNaN(casheTimestamp)) {
				var date = new Date(parseInt(casheTimestamp));
				$('#datetime').val(date.toLocaleDateString() + ' ' + date.toLocaleTimeString());
			} else {
				$('#datetime').val('');
			}
		}
	}

function orderCreateDoPaymentTransaction() {
	var base58SenderAccountSeed = document.getElementById('base58SenderAccountSeed').value;
	var senderAccountSeed = Base58.decode(base58SenderAccountSeed);
	if(senderAccountSeed.length != 32) {
		$('#base58SenderAccountAddress').val('');
		$("#output").val("invalid seed!");
		return;
	}
	if($('#timestamp').val() == "") {
		doNowTime();
	}		
	var timestamp = parseInt($('#timestamp').val());
	var have_asset = $('#haveasset').val();     // 1
	var want_asset = $('#wantasset').val();     // 2
	var have_ammount = $('#haveammount').val(); //9876.54321;
	var want_ammount = $('#wantammount').val(); // 1234.567890;
	var port = appData.getUrlPort();
	$("#txRaw").val(Base58.encode(Create_Order(keyPair, timestamp, have_asset, want_asset, have_ammount, want_ammount, port)));
}

function orderCreateOnLoad()
{
	$("#base58SenderAccountSeed").val(appData.base58AccountSeed);
    $("#base58SenderAccountAddress").val(appData.base58AccountAddress);
	$("#nodeUrl").val(appData.nodeUrl);
	$("#port").val(appData.getUrlPort());	
	doNowTime();
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
                if (this.status == 200) {
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