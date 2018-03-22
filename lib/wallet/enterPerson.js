	var casheTimestamp = '';
	var casheFee = '';
	var casheAmount = '';
	
	function enterPersonDoUpdate() {
		$('#base58SenderAccountAddress').html(appData.base58AccountAddress);
	}

	function enterPersonDoPaymentTransaction() {
		var base58SenderAccountAddress = getAccountAddressFromPublicKey(appData.keyPair.publicKey);
		$('#base58SenderAccountAddress').html(appData.base58AccountAddress);
		var data = Base58.decode($("#txRaw1").val());
		var port = appData.getUrlPort();
		if($('#timestamp').val() == "") {
			doNowTime();
		}
		var timestamp = parseInt($('#timestamp').val());
	    // Send person info to EraChain
	    var a;
	    a = issue_Person_Transaction(keyPair, timestamp, data, port);
		$("#txRaw").val(Base58.encode(a));
	}

	function enterPersononLoad() {
		$("#nodeUrl").val(appData.nodeUrl);
        doNowTime();
		$("#base58SenderAccountAddress").val(appData.base58AccountAddress);
    }
    
	function enterPersonParseinfo() {
		if ( !(isIE() || isEDGE()) ) {
			var person = byteToPerson($("#txRaw1").val());
			//person["type"];
			$('#base58SenderAccountAddress').html(getAccountAddressFromPublicKey(Base58.encode(person["senderAccount"])));
			$('#namePerson').val(person["personName"]);
			//person["icon"] = icon;
			var base64String = btoa(String.fromCharCode.apply(null, person["image"])); 
	  		var ss = '<img src="data:image/jpeg;base64,' + base64String + '" style="max-width:250px; height: AUTO;"/>';
	  		$("#img").html(ss);
			$('#description').val(person["description"]);
			$('#birthday').val(new Date(person["birthday"]));
			$('#deathday').val(new Date(person["deathday"]));
			$('#gender').val(person["gender"]);
			$('#birthLatitude').val(person["birthLatitude"]);
			$('#birthLongitude').val(person["birthLongitude"]);
			//$('#skinColor').val(person["skinColor"]);
			$('#eyeColor').val(person["eyeColor"]);
			$('#hairColor').val(person["hairColor"]);
			$('#heightperson').val(person["height"]);
			//console.log("log ownerSignature:" + Base58.encode(person["ownerSignature"]));
			//person["ownerSignature"] = ownerSignature;
		}
	}