	var casheTimestamp = '';
	var casheFee = '';
	var casheAmount = '';
	
	function orderDeleteDoUpdate() {
		$('#base58SenderAccountAddress').html(appData.base58AccountAddress);
	}

	function orderDeleteDoPaymentTransaction() {
	    var timestamp = parseInt(doNowTime());
		var sign = Base58.decode($('#sign').val()); // 1
	    var port = appData.getUrlPort();
	    $("#txRaw").val(Base58.encode(Cancel_Order(appData.keyPair, timestamp, sign, port)));
	    askPOSTProcess();
    }
    
	function orderDeleteOnLoad()
	{
		$("#nodeUrl").val(appData.nodeUrl);
		$("#port").val(appData.getUrlPort());
        $("#base58SenderAccountAddress").val(appData.base58AccountAddress);
	}