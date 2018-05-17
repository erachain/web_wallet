var issueStatus = "<h5>ERA Issue Status</h5>"+
    "<div class='form-group'>" +
    "<div class='card'>" +
    "<div class='card-header'>Sender</div>" +
    "<div class='card-block'>" +
	//"Account seed:<br>"+
    //"<div class='input-group'><input autofocus readonly class='form-control' type='text' value='' id='base58SenderAccountSeed'></div>" +
    "Account address:<br>" +
    "<div class='input-group'><input class='form-control' readonly type='text' value='' id='base58SenderAccountAddress'></div>" +
    "</div></div>" +
    "<div style='margin-top:10px;' class='card'>" +
    "<div class='card-header'>New Status</div>" +
    "<div class='card-block'>" +
    "Title:<br>" +
    "<div class='input-group'><input class='form-control' type='text' value='' id='title'></div>"+
    "Description (%1, %2 - Numbers; %3, %4 - Strings):<br>" +
    "<div class='input-group'><textarea class='form-control' type='text' value='' id='description' rows=5></textarea></div>"+
    "Single:<br>" +
    "<div class='input-group'><input class='form-control' type='checkbox' value='' id='unique'></div>"+
    //"<div style='margin-top: 10px;' class='input-group'><p style='min-width:150px;'>Timestamp:</p><input style='max-width:250px;' class='form-control' type='text' value='' id='timestamp'>" +
    //"<p style='min-width:120px; margin-left:20px;'>DateTime:</p><input class='form-control' class='readonly' readonly type='text' value='' id='datetime'>&nbsp;" +
    //"<input class='btn btn-default' type='button' value='Now' onclick='doNowTime()'></div>" +
    "</div></div>" +
    "<div style='margin-top: 10px;' class='card'>" +
    "<div class='card-header'>Transaction</div>" +
    "<div class='card-block'>" +
    "WEB URL:<input readonly class='form-control' type='text' value='127.0.0.1:9067' id='nodeUrl'>" +
	"<input style='margin-top: 10px;' class='btn btn-default btn-block' type='button' id='generateTransaction' value='Generate RAW Transaction' onclick='issueStatusDoPaymentTransaction()'><br>" +
	"<textarea class='form-control' rows='5' id=txRaw></textarea><br>	</td>"+
	"<input style='margin-top:10px;' class='btn btn-default btn-block' type='button' value='POST Process' onclick='doPostProcess()'><br>"+
	"Result:<br>"+
    "<textarea class='form-control' rows='5' id=output></textarea><br>" +
    "</div></div>"+
    "</div>";