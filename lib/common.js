	var imagebyte;
	var simplemde;
	
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
	includeJS('./lib/marked.js');
	includeJS('./lib/bip39/jsbip39.js');
	includeJS('./lib/bip39/wordlist_english.js');
	includeJS('./lib/bip39/sjcl-bip39.js');
	includeJS('./lib/wallet/createAddress.html.js');
	includeJS('./lib/wallet/createAddress.js');
	includeJS('./lib/wallet/issueAsset.html.js');
	includeJS('./lib/wallet/issueAsset.js');
	includeJS('./lib/wallet/sendAsset.html.js');
	includeJS('./lib/wallet/sendAsset.js');
	includeJS('./lib/wallet/searchAsset.html.js');
	includeJS('./lib/wallet/searchAsset.js');
	includeJS('./lib/wallet/searchPerson.html.js');
	includeJS('./lib/wallet/searchPerson.js');
	includeJS('./lib/wallet/generatePerson.html.js');
	includeJS('./lib/wallet/generatePerson.js');
	includeJS('./lib/wallet/enterPerson.html.js');
	includeJS('./lib/wallet/enterPerson.js');
	includeJS('./lib/wallet/certPerson.html.js');
	includeJS('./lib/wallet/certPerson.js');
	includeJS('./lib/wallet/orderCreate.html.js');
	includeJS('./lib/wallet/orderCreate.js');
	includeJS('./lib/wallet/orderDelete.html.js');
	includeJS('./lib/wallet/orderDelete.js');
	includeJS('./lib/wallet/balances.html.js');
	includeJS('./lib/wallet/balances.js');
	includeJS('./lib/wallet/issueStatus.html.js');
	includeJS('./lib/wallet/issueStatus.js');
	includeJS('./lib/wallet/issueHash.html.js');
	includeJS('./lib/wallet/issueHash.js');
	includeJS('./lib/wallet/setStatus.html.js');
	includeJS('./lib/wallet/setStatus.js');

	function isIE() {
		if (/Trudent\/\d./i.test(navigator.userAgent)) {
			return true;
		 } else return false;
	}
	
	function isEDGE() {
		if (/Edge\/\d./i.test(navigator.userAgent)) {
			return true;
		 } else return false;
	}

	class AssetsList {
		constructor () {
			this.list = { }
		}
	
		getName(_key) {
			var _name = this.list[_key];
			if ( !_name ) {
				var httpRequestName = typeof XMLHttpRequest != 'undefined'
					? new XMLHttpRequest()
					: new ActiveXObject('Microsoft.XMLHTTP');
				var requestNameUrl = appData.nodeUrl + "/api/asset/" + _key;
				httpRequestName.open('GET',requestNameUrl, false);
				httpRequestName.send();	
				var assetDict = JSON.parse(httpRequestName.responseText);
				_name = assetDict["name"];
				this.list[_key] = _name;
			}
			if ( _name.length > 21 ) _name = _name.substring(0, 22) + "...";
			return _name;
		}
	}

	class AppData {
		constructor() {
			this.nodeUrl = 'http://datachain.world:9067';
			this.seedSet = false;
			this.selectedDescription = 0;
		}

		getUrlPort() {
			var url = new URL(this.nodeUrl);
			if (url.port == 9067) {
				return 9066;
			} else {
				return 9046;
			}
		}

		getDescriptionHTML() {
			this.selectedDescription = 0;
			return 	"<ul class='nav nav-tabs'>"+
					"<li class='nav-item'><a class='nav-link active' data-toggle='tab' href='#html' id='ahtml' onclick='appData.selectedDescription=0'>HTML</a></li>"+
					"<li class='nav-item'><a class='nav-link' data-toggle='tab' href='#md' id='amd' onclick='appData.selectedDescription=1'>MarkDown</a></li>"+
					"<li class='nav-item'><a class='nav-link' data-toggle='tab' href='#text' id='atext' onclick='appData.selectedDescription=2'>Plain text</a></li>"+
		  			"</ul>"+
		  			"<div class='tab-content'>"+
					"<div class='tab-pane active' id='html'><textarea class='form-control' rows='7' id=description></textarea></div>"+
					"<div class='tab-pane' id='md'><textarea class='form-control' rows='7' id=MDdescription></textarea></div>"+
					"<div class='tab-pane' id='text'><textarea class='form-control' rows='12' id=TEXTdescription></textarea></div>"+
		  			"</div>";
		}

		getDescriptionValue() {
			var answerValue = '';
			if ( this.selectedDescription == 0 ) {
				answerValue = CKEDITOR.instances.description.getData();
			} else if ( this.selectedDescription == 1 ) {
				//markDown
				answerValue = simplemde.value();
				if ( !/^#.*/.test(answerValue) ) {
					answerValue = "#\n" + answerValue;
				}
			} else {
				answerValue = document.getElementById('TEXTdescription').value;
			}
			return answerValue;
		}

		setAccount(_base58AccountPrivateKey) {
			this.seedSet = true;
			if(typeof(_base58AccountPrivateKey) == "string") {
				_base58AccountPrivateKey = new Uint8Array(Base58.decode(_base58AccountPrivateKey));
			}
			var _keyPair = nacl.sign.keyPair.fromSecretKey(_base58AccountPrivateKey);
			this.keyPair = {
				privateKey: _keyPair.secretKey,
				publicKey: _keyPair.publicKey
			}
			this.base58AccountAddress = getAccountAddressFromPublicKey(this.keyPair.publicKey);
			this.selectedPage = "mainSet";
			document.getElementById("accountSeed").innerHTML = this.base58AccountAddress.substring(0, 16) + "...";
			document.getElementById("logButton").innerHTML = "Log out";
			this.render();
		}

		clearAccount() {
			this.seedSet = false;
			this.keyPair = void 0;
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
			if ( typeof appData.keyPair !== "undefined" ) {
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
					case "searchAsset":
						document.getElementById("workFlowMainFrame").innerHTML = searchAsset;
						searchAssetOnLoad();
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
					case "searchPerson":
						document.getElementById("workFlowMainFrame").innerHTML = searchPerson;
						searchPersonOnLoad();
						break;	
					case "orderCreate":
						document.getElementById("workFlowMainFrame").innerHTML = orderCreate;
						orderCreateOnLoad();
						break;
					case "orderDelete":
						document.getElementById("workFlowMainFrame").innerHTML = orderDelete;
						orderDeleteOnLoad();
						break;
					case "balances":
						document.getElementById("workFlowMainFrame").innerHTML = balances;
						balancesOnLoad();
						break;
					case "issueStatus":
						document.getElementById("workFlowMainFrame").innerHTML = issueStatus;
						issueStatusOnLoad();
						break;
					case "setStatus":
						document.getElementById("workFlowMainFrame").innerHTML = setStatus;
						issueStatusOnLoad();
						break;
					case "hashIssue":
						document.getElementById("workFlowMainFrame").innerHTML = issueHash;
						issueHashOnLoad();
						break;
					case "devHelp":
						document.getElementById("workFlowMainFrame").innerHTML = devHelp;
						break;
					}
				} else {
					if ( this.selectedPage === "devHelp" ) {
						document.getElementById("workFlowMainFrame").innerHTML = devHelp;
					} else {
						document.getElementById("workFlowMainFrame").innerHTML = createAddress;
						document.getElementById("weburl").value = appData.nodeUrl;
					}
					if ( this.selectedPage !== "main" && this.selectedPage !== "mainRm" && this.selectedPage !== "devHelp" ) {
						alert("Login first.");
					}
				}
				this.requestBalanceForAsset(appData.base58AccountAddress, "2", "updateMain");
			}
		
		requestAsset(key) {
			this.selectedPage = "searchAsset";
			this.render();
			document.getElementById("key").value = key;
			requestAssetById(key)
		}

		requestPerson(key) {
			this.selectedPage = "searchPerson";
			this.render();
			document.getElementById("key").value = key;
			requestPersonById(key)
		}
		
		requestBalanceForAsset(base58SenderAccountAddress, assetId, type) {
			if ( base58SenderAccountAddress === 'undefined' || base58SenderAccountAddress === 'undefined' ) {
				return;
			}
			var httpRequest = typeof XMLHttpRequest != 'undefined'
				? new XMLHttpRequest()
				: new ActiveXObject('Microsoft.XMLHTTP');
			var requestUrl = appData.nodeUrl + "/api/addressassetbalance/" + base58SenderAccountAddress + "/" + assetId;
			httpRequest.open('GET',requestUrl, true);
			try {
				httpRequest.onreadystatechange = function() {
					if (httpRequest.readyState === XMLHttpRequest.DONE && this.status === 200) {
						try {
							var balanceArray = JSON.parse(this.responseText);
							var assetName = assetList.getName(assetId);
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

	let assetList = new AssetsList();

	let appData = new AppData();	

	function onFirstLoad() {		
		setTimeout(function() { 
			document.getElementById("backgroundLoader").style.visibility = "hidden";
			document.getElementById("loaderWrapper").style.visibility = "hidden";
			if (appData != null) {
				document.getElementById("blockExplorer").setAttribute("href", 'http://explorer.erachain.org:9047/index/blockexplorer.html');
				appData.loginAccount();
			}
			appData.render();
			}, 800);
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
		//console.log(buf);
		var time2 = new Date();
		//console.log(time2.getTime() - time1.getTime());
		time1 = new Date();
		for (var i = 0; i < 100000; i++) {
			var timestamp = 1455849866776 - Math.random()*100000000;
			buf = generatePaymentTransactionBase2(publicKey, lastReference, recipient, amount, fee, timestamp);
		}
		//console.log(buf);
		time2 = new Date();
		//console.log(time2.getTime() - time1.getTime());
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

	function stringIsKey(value) {
		return /^\d+$/.test(value);
	}

	function requestAssetGeneral() {
		var string = document.getElementById("key").value;
		if ( stringIsKey(string) ) {
			requestAssetById(string);
		} else {
			requestAssetByName(string);
		}
	}

	function requestPersonGeneral() {
		var string = document.getElementById("key").value;
		if ( stringIsKey(string) ) {
			requestPersonById(string);
		} else {
			requestPersonByName(string);
		}
	}