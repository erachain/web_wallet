	var createAddress = "<h5>Log in</h5>" +
	"WEB URL:<br>" +
		"<div class='input-group'><input list='browsers' class='form-control' type='text' size=60 value='http://explorer.erachain.org:9067' id='weburl'/>" +
		"<datalist id='browsers'>" +
  	"<option value='http://explorer.erachain.org:9067'>" +
		"<option value='http://explorer.erachain.org:9047'>" +
  	"<option value='http://localhost:9047'>" +
  	"</datalist>" +
		"&nbsp;<input class='btn btn-default' type='button' value='Save' onclick='saveWebUrl()'/></div><br>" +
	"<ul class='nav nav-tabs'>"+
		"<li class='nav-item'><a class='nav-link active' data-toggle='tab' href='#wallet' id='awallet'>Wallet (by Seed)</a></li>"+
		"<li class='nav-item'><a class='nav-link' data-toggle='tab' href='#mobile' id='amobile'>Mobile (by Private Key)</a></li>"+
		"<li class='nav-item'><a class='nav-link' data-toggle='tab' href='#dev' id='adev'>For developers</a></li>"+
	"</ul>"+
	"<div class='tab-content'>"+
	"<div class='tab-pane active' id='wallet'><br>"+
		"Base Seed:<br>" +
		"<div class='input-group'><input class='form-control' type='text' size=60 value='' id='base58BaseSeedWallet'/>&nbsp;</div><br>" +	
		"Accounts quantity:<br>" +
		"<input class='form-control' style='width:150px;' type='text' size=20 value='10' id='base58BaseSeedWalletQty'/><br>" +	
		"<input class='btn btn-default' style='width:150px;' type='button' value='get Accounts' onclick='doAccountsQty()'/><br>"+
		"<div id='output'></div><br>" +
	"</div>"+
	"<div class='tab-pane' id='mobile'><br>"+
		"Private Key:" +
		"<div class='input-group'><input class='form-control' type='text' value='' id='base58AccountPrivateKeyMobile'/>&nbsp;<input class='btn btn-success' type='button' id='doAccountFromSeedButton' value='Log in' onclick='loginMobile()'/></div>" +
	"</div>"+
	"<div class='tab-pane' id='dev'><br>"+
		"<div class='form-group'>" +
			"Enter passcode string (min 8 Characters):<br>" +
			"<div class='input-group'><input class='form-control' type='text' size=60 value='' autofocus id='brainWalletPassphrase'>"+
			"&nbsp;<input class='btn btn-default' type='button' id='doBrainButton' value='generate BIP39' OnClick='generatePasscode()'/>" +
			"&nbsp;<input class='btn btn-default' type='button' id='doBrainButton' value='get Base Seed' OnClick='doBrain()'/></div>" +
			"Base Seed:<br>" +
			"<div class='input-group'><input class='form-control' type='text' size=60 value='' id='base58BaseSeed'/>&nbsp;<input class='btn btn-default' type='button' value='get Account Seed' onclick='doAccounts()'/></div><br>" +
			"<div class='card'>" +
  		"<div class='card-header'>Account info</div>" +
  		"<div class='card-block'>" +
			"Account Seed:"+
			"<div class='input-group'><input class='form-control' type='text' value='' id='base58AccountSeed'>&nbsp;<input class='btn btn-default' type='button' id='doBrainButton' value='get Private Key' OnClick='doAccountFromSeed()'></div>" +
  		"Private Key:" +
			"<div class='input-group'><input class='form-control' type='text' value='' id='base58AccountPrivateKey'/>&nbsp;<input class='btn btn-success' type='button' id='doAccountFromSeedButton' value='Log in' onclick='login()'/></div>" +
			"Public Key:" +
			"<div class='input-group'><input class='form-control' type='text' value='' id='base58AccountPublicKey'/>&nbsp;<input class='btn btn-default' type='button' value='get Address' onclick='doAccountAddressFromPublicKey()'/></div>" +
			"Address:" +
			"<input class='form-control' type='text' value='' readonly id='base58AccountAddress'/><br>" +
			"</div></div>" +
		"</div>"+	
	"</div>"+
	"</div>";

	var seedSet = "<div class='alert alert-success'>" +
	"<strong>Success!</strong> Account seed set."+
	  "</div>";
	  
	var seedRm = "<div class='alert alert-success'>" +
	  "<strong>Success!</strong> Account seed removed."+
		"</div>";
		