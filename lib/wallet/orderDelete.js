	var casheTimestamp = '';
	var casheFee = '';
	var casheAmount = '';

	
	function orderDeleteDoUpdate() {
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

	function orderDeleteDoPaymentTransaction() {
		if($('#timestamp').val() == "") {
			doNowTime();
		}
			
	    var timestamp = parseInt($('#timestamp').val());
		var sign = Base58.decode($('#sign').val()); // 1
	    var port = appData.getUrlPort();
	    $("#txRaw").val(Base58.encode(Cancel_Order(appData.keyPair, timestamp, sign, port)));
	    $("#myLink").html('<a href="' + $("#nodeUrl").val() + '/api/broadcast/' + $("#txRaw").val() +'">' + $("#nodeUrl").val() + '/api/broadcast/' + $("#txRaw").val() +'</a>');
    }
    
	function orderDeleteOnLoad()
	{
		$("#nodeUrl").val(appData.nodeUrl);
		$("#port").val(appData.getUrlPort());
        $("#base58SenderAccountAddress").val(appData.base58AccountAddress);
		doNowTime();
	}