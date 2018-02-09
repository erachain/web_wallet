    var casheBase58addressSeed = '';
	var casheBase58SenderAccountAddress = '';
	var casheTimestamp = '';
	var casheFee = '';
	var casheAmount = '';
	
	function certPersonDoUpdate() 
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

	function certPersonDoPaymentTransaction() {
		var base58SenderAccountSeed = document.getElementById('base58SenderAccountSeed').value;
		var senderAccountSeed = Base58.decode(base58SenderAccountSeed);
		if(senderAccountSeed.length != 32) {
			$('#base58SenderAccountAddress').val('');
			$("#output").val("invalid seed!");
			return;
		}
		keyPair = getKeyPairFromSeed(senderAccountSeed);
		var base58SenderAccountAddress = getAccountAddressFromPublicKey(keyPair.publicKey);
		$('#base58SenderAccountAddress').html(base58SenderAccountAddress);
		if($('#timestamp').val() == "") {
			doNowTime();
		}
	    // timestamp
	    var timestamp = parseInt($('#timestamp').val());
	    //person key
	    var person_key = $('#personkey').val();
	    // person public key
	    var publicKey = Base58.decode($('#base58PersonPublicKey').val());
	    //day certificate
	    var day = $('#day').val();
	    // poer ERA
	    var port = appData.getUrlPort();
	    // trans
	    $("#txRaw").val(Base58.encode(R_SertifyPubKeys(keyPair, timestamp, person_key, publicKey, day, port)));
	    // view
	    $("#myLink").html('<a href="' + $("#nodeUrl").val() + '/api/broadcast/' + $("#txRaw").val() +'">' + $("#nodeUrl").val() + '/api/broadcast/' + $("#txRaw").val() +'</a>');
	}

	function requestPersonByPublicKey() {
		var publicKey = $("#PersonPublicKey").val();
		var httpRequest = typeof XMLHttpRequest != 'undefined'
				? new XMLHttpRequest()
				: new ActiveXObject('Microsoft.XMLHTTP');
			var requestUrl = appData.nodeUrl + "/api/personbypublickey/" + publicKey;
			httpRequest.open('GET', requestUrl, true);
			try {
				httpRequest.onreadystatechange = function() {
					if (this.status == 200) {
						try {
							var personArray = JSON.parse(this.responseText);
							document.getElementById("personInfo").innerHTML = "Name: <b>" + personArray["name"] + "</b><br>Key(ID): <b>"+ personArray["key"]+"</b>";
						} catch (e) { }
					}
				};
				httpRequest.send();
			} catch (e) { }
	}

	function certPersononLoad() {
		$("#nodeUrl").val(appData.nodeUrl);
        $("#base58SenderAccountSeed").val(appData.base58AccountSeed);
		$("#base58SenderAccountAddress").val(appData.base58AccountAddress);
		doNowTime();
	}