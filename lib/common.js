	var imagebyte;

	function includeJS(p_file) {
		var script  = document.createElement('script');
		script.charset = 'utf-8';
		script.src =  p_file;
		document.getElementsByTagName('head')[0].appendChild(script);
	}
	
	includeJS('./lib/nacl-fast.js');
	includeJS('./lib/Base58.js');
	includeJS('./lib/sha256.js');
	includeJS('./lib/ripemd160.js');
	includeJS('./lib/eralib.js');
	includeJS('./lib/jquery.cropit.js');
	includeJS('./lib/wallet/createAddress.html.js');
	includeJS('./lib/wallet/createaddress.js');
	includeJS('./lib/wallet/issueAsset.html.js');
	includeJS('./lib/wallet/issueAsset.js');
	includeJS('./lib/wallet/sendAsset.html.js');
	includeJS('./lib/wallet/sendAsset.js');
	includeJS('./lib/wallet/generatePerson.html.js');
	includeJS('./lib/wallet/generatePerson.js');
	includeJS('./lib/wallet/enterPerson.html.js');
	includeJS('./lib/wallet/enterPerson.js');
	includeJS('./lib/wallet/certPerson.html.js');
	includeJS('./lib/wallet/certPerson.js');
		
	class AppData {
		constructor() {
			this.nodeUrl = '';
			this.seedSet = false;
		}

		getUrlPort() {
			var url = new URL(this.nodeUrl);
			if (url.port == 9067) {
				return 9066;
			} else {
				return 9046;
			}
		}

		setAccount(_base58AccountSeed, _base58AccountPublicKey, _base58AccountPrivateKey, _base58AccountAddress) {
			this.seedSet = true;
			this.base58AccountSeed = _base58AccountSeed;
			this.base58AccountPublicKey = _base58AccountPublicKey;
			this.base58AccountPrivateKey = _base58AccountPrivateKey;
			this.base58AccountAddress = _base58AccountAddress;
			this.selectedPage = "mainSet";
			document.getElementById("accountSeed").innerHTML = _base58AccountAddress.substring(0, 16) + "...";
			document.getElementById("logButton").innerHTML = "Log out";
			this.render();
		}

		clearAccount() {
			this.seedSet = false;
			this.base58AccountSeed = "";
			this.base58AccountPublicKey = ""; 
			this.base58AccountPrivateKey = "";
			this.base58AccountAddress = "";
			this.selectedPage = "mainRm" 
			document.getElementById("accountSeed").innerHTML = "not set";
			document.getElementById("logButton").innerHTML = "Log in";
			document.getElementById("compuBalance").innerHTML = "&nbsp;";
			this.render();
		}

		loginAccount() {
			document.getElementById("logButton").innerHTML = "Log in";
			this.selectedPage = "main";
		}

		render() {
			switch (this.selectedPage) {
				case "main":
					document.getElementById("workFlowMainFrame").innerHTML = createAddress;
					document.getElementById("weburl").value = appData.nodeUrl;
					break;
				case "mainSet":
					document.getElementById("workFlowMainFrame").innerHTML = seedSet;
					break;
				case "mainRm":
					document.getElementById("workFlowMainFrame").innerHTML = seedRm;
					break;
				case "issueAsset":
					document.getElementById("workFlowMainFrame").innerHTML = issueAsset;
					issueAssetonLoad();
					break;
				case "sendAsset":
					document.getElementById("workFlowMainFrame").innerHTML = sendAsset;
					sendAssetonLoad();
					break;
				case "generatePerson":
					document.getElementById("workFlowMainFrame").innerHTML = generatePerson;
					generatePersononLoad();
					break;
				case "enterPerson":
					document.getElementById("workFlowMainFrame").innerHTML = enterPerson;
					enterPersononLoad();
					break;
				case "certPerson":
					document.getElementById("workFlowMainFrame").innerHTML = certPerson;
					certPersononLoad();
					break;
			}
			this.requestBalanceForAsset(appData.base58AccountAddress, "2", "updateMain");
		}

		requestBalanceForAsset(base58SenderAccountAddress, assetId, type) {
			
			if ( base58SenderAccountAddress == '' || base58SenderAccountAddress == undefined ) {
				return;
			}
			var httpRequest = typeof XMLHttpRequest != 'undefined'
				? new XMLHttpRequest()
				: new ActiveXObject('Microsoft.XMLHTTP');
			var requestUrl = appData.nodeUrl + "/api/addressassetbalance/" + base58SenderAccountAddress + "/" + assetId;
			httpRequest.open('GET',requestUrl, true);
			try {
				httpRequest.onreadystatechange = function() {
					if (this.status == 200) {
						try {
							var balanceArray = JSON.parse(this.responseText);
							var httpRequestName = typeof XMLHttpRequest != 'undefined'
								? new XMLHttpRequest()
								: new ActiveXObject('Microsoft.XMLHTTP');
							var requestNameUrl = appData.nodeUrl + "/api/asset/" + assetId;
							httpRequestName.open('GET',requestNameUrl, false);
							httpRequestName.send();	
							var assetDict = JSON.parse(httpRequestName.responseText);
							var assetName = assetDict["name"];
							console.log(assetName);
							var balanceString = balanceArray[0][1] + " " + assetName;
							if (assetId == "2") {
								document.getElementById("compuBalance").innerHTML = balanceString;
							}
							if ( type == "sendAsset" ) {
								document.getElementById("senderBalance").value = balanceString;
							}
						} catch (e) { }
					}
				};
			httpRequest.send();
			} catch (e) { }
		}
	}

	let appData = new AppData();

	function onFirstLoad() {		
		if (appData != null) {
			document.getElementById("blockExplorer").setAttribute("href", 'http://explorer.erachain.org:9047/index/blockexplorer.html');
			appData.loginAccount();
		}
		appData.render();
		if (/test/.test(window.location.hash)) {
			$("#brainWalletPassphrase").val("sdfsdfsretgdsy5yygu7it756456eydgdfgeyfyjhl");
			$("#doBrainButton").click();
			if($("#base58BaseSeed").val() == 'CjCmqGrNJoy499fMFGmonRipBc4GKk9RGRHF4BY7XSBN') {
				$("#base58BaseSeed").css({"color": "green"});
			} else {
				$("#base58BaseSeed").css({"color": "red"});
			}			
			$("#base58AccountSeed").val("8stsVtM4gQsJbvVbDx1eszkd5zUWEtt6tmUwYBB4PmA3");
			$("#doAccountFromSeedButton").click();
			if($("#base58AccountAddress").val() == 'QMBKyCtSjjNETmNLQwfCxd6sADJNVXAShk') {
				$("#base58AccountAddress").css({"color": "green"});
			} else {
				$("#base58AccountAddress").css({"color": "red"});
			}
		}
	}

	function menuClick(_action) {
		if (appData != null) {
			appData.selectedPage = _action;
			appData.render();
		}
	}

	function doLoadInfoForName(name, elementNameInfo) {
		if(name == '') {
			elementNameInfo.val('');
			return;
		}
		if( name.toLowerCase() != name ) {
			elementNameInfo.val('You must use lowercase letters.');
			return;
		}
		$.post( appData.nodeUrl + "/index/api.html", { type: "get", apiurl: "/names/" + encodeURIComponent(name) } )
			.done(function( data ) {
				if(data.type == 'success'){
					var info = JSON.parse(data.result);
					elementNameInfo.val("Registered by " + info.owner);
				}
				if(data.type == 'apicallerror'){
					if(parseError(data.errordetail) == 'name does not exist') {
						elementNameInfo.val('Name is free. You can register it.');
					} else {
						elementNameInfo.val(parseError(data.errordetail));
					}
				}
			})
			.fail(function() {
				$("#output").val( "error" );
			});
	}

	function doNowTime() {
		var date = new Date();
		$('#datetime').val(date.toLocaleDateString() + ' ' + date.toLocaleTimeString());
		$('#timestamp').val(date.getTime());
	}

	function sleep(ms) {
		ms += new Date().getTime();
		while (new Date() < ms){}
	}

	function addCommas(str) {
		if (str == undefined) {
			str = "";
		}
		strbuf = str.toString();
		if( strbuf.indexOf('.') == -1)
		{
			return strbuf.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1,');
		}
		return strbuf.replace(/(\d)(?=(\d\d\d)+([^\d]))/g, '$1,');
	}

	function removeAllexceptDotAndNumbers (str) {
		if (str == undefined) {
			str = "";
		}
		return str.replace(/[^.0-9]/g,"");
	}
	
	function removeAllexceptNumbers(str) {
		if (str == undefined) {
			str = "";
		}
		return str.replace(/[^0-9]/g,"");
	}
	
	function getTextCursorPosition(ele) {   
		return ele.prop("selectionStart");
	}

	function setTextCursorPosition(ele, pos) {
		ele.prop("selectionStart", pos);
		ele.prop("selectionEnd", pos);
	}
	
	function parseError(error) {
		try {
			var error = JSON.parse(error);
			message = error.message;
		} catch (e) {
			message = error;
		}
		return message;
	}

	function doProcess() {
		var txRaw = $("#txRaw").val();
		if(!txRaw) {
			return;
		}
		$('#output').html('Processing...');
		$.get( appData.nodeUrl + "/api/broadcast/"+ txRaw , function( data ) {
				$("#output").val("Result: " + data.status +"       Message:" + data.message);
			})
			.fail(function() {
				$("#output").val('error!');			
			});
	}

	function doPostProcess() {
		var txRaw = $("#txRaw").val();
			if(!txRaw) {
				return;
			}		
		$('#output').html('Processing...');
		$.post( appData.nodeUrl + "/api/broadcast", "raw=" +txRaw , function( data) {
			if (data.status == undefined) {	
				$("#output").val("Message:" + data.message);					
			} else {
				$("#output").val("Transaction broadcasted sucessfully.");					
			}
		})
		.fail(function() {
			$("#output").val('error!');			
		});
	}
	
	function doLoadLastReference() {
		var base58SenderAccountAddress = $('#base58SenderAccountAddress').val();
		if(base58SenderAccountAddress == '') {
			$("#output").val('AccountAddress is null');
			return;
		}
		$('#base58LastReferenceOfAccount').val('...');
		$.get( appData.nodeUrl + "/api/addresslastreference/" + base58SenderAccountAddress, function( data ) {
				
				if(data.type == 'success'){
					var base58LastReferenceOfAccount = data.result;
					$('#base58LastReferenceOfAccount').val(base58LastReferenceOfAccount);
				}			
				if(data.type == 'apicallerror'){
					$("#output").val(data.errordetail);
					$('#base58LastReferenceOfAccount').val('');
				}
				
			})
			.fail(function() {
				$("#output").val( "error" );
			});
	}
	
	if (false) {
		var ls1 = new Uint8Array();
		var byteArray = [0, 2, -1, 3, 0, 4, 0, 0];
		ls1 = appendBuffer(ls1, byteArray);
		var byteArray2 = [1, 2, 3, -30, 4, 0, 1];
		ls1 = appendBuffer(ls1, byteArray2);
		console.log(ls1);
		publicKey = Base58.decode("9NfJZz5pLxhiFT8GfELoTw99x6JxR3mUiQ9SBsrwNbcp");
		lastReference = Base58.decode("YWv9Gyi2xxEyEe6ztrGGuAPhmUD86s7h8CANQAcmsxdeS3pU5BvQKnbeyXjnXXd8HgLaDvYBBz6im3dDYTR817F");
		recipient = Base58.decode("QTz6fSV2VNc2wjwwsw57kwQzgQhmGw5idQ");
		var amount = parseFloat("123.12001");
		var fee = parseFloat("1.0");
		var time1 = new Date();
		for (var i = 0; i < 100000; i++) {
			var timestamp = 1455849866776 - Math.random()*100000000;
			buf = generatePaymentTransactionBase(publicKey, lastReference, recipient, amount, fee, timestamp);
		}
		console.log(buf);
		var time2 = new Date();
		console.log(time2.getTime() - time1.getTime());
		time1 = new Date();
		for (var i = 0; i < 100000; i++) {
			var timestamp = 1455849866776 - Math.random()*100000000;
			buf = generatePaymentTransactionBase2(publicKey, lastReference, recipient, amount, fee, timestamp);
		}
		console.log(buf);
		time2 = new Date();
		console.log(time2.getTime() - time1.getTime());
	}
	
	function stringToByte(str) {
		var bytes = [];
		for (var i = 0; i < str.length; ++i) {
    		bytes.push(str.charCodeAt(i));
		}
		return bytes;
	}
	
	function toUTF8Array(str) {
		var utf8 = [];
		if (str != undefined ) {
    		for (var i=0; i < str.length; i++) {
        		var charcode = str.charCodeAt(i);
        		if (charcode < 0x80) utf8.push(charcode);
        		else if (charcode < 0x800) {
            		utf8.push(0xc0 | (charcode >> 6), 
                      0x80 | (charcode & 0x3f));
        		}
        		else if (charcode < 0xd800 || charcode >= 0xe000) {
            		utf8.push(0xe0 | (charcode >> 12), 
                      0x80 | ((charcode>>6) & 0x3f), 
                      0x80 | (charcode & 0x3f));
        		}
        		// surrogate pair
        		else {
	            	i++;
    	        	// UTF-16 encodes 0x10000-0x10FFFF by
        	    	// subtracting 0x10000 and splitting the
            		// 20 bits of 0x0-0xFFFFF into two halves
            		charcode = 0x10000 + (((charcode & 0x3ff)<<10)
                	      | (str.charCodeAt(i) & 0x3ff));
            		utf8.push(0xf0 | (charcode >>18), 
                	    0x80 | ((charcode>>12) & 0x3f), 
                    	0x80 | ((charcode>>6) & 0x3f), 
                    	0x80 | (charcode & 0x3f));
        		}
			}
		}
    	return utf8;
	}

	function handleFileSelect(evt) {
    	var files = evt.target.files; // FileList object
	    // Loop through the FileList and render image files as thumbnails.
    	for (var i = 0, f; f = files[i]; i++) {
	     // Only process image files.
    		if (!f.type.match('image.*')) {
        		continue;
      		}
      	var reader = new FileReader();
     	// Read in the image file as a data URL.
	  	reader.readAsArrayBuffer(f); // readAsArrayBuffer(f);
	  	reader.onload = function(e) {
	  			imagebyte = new Uint8Array(e.target.result)
	  			var  base64String = btoa(String.fromCharCode.apply(null, imagebyte)); 
	  			var ss = '<img src="data:image/jpeg;base64,' + base64String + '" style="max-width:300px; height: AUTO;"/>';
	  			$("#img").html(ss);
			} 
		}
	}