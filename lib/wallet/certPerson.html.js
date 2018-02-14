var certPerson = "<h5>Certify Person</h5>" +
"<div class='form-group'>" +
"<div class='card'>" +
"<div class='card-header'>Regictrator</div>" +
"<div class='card-block'>" +
"Account Seed:<br><input readonly class='form-control' type='text' value='' id='base58SenderAccountSeed'>" +
"Account address:<br><input readonly class='form-control' type='text' value='' id='base58SenderAccountAddress'>"+
"</div></div>" +
"<div style='margin-top:10px;' class='card'>" +
"<div class='card-header'>Person</div>" +
"<div class='card-block'>" +
"Person Key(ID)<br><input class='form-control' type='text' value='1' id='personkey'>" +
"Day<br><input class='form-control' type='text' value='365' id='day'>"+
"Person public key:<br>" +
"<div style='padding-top: 5px;' class='input-group'><input class='form-control' type='text' value='' id='PersonPublicKey'>&nbsp;<input class='btn btn-default' type='button' value='Get Info' onclick='requestPersonByPublicKey()'></div>" +
"<div id='personInfo'></div>" +
"<div style='padding-top: 5px;' class='input-group'>Timestamp:&nbsp;<input class='form-control' type='text' value='' id='timestamp'/>&nbsp;DateTime:&nbsp;<input class='form-control' readonly type='text' value='' id='datetime'>&nbsp;<input class='btn btn-default' type='button' value='Now' onclick='doNowTime()'></div>" +
"</div></div>" +
"<div style='margin-top:10px;' class='card'>" +
"<div class='card-header'>Transaction</div>" +
"<div class='card-block'>" +
"WEB URL:<br><input class='form-control'type='text' value='127.0.0.1:9067' id='nodeUrl'/>" +
"<input style='margin-top:10px;' class='btn btn-default btn-block' type='button' id='generateTransaction' value='Generate RAW Transaction' onclick='certPersonDoPaymentTransaction()'>"+
"<textarea style='margin-top:10px;' class='form-control' rows=7 id=txRaw></textarea>"+
"<input style='margin-top:10px;' class='btn btn-default btn-block' type='button' value='POST Process' onclick='doPostProcess()'>"+
"Result:<br>"+
"<textarea class='form-control' rows=7 id=output></textarea>";