	var createAddress = "<h5>Log in</h5>" +
	"<div class='form-group'>" +
	"Enter passcode string (min 8 Characters):<br>" +
	"<div class='input-group'><input class='form-control' type='text' size=60 value='' autofocus id='brainWalletPassphrase'>&nbsp;<input class='btn btn-default' type='button' id='doBrainButton' value='Convert' OnClick='doBrain()'/></div>" +
	"Base Seed:<br>" +
	"<div class='input-group'><input class='form-control' type='text' size=60 value='' id='base58BaseSeed'/>&nbsp;<input class='btn btn-default' type='button' value='Convert' onclick='doAccounts()'/></div>" +
	"WEB URL:<br>" +
	"<div class='input-group'><input list='browsers' class='form-control' type='text' size=60 value='http://explorer.erachain.org:9067' id='weburl'/>" +
	"<datalist id='browsers'>" +
  "<option value='http://explorer.erachain.org:9067'>" +
	"<option value='http://explorer.erachain.org:9047'>" +
  "<option value='http://localhost:9047'>" +
  "</datalist>" +
	"&nbsp;<input class='btn btn-default' type='button' value='Save' onclick='saveWebUrl()'/></div>" +
	"<div id='output'></div><br>" +
	"<div class='card'>" +
  "<div class='card-header'>Account info</div>" +
  "<div class='card-block'>" +
	"Account Seed:"+
	"<div class='input-group'><input class='form-control' type='text' value='' id='base58AccountSeed'/>&nbsp;<input class='btn btn-default' type='button' value='Convert' onclick='doAccountFromSeed()'/>&nbsp;<input class='btn btn-success' type='button' id='doAccountFromSeedButton' value='Log in' onclick='login()'/></div>" +
  "<span>Private Key:" +
	"<input class='form-control' type='text' value='' readonly id='base58AccountPrivateKey'/>" +
	"Public Key:" +
	"<div class='input-group'><input class='form-control' type='text' value='' id='base58AccountPublicKey'/>&nbsp;<input class='btn btn-default' type='button' value='Convert' onclick='doAccountAddressFromPublicKey()'/></div>" +
	"Address:" +
	"<input class='form-control' type='text' value='' readonly id='base58AccountAddress'/><br>" +
	"</div></div>" +
	"</div>";

	var seedSet = "<div class='alert alert-success'>" +
	"<strong>Success!</strong> Account seed set."+
	  "</div>";
	  
	var seedRm = "<div class='alert alert-success'>" +
	  "<strong>Success!</strong> Account seed removed."+
		"</div>";
		