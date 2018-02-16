    var casheBase58addressSeed = '';
	var casheBase58SenderAccountAddress = '';
	var casheBase58RecipientAccountAddress = '';
	var casheTimestamp = '';
	var casheFee = '';
	var casheAmount = '';

	function sendAssetDoUpdate(assetKey) 
	{
		var base58addressSeed = $('#base58SenderAccountSeed').val();
		// asset key
		var asset_key = $('#assetkey').val();
		if (assetKey == "wantasset") {
			asset_key = $('#wantasset').val();
		} 
		if (assetKey == "haveasset") {
			asset_key = $('#haveasset').val();
		} 
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
		var base58SenderAccountAddress = $('#base58SenderAccountAddress').val();
		if ((base58SenderAccountAddress != '') && (appData != null) ) {
			casheBase58SenderAccountAddress = base58SenderAccountAddress;
			appData.requestBalanceForAsset(base58SenderAccountAddress, asset_key, "sendAsset");
		}
		var base58RecipientAccountAddress = $('#base58RecipientAccountAddress').val();
		if ((base58RecipientAccountAddress != '') && (casheBase58RecipientAccountAddress != base58RecipientAccountAddress)) {
			casheBase58RecipientAccountAddress = base58RecipientAccountAddress;
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
		if ($('#fee').val() != casheFee) {
			var caretPosition = getTextCursorPosition($('#fee'))
			var removeCommasBuf = removeAllexceptDotAndNumbers($('#fee').val());
			if(removeCommasBuf != $('#fee').val()) {
				$('#fee').val(removeCommasBuf);
				setTextCursorPosition($('#fee'), caretPosition - 1);
			}
			casheFee = $('#fee').val();
		}
		if ($('#amount').val() != casheAmount) {
			var caretPosition = getTextCursorPosition($('#amount'))
			var removeCommasBuf = removeAllexceptDotAndNumbers($('#amount').val());
			if(removeCommasBuf != $('#amount').val()) {
				$('#amount').val(removeCommasBuf);
				setTextCursorPosition($('#amount'), caretPosition - 1);
			}
			casheAmount = $('#amount').val();
		}
	}

	function sendAssetDoPaymentTransaction() {
		var base58SenderAccountSeed = document.getElementById('base58SenderAccountSeed').value;
		var senderAccountSeed = Base58.decode(base58SenderAccountSeed);
		if(senderAccountSeed.length != 32) {
			$('#base58SenderAccountAddress').val('');
			$("#output").val("invalid seed!");
			return;
		}
		// key pair
		keyPair = getKeyPairFromSeed(senderAccountSeed);
		// sender address
		var base58SenderAccountAddress = getAccountAddressFromPublicKey(keyPair.publicKey);
		$('#base58SenderAccountAddress').html(base58SenderAccountAddress);
		// timestamp				
		if($('#timestamp').val() == "") {
			doNowTime();
		}
		var timestamp = parseInt($('#timestamp').val());
		// recipient account
		var recipientAccountAddress = Base58.decode($('#base58RecipientAccountAddress').val());
		// asset key
		var asset_key = $('#assetkey').val();
		// Quantity
		var quantity = $('#quantity').val();
		// Title
		var title = $('#title').val();
		// Message
		var message =$('#message').val();
		// no enscript
		var enscript = [0];
		// text
		var is_text =[1];
		// Era Chain Port
		var port = appData.getUrlPort();
		// r_send transaction	
		$("#txRaw").val(Base58.encode(generate_R_Send_TransactionBase(keyPair, recipientAccountAddress, asset_key, quantity, timestamp, title, message, enscript, is_text, port)));
		// show url transaction
		$("#myLink").html('<a href="' + $("#nodeUrl").val() + '/api/broadcast/' + $("#txRaw").val() +'">' + $("#nodeUrl").val() + '/api/broadcast/' + $("#txRaw").val() +'</a>');
	}

	function sendAssetonLoad()
	{
		doNowTime();
		$("#nodeUrl").val(appData.nodeUrl);
		$("#base58SenderAccountSeed").val(appData.base58AccountSeed);
		$("#base58SenderAccountAddress").val(appData.base58AccountAddress);
	}