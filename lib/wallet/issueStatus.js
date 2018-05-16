	var casheTimestamp = '';
	var casheFee = '';
	var casheAmount = '';

	function issueStatusDoUpdate() {
		$('#base58SenderAccountAddress').html(appData.base58AccountAddress);
		var timestamp = $('#timestamp').val();
	}

	function issueStatusDoPaymentTransaction() {
		var base58SenderAccountAddress = getAccountAddressFromPublicKey(appData.keyPair.publicKey);
		$('#base58SenderAccountAddress').html(base58SenderAccountAddress);		
		var timestamp = parseInt(doNowTime());
		var title = $("#title").val();
		var icon = [0];
		var image = [0];
		var description = $('#description').val();
		var unique = 0;
		if($('#unique').prop('checked')){
		unique = 1;
		}
		var port = appData.getUrlPort();
	    $("#txRaw").val(Base58.encode(issue_Status(appData.keyPair, timestamp, title, icon, image, description, unique, port)));		
	    $("#myLink").html('<a href="' + $("#nodeUrl").val() + '/api/broadcast/' + $("#txRaw").val() +'">' + $("#nodeUrl").val() + '/api/broadcast/' + $("#txRaw").val() +'</a>');
	}

	function issueStatusOnLoad() {
		$("#base58SenderAccountAddress").val(appData.base58AccountAddress);
		$("#nodeUrl").val(appData.nodeUrl);
	}
	