var orderDelete = "<h5>Delete Order</h5>"+
"<div class='form-group'>" +
"<div class='card'>" +
"<div class='card-header'>Sender</div>" +
"<div class='card-block'>" +
"Account seed:<br>"+
"<div class='input-group'><input autofocus readonly class='form-control' type='text' value='' id='base58SenderAccountSeed'></div>" +
"Account address:<br>" +
"<div class='input-group'><input class='form-control' readonly type='text' value='' id='base58SenderAccountAddress'></div>" +
"Balance:<br>" +
"<div class='input-group'><input class='form-control' readonly  type='text' value='' id='senderBalance'></div>" +
"</div></div>"+
"<div style='margin-top:10px;' class='card'>" +
"<div class='card-header'>Order signature (base58)</div>" +
"<div class='card-block'>" +    
"<input autofocus class='form-control' type='text' value='' id='sign'/>"+
"</div></div>"+
"<div style='margin-top:10px;' class='card'>" +
"<div class='card-header'>Transaction</div>" +
"<div class='card-block'>" +
"<div style='margin-top: 10px;' class='input-group'><p style='min-width:150px;'>Timestamp:</p><input style='max-width:250px;' class='form-control' type='text' value='' id='timestamp'>" +
"<p style='min-width:120px; margin-left:20px;'>DateTime:</p><input class='form-control' class='readonly' readonly type='text' value='' id='datetime'>&nbsp;" +
"<input class='btn btn-default' type='button' value='Now' onclick='doNowTime()'></div>" +
"WEB URL:<br><input class='form-control' readonly type='text' value='127.0.0.1' id='nodeUrl'/>"+
"<input class='btn btn-default btn-block' style='margin-top:10px;' type='button' id='generateTransaction' value='Generate RAW Transaction' onclick='orderDeleteDoPaymentTransaction()'/>"+
"<textarea style='margin-top:10px;' class='form-control' rows=7 id=txRaw></textarea>"+
"<input class='btn btn-default btn-block' style='margin-top:10px;' type='button' value='POST Process' onclick='doPostProcess()'>"+
"<br>Result:<br>"+
"<textarea class='form-control' rows=7 id=output></textarea>" +
"</div></div>" + 
"</div>";