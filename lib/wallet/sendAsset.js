
	var casheTimestamp = '';
	var casheFee = '';
	var casheAmount = '';

	function sendAssetDoUpdate(assetKey) {
		// asset key
		var asset_key = $('#assetkey').val();
		var type_send = "sendAsset";
		if (assetKey == "wantasset") {
			asset_key = $('#wantasset').val();
			type_send = "sendAssetWant";
		}
		if (assetKey == "haveasset") {
			asset_key = $('#haveasset').val();
			type_send = "sendAssetHave";
		}
		$('#base58SenderAccountAddress').html(appData.base58AccountAddress);
		if  (appData != null) {
			appData.requestBalanceForAsset(appData.base58AccountAddress, asset_key, type_send);
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
		var timestamp = parseInt(doNowTime());
		// recipient account
		var recipientAccountAddress = Base58.decode($('#base58RecipientAccountAddress').val());
		// asset key
		var asset_key = $('#assetkey').val();
		// Quantity
		var quantity = $('#quantity').val();
		// Scale
		var scale = get_scale(quantity);
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
		//console.log(appData.keyPair.privateKey);
		$("#txRaw").val(Base58.encode(generate_R_Send_TransactionBase(appData.keyPair, recipientAccountAddress, asset_key, quantity, scale, timestamp, title, message, enscript, is_text, port)));
		askPOSTProcess();
	}

	function sendAssetonLoad() {
		$("#nodeUrl").val(appData.nodeUrl);
		$("#base58SenderAccountAddress").val(appData.base58AccountAddress);
		simplemde = new SimpleMDE({ element: document.getElementById("MDdescription") });
    	CKEDITOR.replace( 'description' );
	}

	function get_scale(n) {
		if (n === undefined) return '';
		n = (typeof n == 'string') ? n : n.toString();
		if (n.indexOf('e') !== -1) return parseInt(n.split('e')[1]) * -1;
		var separator = (1.1).toString().split('1')[1];
		var parts = n.split(separator);
		return parts.length > 1 ? parts[parts.length - 1].length : 0;
	}

	function truncated(n, s) {
		n = (typeof n == 'string') ? n : n.toString();
		let a = n.split('.');
		let result = a[0];

		if(a[1] !== undefined){
			result += '.' + a[1].substr(0, s);
		}

		return result;
	}

	function onlyDigits(amount) {
		let digits = amount.replace(/[^\d\.]/g, "");
		if(digits.match(/\./g) !== null && digits.match(/\./g).length > 1) {
			digits = digits.substr(0, digits.lastIndexOf("."));
		}

		return digits;
	}

	function validAmountScale(amount) {
		let current_amount = onlyDigits(amount.value);

		let valid_scale = amount.dataset.amountScale;
		let max_amount = amount.dataset.maxAmount;

		if(parseFloat(current_amount) > parseFloat(max_amount)){
			current_amount = max_amount;
		}

		if(get_scale(current_amount) > valid_scale){
			current_amount = truncated(current_amount, valid_scale);
		}

		amount.value = current_amount;
	}