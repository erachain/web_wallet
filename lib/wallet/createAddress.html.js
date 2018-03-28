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
		"<div id='BIP39passcode'></div><br>"+
		"Base Seed:<br>" +
		"<div class='input-group'><input class='form-control' type='text' size=60 value='' id='base58BaseSeedWallet'/>&nbsp;&nbsp;<input class='btn btn-default' type='button' id='doBrainButton' value='generate seed by BIP39' OnClick='generateSeedBIP39()'/></div><br>" +	
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
		"<div class=form-group><div class='pull-right'><button class='btn btn-outline-success my-2 my-sm-0' onclick='openHelpDev()'><i class='fa fa-question'></i></button></div></div><br>" +
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
		
	var devHelp = "<div class='card'>" +
	"<div class='card-header'>Справка по функциям страницы входа web версии Erachain Walle</div>" +
	"<div class='card-block'>" + 
	"В Erachain существует понятие кошелька, который создается из base seed. К кошельку есть  пароль доступа -  password. В кошельке хранятся privat keys и соответствующие им public keys. Из public keys создаются счета - address или account.<br><br>"+
	"Из мобильного кошелька возможно экспортировать private key и управлять соответствующим этому ключу счетом в веб версии. Причем у каждого счета будет свой account seed, private и public keys.<br>"+
	"В свою очередь бесконечное чило account seed создается из одного base seed.<br>"+
	"Таким образом зная base seed вы сможете восстановить все ключи из одного кошелька и все его счета.<br><br>"+
	"generate BIP39 - генерирует в поле passcode string набор слов на английском языке согласно спецификации Bitcoin BIP39. Набор может быть записан человеком без ошибок, в отличие от сгенерированного секретного ключа.<br>"+
	"get Account Seed - из поля passcode string вычисляет account seed. Из одинакового passcode всегда будет получаться одинаковый seed.<br>"+
	"WEB URL: по умолчанию сервер для разработчиков (http://datachain.world:9067), для боевой версии нужно указать http://datachain.world:9047 и нажать кнопку Save.<br>"+
	"Save - сохраняет в кошельке указанную в поле WEB URL ссылку на API Erfachain.<br>"+
	"get Private key - по введенному account seed генерирует privat key.<br>"+
	"Log in - сохраняет в кошельке privat key для использования функций кошелька.<br>"+
	"get Address - преобразует public key в address.<br><br>"+
	"<button id='logButton' class='btn btn-outline-success my-2 my-sm-0' type='submit' onclick='logAction()'>Back</button><br><br>"+
	"</div></div><br><br>";