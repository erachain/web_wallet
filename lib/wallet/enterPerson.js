    var casheBase58addressSeed = '';
	var casheBase58SenderAccountAddress = '';
	var casheBase58RecipientAccountAddress = '';
	var casheTimestamp = '';
	var casheFee = '';
	var casheAmount = '';
	
	function enterPersonDoUpdate() {
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
	}

	function enterPersonDoPaymentTransaction() {
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

	function enterPersononLoad()
	{
		$("#nodeUrl").val(appData.nodeUrl);
        doNowTime();
        $("#base58SenderAccountSeed").val(appData.base58AccountSeed);
		$("#base58SenderAccountAddress").val(appData.base58AccountAddress);
    }
    
	function enterPersonParseinfo() {
	}