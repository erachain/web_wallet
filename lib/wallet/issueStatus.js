    var casheBase58addressSeed = '';
	var casheBase58SenderAccountAddress = '';
	var casheBase58RecipientAccountAddress = '';
	var casheTimestamp = '';
	var casheFee = '';
	var casheAmount = '';

	
	function issueStatusDoUpdate() {
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

	function issueStatusDoPaymentTransaction() {
	
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
		var timestamp = parseInt($('#timestamp').val());
		var title = $("#title").val();
		var icon = [0];
		var image = [0];
		var description = $('#description').val();
		var unique = 0;
		if($('#unique').prop('checked')){
		unique = 1;
		}
		var port = appData.getUrlPort();
			
	    $("#txRaw").val(Base58.encode(issue_Status(keyPair, timestamp, title, icon, image, description, unique, port)));
		
	    $("#myLink").html('<a href="' + $("#nodeUrl").val() + '/api/broadcast/' + $("#txRaw").val() +'">' + $("#nodeUrl").val() + '/api/broadcast/' + $("#txRaw").val() +'</a>');
	}

	function issueStatusOnLoad() {
		$("#base58SenderAccountSeed").val(appData.base58AccountSeed);
		$("#base58SenderAccountAddress").val(appData.base58AccountAddress);
		$("#nodeUrl").val(appData.nodeUrl);
		doNowTime();
	}
	