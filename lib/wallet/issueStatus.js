	var casheTimestamp = '';
	var casheFee = '';
	var casheAmount = '';

	
	function issueStatusDoUpdate() {
		$('#base58SenderAccountAddress').html(appData.base58AccountAddress);
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
		var base58SenderAccountAddress = getAccountAddressFromPublicKey(appData.keyPair.publicKey);
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
	    $("#txRaw").val(Base58.encode(issue_Status(appData.keyPair, timestamp, title, icon, image, description, unique, port)));		
	    $("#myLink").html('<a href="' + $("#nodeUrl").val() + '/api/broadcast/' + $("#txRaw").val() +'">' + $("#nodeUrl").val() + '/api/broadcast/' + $("#txRaw").val() +'</a>');
	}

	function issueStatusOnLoad() {
		$("#base58SenderAccountAddress").val(appData.base58AccountAddress);
		$("#nodeUrl").val(appData.nodeUrl);
		doNowTime();
	}
	