var inboxMail = "<h5><a href='javascript:' class='link__back' data-mail-type='' onclick='menuClick(\"inboxMails\", this.dataset.mailType)'>&larr;</a> Mail: <span id='mailTitle'></span></h5>" +
"<ul class='nav nav-tabs'>" +
    "<li class='nav-item'><a class='nav-link active' data-toggle='tab' href='#mailContent'>Content</a></li>" +
    "<li class='nav-item'><a class='nav-link' data-toggle='tab' href='#mailReply' id='amailReply'>Reply</a></li>" +
"</ul>" +
"<div class='tab-content'>" +
"<div class='tab-pane active' id='mailContent'><br>" +
    "<div class='container' style='margin-top:10px;' id='inboxMailContent'>" +
    "<table class='mail-table'>" +
    "<tr>" +
    "<td>Height</td>" +
    "<td id='mail-table-height'></td>" +
    "<td></td>" +
    "<td>Date</td>" +
    "<td id='mail-table-date'></td>" +
    "</tr>" +
    "<tr>" +
    "<td>Sender</td>" +
    "<td id='mail-table-creator'></td>" +
    "<td></td>" +
    "<td>Recipient</td>" +
    "<td id='mail-table-recipient'></td>" +
    "</tr>" +
    "<tr>" +
    "<td>Title</td>" +
    "<td colspan='4' id='mail-table-title'></td>" +
    "</tr>" +
    "<tr>" +
    "<td>Message</td>" +
    "<td colspan='4' id='mail-table-message'></td>" +
    "</tr>" +
    "</table>" +
    "</div>" +
"</div>"+
"<div class='tab-pane' id='mailReply'><br>"+
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
    "Title:<br>" +
    "<div class='input-group'><input class='form-control' type='text' value='' id='title'></div>" +
    "Message:<br>" +
    appData.getDescriptionHTML(true) +
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
    "</div>"+
"</div>"+
"</div>";