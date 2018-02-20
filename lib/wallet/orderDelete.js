    var casheBase58addressSeed = '';
	var casheBase58SenderAccountAddress = '';
	var casheBase58RecipientAccountAddress = '';
	var casheTimestamp = '';
	var casheFee = '';
	var casheAmount = '';

	
	function orderDeleteDoUpdate() 
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

	function orderDeleteDoPaymentTransaction() {
	
		var base58SenderAccountSeed = document.getElementById('base58SenderAccountSeed').value;
		var senderAccountSeed = Base58.decode(base58SenderAccountSeed);
		if(senderAccountSeed.length != 32) {
			$('#base58SenderAccountAddress').val('');
			$("#output").val("invalid seed!");
			return;
		}
		
		if($('#timestamp').val() == "") {
			doNowTime();
		}
			
	    var timestamp = parseInt($('#timestamp').val());
		var sign = Base58.decode($('#sign').val()); // 1
	    var port = appData.getUrlPort();
	    $("#txRaw").val(Base58.encode(Cancel_Order(keyPair, timestamp, sign, port)));
	    $("#myLink").html('<a href="' + $("#nodeUrl").val() + '/api/broadcast/' + $("#txRaw").val() +'">' + $("#nodeUrl").val() + '/api/broadcast/' + $("#txRaw").val() +'</a>');
    }
    
	function orderDeleteOnLoad()
	{
		$("#nodeUrl").val(appData.nodeUrl);
		$("#port").val(appData.getUrlPort());
		$("#base58SenderAccountSeed").val(appData.base58AccountSeed);
        $("#base58SenderAccountAddress").val(appData.base58AccountAddress);
		doNowTime();
	}