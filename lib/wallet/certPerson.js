	function certPersonDoUpdate() {
		$('#base58SenderAccountAddress').html(appData.base58AccountAddress);
	}

	function certPersonDoPaymentTransaction() {
		var base58SenderAccountAddress = getAccountAddressFromPublicKey(appData.keyPair.publicKey);
	    // timestamp
	    var timestamp = parseInt(doNowTime());
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
	    askPOSTProcess();
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
						var bdate = new Date(personArray["birthday"]);// + tzOffset);
						document.getElementById("personInfo").innerHTML = "Name: <b>" + personArray["name"] + "</b><br>Birthday: <b>" + bdate.getUTCDate() + "-" + (bdate.getMonth() + 1) + "-" + bdate.getFullYear() + "</b>";
						$('#PersonPublicKey').val(personArray["owner_publickey"])
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
	}