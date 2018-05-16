var certPerson = "<h5>Confirm Person</h5>" +
"<div class='form-group'>" +
"<div class='card'>" +
"<div class='card-header'>Registrator</div>" +
"<div class='card-block'>" +
//"Account Seed:<br><input readonly class='form-control' type='text' value='' id='base58SenderAccountSeed'>" +
"Account address:<br><input readonly class='form-control' type='text' value='' id='base58SenderAccountAddress'>"+
"</div></div>" +
"<div style='margin-top:10px;' class='card'>" +
"<div class='card-header'>Person</div>" +
"<div class='card-block'>" +
"<div class='container'>" +
"<div class='row'>"+
"<div class='col-sm'>"+
"Person Key (ID)<br><div style='padding-top: 5px;' class='input-group'><input class='form-control' type='text' value='1' id='personkey'>&nbsp;" +
"<input class='btn btn-default' type='button' value='Get Info' onclick='requestPersonByIdCert()'></div>"+
"<div style='min-height:100px;' id='personInfo'></div>" +
"Day:<br><input class='form-control' type='text' value='365' id='day'>"+
"Person public key:<br>" +
"<input class='form-control' type='text' value='' id='PersonPublicKey'>" +
"</div>"+
"<div class='col-sm'>"+
"<div style='margin-top:12px;' id='img'></div>"+
"</div>"+
"</div>"+
"</div>"+
//"<div style='padding-top: 5px;' class='input-group'>Timestamp:&nbsp;<input class='form-control' type='text' value='' id='timestamp'/>&nbsp;DateTime:&nbsp;<input class='form-control' readonly type='text' value='' id='datetime'>&nbsp;<input class='btn btn-default' type='button' value='Now' onclick='doNowTime()'></div>" +
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