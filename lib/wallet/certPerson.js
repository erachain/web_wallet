	function certPersonDoUpdate() {
		$('#base58SenderAccountAddress').html(appData.base58AccountAddress);
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
		var base58SenderAccountAddress = getAccountAddressFromPublicKey(appData.keyPair.publicKey);
		if ($('#timestamp').val() == "") {
			doNowTime();
		}
	    // timestamp
	    var timestamp = parseInt($('#timestamp').val());
	    // person key
	    var person_key = $('#personkey').val();
	    // person public key
	    var publicKey = $('#PersonPublicKey').val();
	    // day certificate
	    var day = $('#day').val();
	    // poer ERA
	    var port = appData.getUrlPort();
	    // trans
	    $("#txRaw").val(Base58.encode(R_SertifyPubKeys(appData.keyPair, timestamp, person_key, publicKey, day, port)));
	    // view
	    $("#myLink").html('<a href="' + $("#nodeUrl").val() + '/api/broadcast/' + $("#txRaw").val() +'">' + $("#nodeUrl").val() + '/api/broadcast/' + $("#txRaw").val() +'</a>');
	}

	function requestPersonByIdCert() {
		document.getElementById("personInfo").innerHTML = "";
		var publicKey = $("#personkey").val();
		var httpRequest = typeof XMLHttpRequest != 'undefined'
				? new XMLHttpRequest()
				: new ActiveXObject('Microsoft.XMLHTTP');
			var requestUrl = appData.nodeUrl + "/api/person/" + publicKey;
			httpRequest.open('GET', requestUrl, true);
			httpRequest.onreadystatechange = function() {
				if (httpRequest.readyState === XMLHttpRequest.DONE && this.status === 200) {
					try {
						var personArray = JSON.parse(this.responseText);
						var currentDate = new Date();
						tzOffset = currentDate.getTimezoneOffset() * 60000;
						var bdate = new Date(personArray["birthday"] + tzOffset);
						document.getElementById("personInfo").innerHTML = "Name: <b>" + personArray["name"] + "</b><br>Birthday: <b>" + bdate.getUTCDate() + "-" + (bdate.getMonth() + 1) + "-" + bdate.getFullYear() + "</b>";
					} catch (e) { }
				}
			};
			httpRequest.send();
			var ss = '<img src="'+ appData.nodeUrl +'/index/personimage?key='+publicKey +'" style="max-width:250px; height: AUTO;"/>';
			$("#img").html(ss);
	}

	function certPersononLoad() {
		$("#nodeUrl").val(appData.nodeUrl);
		$("#base58SenderAccountAddress").val(appData.base58AccountAddress);
		doNowTime();
	}