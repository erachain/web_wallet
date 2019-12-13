function doAccountAddressFromPublicKey() {
	var base58AccountPublicKey = document.getElementById('base58AccountPublicKey').value;		
	if (Base58.decode(base58AccountPublicKey).length != 32) {
		document.getElementById('base58AccountAddress').value = '';
		alert("invalid PublicKey!");
		return;
	}		
	var base58AccountAddress = getAccountAddressFromPublicKey(base58AccountPublicKey);
	document.getElementById('base58AccountAddress').value = base58AccountAddress;
}

function doBrain() {
	var brainWalletPassphrase = document.getElementById('brainWalletPassphrase').value;		
	if (brainWalletPassphrase.length < 8) {
		document.getElementById('base58BaseSeed').value = '';
		document.getElementById('output').innerHTML = '';
		alert("invalid passphrase length!\nIt should be at least 8 characters.");
		return;
	}
		
	var byteSeed = new Uint8Array(SHA256.digest(SHA256.digest(brainWalletPassphrase)));
	var base58BaseSeed = Base58.encode(byteSeed);		
		document.getElementById('base58BaseSeed').value = base58BaseSeed;		
		doAccounts();
	}
	
function doAccountFromSeed(base58AccountSeed) {
	if (base58AccountSeed) {
		document.getElementById('base58AccountSeed').value = base58AccountSeed;
	} else {
		base58AccountSeed = document.getElementById('base58AccountSeed').value;
	}
	if (Base58.decode(base58AccountSeed).length != 32) {
		document.getElementById('base58AccountPublicKey').value = '';
		document.getElementById('base58AccountPrivateKey').value = '';
		document.getElementById('base58AccountAddress').value = '';
		alert("invalid seed!");
		return;
	}		
	keyPair = getKeyPairFromSeed(base58AccountSeed, false);	
	var base58AccountAddress = getAccountAddressFromPublicKey(keyPair.publicKey);	
	var base58AccountPublicKey = Base58.encode(keyPair.publicKey);
	var base58AccountPrivateKey = Base58.encode(keyPair.privateKey);		
	document.getElementById('base58AccountPublicKey').value = base58AccountPublicKey;
	document.getElementById('base58AccountPrivateKey').value = base58AccountPrivateKey;
	document.getElementById('base58AccountAddress').value = base58AccountAddress;
}

function login() {
	saveWebUrl();
	if ( appData != null ) {
		appData.setAccount(document.getElementById('base58AccountPrivateKey').value);
	}
}

function loginMobile() {
	saveWebUrl();
	if ( appData != null ) {
		appData.setAccount(document.getElementById('base58AccountPrivateKeyMobile').value);
	}
}

function logAction() {
	if ( appData != null ) {
		if ( appData.seedSet == true ) {
			appData.clearAccount();	
		} else {
			if ( appData.selectedPage != "main" ) {
				appData.loginAccount();
				appData.render();
			}
		}		
	}
}

function saveWebUrl() {
	var url = document.getElementById('weburl').value;
	if ( url == "" ) {
		url = "http://explorer.erachain.org:9047"
	}

	var regex = RegExp('9067');
	if (regex.test(url)) {
		document.getElementById('blockExplorer').setAttribute('value', 'http://explorer.erachain.org:9067/index/blockexplorer.html')
		document.getElementById('blockExplorer').setAttribute('href', 'http://explorer.erachain.org:9067/index/blockexplorer.html')
	}
	appData.nodeUrl = url;
}
	
function doAccounts() {
	var base58BaseSeed = document.getElementById('base58BaseSeed').value;
	//document.getElementById('output').innerHTML = '';
	if (base58BaseSeed == '') {
		return;
	}
	seed = Base58.decode(base58BaseSeed);
	if (seed.length != 32) {
		alert("invalid seed!");
		return;
	}
	var accountSeed = generateAccountSeed(seed, 0, false);
	var keyPair = getKeyPairFromSeed(accountSeed);
	var base58addressSeed = Base58.encode(accountSeed);
	doAccountFromSeed(base58addressSeed);
}

function doAccountsQty() {
	var base58BaseSeed = document.getElementById('base58BaseSeedWallet').value;
	if (base58BaseSeed == '') {
		return;
	}
	seed = Base58.decode(base58BaseSeed);
	if (seed.length != 32) {
		alert("invalid seed!");
		return;
	}
	var countAddrs = document.getElementById('base58BaseSeedWalletQty').value;
	document.getElementById('output').innerHTML = "<br><div class=container>";
	for (var nonce = 0; nonce < countAddrs; nonce ++) {
		var accountSeed = generateAccountSeed(seed, nonce, false);
		var keyPair = getKeyPairFromSeed(accountSeed);
		var base58addressSeed = Base58.encode(accountSeed);
		let nonceString = nonce + 1;
		document.getElementById('output').innerHTML += '<div class=\"row\"><div class=col-sm-10>'+
		+ '' + nonceString + ' '
		+ 'Address: <b>' + getAccountAddressFromPublicKey(keyPair.publicKey) + '</b><br>'
		+ 'Account Seed: ' + base58addressSeed + '<br><br>'
		+ '</div><div class=col-sm-2><button id="logButton" class="btn btn-outline-success my-2 my-sm-0" type="submit" onclick="setAccountFromSeed(\''+base58addressSeed+'\')"">Log in</button></div></div>';
	}
	document.getElementById('output').innerHTML += "</div>";
}

function setAccountFromSeed(seed) {
	var keyPair = getKeyPairFromSeed(seed, false);	
	appData.setAccount(keyPair.privateKey);
} 
	
function generatePasscode() {
	var m = new Mnemonic("english")
	// Generate new mnemonics
	var words = m.generate();
	document.getElementById("brainWalletPassphrase").value = words;
}

function generateSeedBIP39() {
	var m = new Mnemonic("english")
	// Generate new mnemonics
	var words = m.generate();
	document.getElementById("BIP39passcode").innerHTML = "BIP39 seed words: <b>" + words + "</b>";
	var byteSeed = new Uint8Array(SHA256.digest(SHA256.digest(words)));
	var base58BaseSeed = Base58.encode(byteSeed);		
	document.getElementById('base58BaseSeedWallet').value = base58BaseSeed;		
}

function openHelpDev() {
	menuClick('devHelp')
}
function show_server_list(link) {
    if (link.innerHTML === 'ServerList: (show)') {
        document.getElementById('server-list__link').innerHTML = 'ServerList: (hide)';
        load_server_list();
    } else {
        document.getElementById('server-list__link').innerHTML = 'ServerList: (show)';
        document.getElementById('server-list-data').innerHTML = '';
    }
}

function load_server_list() {
    let httpRequest = typeof XMLHttpRequest != 'undefined'
        ? new XMLHttpRequest()
        : new ActiveXObject('Microsoft.XMLHTTP');
    let requestUrl = "https://erachain.org/get-hosts";
    httpRequest.open('GET', requestUrl, true);
    httpRequest.onreadystatechange = function() {
        if ( httpRequest.readyState === XMLHttpRequest.DONE && this.status === 200 ) {
            let result = '<table class="server-list__table"><tr>';
            let serverList = JSON.parse(this.responseText);
            result += '<td>';
            result += '<table>';
            result += '<tr><th>Live:</th></tr>';
            serverList.live.forEach(function(e){
                result += parse_server_list(e);
            });
            result += '</table>';
            result += '</td>';
            result += '<td>';
            result += '<table>';
            result += '<tr><th>Dev:</th></tr>';
            serverList.dev.forEach(function(e){
                result += parse_server_list(e);
            });
            result += '</table>';
            result += '</td>';
            result += '</tr></table>';

            document.getElementById('server-list-data').innerHTML = result;
        }
    };
    httpRequest.send();
}

function parse_server_list(server) {
    let result = '';

    if(server.time !== undefined) {
        let color;

        if(server.time < 100){
            color = 'green';
        } else if(server.time < 200) {
            color = 'orange';
        } else {
            color = 'red';
        }

        result += '<tr><td>' +
            '<a href="javascript:" onclick="set_active_server(this)" style="color: '+color+'">'+server.host+'</a>' +
            '</td></tr>';
    }

    return result;
}

function set_active_server(sever) {
    document.getElementById('weburl').value = sever.innerHTML;
    document.getElementById('server-list__link').innerHTML = 'ServerList: (show)';
    document.getElementById('server-list-data').innerHTML = '';
    saveWebUrl();
}