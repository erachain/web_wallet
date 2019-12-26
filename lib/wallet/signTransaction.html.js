const signTransaction =
    "<h5>Sign Transaction</h5>" +
    "<div class='form-group'>" +
    "<div class='card'>" +
    "<div class='card-header'>Guarantor</div>" +
    "<div class='card-block'>" +
    "Account address:<br>" +
    "<input readonly class='form-control' type='text' value='' id='base58SenderAccountAddress'>" +
    "</div></div>" +
    "<div style='margin-top:10px;' class='card'>" +
    "<div class='card-header'>Sign Transaction</div>" +
    "<div class='card-block'>" +
    "<div class='container'>" +
    "<div class='row'>" +
    "<div class='col-sm'>" +
    "Block height & Transaction number in block<br>" +
    "<div style='padding-top: 5px;' class='input-group'>" +
    "<input class='form-control' type='text' value='234743' id='block-height' onkeyup='only_integer(this)'>&nbsp;" +
    "<input class='form-control' type='text' value='1' id='transaction-number' onkeyup='only_integer(this)'>&nbsp;" +
    "<input class='btn btn-default' type='button' value='Get Info' onclick='requestSignTransaction()'>" +
    "</div>" +
    "</div>" +
    "<div class='col-sm'>" +
    "<div style='margin-top:12px;overflow: hidden' id='transaction-info'></div>" +
    "</div>" +
    "</div>" +
    "</div>" +
    "</div></div>" +
    "<div style='margin-top:10px;' class='card'>" +
    "<div class='card-header'>Transaction</div>" +
    "<div class='card-block'>" +
    "WEB URL:<br>" +
    "<input class='form-control' type='text' value='127.0.0.1:9067' id='nodeUrl'/>" +
    "<input style='margin-top:10px;' class='btn btn-default btn-block' type='button' id='generateTransaction' value='Generate RAW Transaction' onclick='signTransactionDoPaymentTransaction()'>" +
    "<textarea style='margin-top:10px;' class='form-control' rows=7 id=txRaw></textarea>" +
    "<input style='margin-top:10px;' class='btn btn-default btn-block' type='button' value='POST Process' onclick='doPostProcess()'>" +
    "Result:<br>" +
    "<textarea class='form-control' rows=7 id=output></textarea>";