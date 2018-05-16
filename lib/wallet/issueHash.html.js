var issueHash = "<h5>Issue Hash</h5>" +
"<div class='form-group'>" +
"<div class='card'>" +
"<div class='card-header'>Sender</div>" +
"<div class='card-block'>" +
//"Account seed:<br>"+
//"<div class='input-group'><input autofocus readonly class='form-control' type='text' value='' id='base58SenderAccountSeed'></div>" +
"Account address:<br>" +
"<div class='input-group'><input class='form-control' readonly type='text' value='' id='base58SenderAccountAddress'></div>" +
//"<div style='padding-top: 5px;' class='input-group'>Timestamp:&nbsp;<input class='form-control' type='text' value='' id='timestamp'/>&nbsp;DateTime:&nbsp;<input class='form-control' readonly type='text' value='' id='datetime'>&nbsp;<input class='btn btn-default' type='button' value='Now' OnClick='doNowTime()'></div>" +
"</div></div>" +
"<div style='margin-top: 10px;' class='card'>" +
"<div class='card-header'>Document</div>" +
"<div class='card-block'>" +
"Title:<br>" +
"<div class='input-group'><input class='form-control' type='text' id='title'/></div>" +
"Description:<br>" +
"<div class='input-group'><input class='form-control' type='text' id='hashDescription'/></div>" +
"From file:<br><input type='file' id='files' class='btn btn-default btn-file' name='files[]'><span id='file_Hash' ></span><br>" +
"Hash1 (Base58):<br>" +
"<div class='input-group'><input class='form-control' type='text' id='hash1'/></div>" +
"</div></div>" +
"<div style='margin-top:10px;' class='card'>" +
"<div class='card-header'>Transaction</div>" +
"<div class='card-block'>" +	
"WEB URL:<br><input class='form-control' readonly type='text' value='127.0.0.1:9067' id='nodeUrl'>"+
"<input class='btn btn-default btn-block' style='margin-top:10px;' type='button' id='generateTransaction' value='Generate RAW Transaction' onclick='issueHashDoPaymentTransaction()'>" +
"<textarea style='margin-top:10px;' class='form-control' rows=7 id=txRaw></textarea>" +
"<input style='margin-top:10px;' class='btn btn-default btn-block' type='button' value='POST Process' onclick='doPostProcess()'>"+
"Result:<br>"+
"<textarea class='form-control' rows=7 id=output></textarea>" +
"</div></div>";   