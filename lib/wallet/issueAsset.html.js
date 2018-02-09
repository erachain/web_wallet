var issueAsset = "<h5>Issue Asset</h5>" +
	"<div class='form-group'>" +
	"<div class='card'>" +
  	"<div class='card-header'>Sender</div>" +
	"<div class='card-block'>" +
	"Account seed:<br>"+
	"<div class='input-group'><input autofocus readonly class='form-control' type='text' value='' id='base58SenderAccountSeed'></div>" +
	"Account address:<br>" +
  	"<div class='input-group'><input class='form-control' readonly type='text' value='' id='base58SenderAccountAddress'></div>" +
    //"<div style='padding-top: 5px;' class='input-group'>Balance:&nbsp;<input class='form-control' readonly  type='text' value='0.0' id='senderBalance'>&nbsp;ERA</div>" +
	"<div style='padding-top: 5px;' class='input-group'>Timestamp:&nbsp;<input class='form-control' type='text' value='' id='timestamp'/>&nbsp;DateTime:&nbsp;<input class='form-control' readonly type='text' value='' id='datetime'>&nbsp;<input class='btn btn-default' type='button' value='Now' OnClick='doNowTime()'></div>" +
	"</div></div>" +
	"<div style='margin-top: 10px;' class='card'>" +
	"<div class='card-header'>Asset</div>" +
	"<div class='card-block'>" +
	"Name:<br>" +
    "<div class='input-group'><input class='form-control' type='text' id='nameAsset'/></div>" +
	"Image:<br><input type='file' id='files' class='btn btn-default btn-file' name='files[]'>" +
	"<span id='img' ></span><br>" +
	"Description:<br><textarea class='form-control' rows='7' id=description></textarea>" +
	"<div style='padding-top: 5px;' class='input-group'>" +
	"Quantity:&nbsp;<input class='form-control' type='text' value='0' id='quantity'/>&nbsp;" +
	"Scale:&nbsp;</span><input class='form-control' type='text' value='2' id='scale'/>&nbsp;" +
	"Divisible:&nbsp;</span><input class='form-control' type='checkbox' id='divisible'/>" +
	"Movable:&nbsp;</span><input class='form-control' type='checkbox' id='movable'/>" +
	"</div>" +
	"</div></div>" +
	"<div class='input-group'><input style='margin-top: 10px;' class='btn btn-default btn-block' type='button' id='generateTransaction' value='GET Transaction RAW' OnClick='issueAssetDoPaymentTransaction()'/></div>" +
    "<textarea style='margin-top: 5px;' class='form-control' id=txRaw></textarea><br>	" +
	"WEB URL: <input readonly class='form-control' type='text' value='127.0.0.1:9047' id='nodeUrl'/>" +
	"<input style='margin-top:10px;' class='btn btn-default btn-block' type='button' value='POST Process' OnClick='doPostProcess()'/><br><br>" +
	"Result:<br>" +
    "<textarea class='form-control' id=output></textarea><br>" +
    "</div>";