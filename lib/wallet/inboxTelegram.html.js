var inboxTelegrams = "<h5>Telegrams</h5>" +
"<ul class='nav nav-tabs'>" +
    "<li class='nav-item'><a class='nav-link active' data-toggle='tab' href='#telegramsInbox' id='atelegramsInbox'>Inbox</a></li>" +
    //"<li class='nav-item'><a class='nav-link' data-toggle='tab' href='#telegramsOutbox' id='atelegramsOutbox'>Outbox</a></li>" +
    "<li class='nav-item'><a class='nav-link' data-toggle='tab' href='#telegramsSend' id='atelegramsSend'>Send</a></li>" +
"</ul>" +
"<div class='tab-content'>" +
"<div class='tab-pane active' id='telegramsInbox'><br>" +
    "<input style='margin-top:10px;' class='btn btn-default btn-block' type='button' value='Update' OnClick='requestTelegrams(\"in\")'/>" +
    "<div class='container' style='margin-top:10px;' id='inboxTelegramsList'>" +
    "</div>" +
"</div>"+
//"<div class='tab-pane' id='telegramsOutbox'><br>"+
//    "<input style='margin-top:10px;' class='btn btn-default btn-block' type='button' value='Update' OnClick='requestTelegrams(\"out\")'/>" +
//    "<div class='container' style='margin-top:10px;' id='outboxTelegramsList'>" +
//    "</div>" +
//"</div>"+
"<div class='tab-pane' id='telegramsSend'><br>"+
    "<div class='form-group'>" +
    "<div class='card'>" +
    "<div class='card-header'>Sender</div>" +
    "<div class='card-block'>" +
    "Account address:<br>" +
    "<div class='input-group'><input class='form-control' readonly type='text' value='' id='base58SenderAccountAddress'></div>" +
    "</div></div>" +
    "<div style='margin-top: 10px;' class='card'>" +
    "<div class='card-header'>Recipient</div>" +
    "<div class='card-block'>" +
    "Account address:<br>" +
    "<div class='input-group'><input class='form-control' type='text' value='' id='base58RecipientAccountAddress'></div>"+
    //"<div style='margin-top: 10px;' class='input-group'><p style='min-width:150px;'>Timestamp:</p><input style='max-width:250px;' class='form-control' type='text' value='' id='timestamp'>" +
    //"<p style='min-width:120px; margin-left:20px;'>DateTime:</p><input class='form-control' class='readonly' readonly type='text' value='' id='datetime'>&nbsp;" +
    //"<input class='btn btn-default' type='button' value='Now' onclick='doNowTime()'></div>" +
    "Title:<br>" +
    "<div class='input-group'><input class='form-control' type='text' value='' id='title'></div>" +
    "Message:<br>" +
    appData.getDescriptionHTML(true) +
    "</div></div>" +
    "<div style='margin-top: 10px;' class='card'>" +
    "<div class='card-header'>Transaction</div>" +
    "<div class='card-block'>" +
    "WEB URL:<input readonly class='form-control' type='text' value='127.0.0.1:9067' id='nodeUrl'>" +
    "<input style='margin-top: 10px;' class='btn btn-default btn-block' type='button' id='generateTransaction' value='Generate RAW Transaction' onclick='sendAssetDoPaymentTransaction(\"telegram\")'><br>" +
    "<textarea class='form-control' rows='5' id=txRaw></textarea><br>	</td>"+
    "<input style='margin-top:10px;' class='btn btn-default btn-block' type='button' value='POST Process' onclick='doPostProcessTelegram()'><br>"+
    "Result:<br>"+
    "<textarea class='form-control' rows='5' id=output></textarea><br>" +
    "</div></div>"+
    "</div>"+
"</div>"+
"</div>";