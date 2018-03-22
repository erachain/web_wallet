
	var casheTimestamp = '';
	var casheFee = '';
	var casheAmount = '';

	function sendAssetDoUpdate(assetKey) {
		// asset key
		var asset_key = $('#assetkey').val();
		if (assetKey == "wantasset") {
			asset_key = $('#wantasset').val();
		} 
		if (assetKey == "haveasset") {
			asset_key = $('#haveasset').val();
		} 
		$('#base58SenderAccountAddress').html(appData.base58AccountAddress);
		if  (appData != null) {
			appData.requestBalanceForAsset(appData.base58AccountAddress, asset_key, "sendAsset");
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
		$('#base58SenderAccountAddress').html(appData.base58AccountAddress);
		// sender address
		var base58SenderAccountAddress = getAccountAddressFromPublicKey(appData.keyPair.publicKey);
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
		var message = appData.getDescriptionValue();
		// no enscript
		var enscript = [0];
		// text
		var is_text =[1];
		// Era Chain Port
		var port = appData.getUrlPort();
		// r_send transaction	
		console.log(appData.keyPair.privateKey);
		$("#txRaw").val(Base58.encode(generate_R_Send_TransactionBase(appData.keyPair, recipientAccountAddress, asset_key, quantity, timestamp, title, message, enscript, is_text, port)));
		// show url transaction
		$("#myLink").html('<a href="' + $("#nodeUrl").val() + '/api/broadcast/' + $("#txRaw").val() +'">' + $("#nodeUrl").val() + '/api/broadcast/' + $("#txRaw").val() +'</a>');
	}

	function sendAssetonLoad() {
		doNowTime();
		$("#nodeUrl").val(appData.nodeUrl);
		$("#base58SenderAccountAddress").val(appData.base58AccountAddress);
		simplemde = new SimpleMDE({ element: document.getElementById("MDdescription") });
    	CKEDITOR.replace( 'description' );
	}