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
		var timestamp = parseInt(doNowTime());
	    // Send person info to EraChain
	    var a;
	    a = issue_Person_Transaction(appData.keyPair, timestamp, data, port);
		$("#txRaw").val(Base58.encode(a));
		askPOSTProcess();
	}

	function enterPersononLoad() {
		$("#nodeUrl").val(appData.nodeUrl);
		$("#base58SenderAccountAddress").val(appData.base58AccountAddress);
    }
    
	function enterPersonParseinfo() {
		if ( !(isIE() || isEDGE()) ) {
			var person = byteToPerson($("#txRaw1").val());
			$('#base58SenderAccountAddress').html(getAccountAddressFromPublicKey(Base58.encode(person["senderAccount"])));
			$('#namePerson').val(person["personName"]);
			//person["icon"] = icon;
			var base64String = btoa(String.fromCharCode.apply(null, person["image"])); 
	  		var ss = '<img src="data:image/jpeg;base64,' + base64String + '" style="max-width:250px; height: AUTO;"/>';
	  		$("#img").html(ss);
			$('#description').val(person["description"]);
			var currentDate = new Date();
			tzOffset = currentDate.getTimezoneOffset() * 60000;

			var birthday = new Date(person["birthday"] + tzOffset)
			$('#birthday').val(birthday);
			var deathday = new Date(person["deathday"] + tzOffset);
			$('#deathday').val(deathday);
			console.log(birthday > deathday)
			if (deathday <= birthday ) {
				$('#deathday').attr('disabled', 'true')
			} else {
				$('#deathday').removeAttr('disabled')
			}

			$('#gender').val(person["gender"]);
			$('#birthLatitude').val(person["birthLatitude"]);
			$('#birthLongitude').val(person["birthLongitude"]);
			$('#eyeColor').val(person["eyeColor"]);
			$('#hairColor').val(person["hairColor"]);
			$('#heightperson').val(person["height"]);
		}
	}