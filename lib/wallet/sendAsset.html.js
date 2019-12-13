var sendAsset = "<h5>Send Asset</h5>" +
    "<div class='form-group'>" +
    "<div class='card'>" +
    "<div class='card-header'>Sender</div>" +
    "<div class='card-block'>" +
    //"Account seed:<br>"+
    //"<div class='input-group'><input autofocus readonly class='form-control' type='text' value='' id='base58SenderAccountSeed'></div>" +
    "Account address:<br>" +
    "<div class='input-group'><input class='form-control' readonly type='text' value='' id='base58SenderAccountAddress'></div>" +
    "Balance:<br>" +
    "<div class='input-group'><input class='form-control' readonly  type='text' value='' id='senderBalance'></div>" +
    "</div></div>" +
	"<div style='margin-top: 10px;' class='card'>" +
    "<div class='card-header'>Recipient</div>" +
    "<div class='card-block'>" +
    "Account address:<br>" +
	"<div class='input-group'><input class='form-control' type='text' value='' id='base58RecipientAccountAddress'></div>"+
	"<div style='margin-top: 10px; margin-bottom: 10px;' class='input-group'>Balance: <div id='recipientBalance'></div></div>" +
    "<div class='input-group'><p style='min-width:150px;'>Asset Key:</p><input style='max-width:250px;' class='form-control' type='text' value='1' id='assetkey' onkeydown=\"if (event.keyCode==13) { sendAssetDoUpdate(); }\";>&nbsp;" +
    "<input style='max-width:90px;' class='btn btn-default' type='button' value='Search' onclick='sendAssetDoUpdate()'>" +
	"<p style='min-width:120px; margin-left:20px;'>Quantity:</p><input class='form-control' type='text' value='1' id='quantity' oninput='validAmountScale(this)' onfocus='sendAssetDoUpdate()'></div>" +
    //"<div style='margin-top: 10px;' class='input-group'><p style='min-width:150px;'>Timestamp:</p><input style='max-width:250px;' class='form-control' type='text' value='' id='timestamp'>" +
    //"<p style='min-width:120px; margin-left:20px;'>DateTime:</p><input class='form-control' class='readonly' readonly type='text' value='' id='datetime'>&nbsp;" +
    //"<input class='btn btn-default' type='button' value='Now' onclick='doNowTime()'></div>" +
    "Title:<br>" +
	"<div class='input-group'><input class='form-control' type='text' value='' id='title'></div>" +
    "Message:<br>" +
    appData.getDescriptionHTML() +
    "</div></div>" +
    "<div style='margin-top: 10px;' class='card'>" +
    "<div class='card-header'>Transaction</div>" +
    "<div class='card-block'>" +
    "WEB URL:<input readonly class='form-control' type='text' value='127.0.0.1:9067' id='nodeUrl'>" +
	"<input style='margin-top: 10px;' class='btn btn-default btn-block' type='button' id='generateTransaction' value='Generate RAW Transaction' onclick='sendAssetDoPaymentTransaction()'><br>" +
	"<textarea class='form-control' rows='5' id=txRaw></textarea><br>	</td>"+
	"<input style='margin-top:10px;' class='btn btn-default btn-block' type='button' value='POST Process' onclick='doPostProcess()'><br>"+
	"Result:<br>"+
    "<textarea class='form-control' rows='5' id=output></textarea><br>" +
    "</div></div>"+
    "</div>";