var transactions =  "<h5>Account transactions</h5>" +
    "<div class='card'>" +
    "<div class='card-header'>Owner Account</div>" +
    "<div class='card-block'>" +
    "Account address:<br>" +
    "<div class='input-group'><input class='form-control' readonly type='text' value='' id='base58SenderAccountAddress'></div>" +
    "</div></div>" +
    //"<div class='form-group>" +
    "<div style='margin-top:10px;' class='card'>" +
    "<div class='card-header'>History</div>" +
    "<div class='card-block'>" +
    "<div class='forging-checkbox'>" +
    "<input type='checkbox' id='forging-check' onchange='forgingToggle()'><label for='forging-check'>Hide forging</label>" +
    "</div>" +
    "<input style='margin-top:10px;' class='btn btn-default btn-block' type='button' value='Update' OnClick='requestTransactions()'/>" +
    "<div class='container' style='margin-top:10px;' id='transactionsList'>" +
    "</div>" +
    "</div>" +
    "</div></div>";