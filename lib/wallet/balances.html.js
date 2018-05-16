var balances = "<h5>Account balances</h5>"+
	"<div class='form-group'>" +
    "<div class='card'>" +
    "<div class='card-header'>Owner Account</div>" +
    "<div class='card-block'>" +
	"Account address:<br>" +
    "<div class='input-group'><input class='form-control' readonly type='text' value='' id='base58SenderAccountAddress'></div>" +
    "</div></div>" +
	"<div style='margin-top:10px;' class='card'>" +
    "<div class='card-header'>Account Balances</div>" +
    "<div class='card-block'>" +
    "<input style='margin-top:10px;' class='btn btn-default btn-block' type='button' value='Update' OnClick='requestBalances()'/>" +
    "<div class='container' style='margin-top:10px;' id='balancesList'>" +
    "</div>" +
    "</div></div>" +
	"</div>";