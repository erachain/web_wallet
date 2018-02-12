var enterPerson = "<h5>Send Person Info in ERaChain</h5>" +
    "<div class='form-group'>" +
    "<div class='card'>" +
    "<div class='card-header'>Regictrator</div>" +
    "<div class='card-block'>" +
	"Account Seed:<br><input readonly class='form-control' type='text' value='' id='base58SenderAccountSeed'>" +
	"Account address:<br><input readonly class='form-control' type='text' value='' id='base58SenderAccountAddress'>"+
    "</div></div>" +
    "Insert Person Info Byte:<br>" + 
    "<textarea class='form-control' rows=10 id=txRaw1></textarea>" +
	"<input style='margin-top:10px;' class='btn btn-default btn-block' type='button' id='parseinfo' value='Parse Info Byte to Person' OnClick='enterPersonParseinfo()'>" +
    "<div style='margin-top:10px;' class='card'>" +
    "<div class='card-header'>Person Parse Info</div>" +
    "<div class='card-block'>" +
	"Name:<br><td><input class='form-control' type='text' value='' id='namePerson'>" +
	"Description<br><textarea style='margin-bottom:10px;' class='form-control' rows=5 id=description></textarea>" +
	"<span id='img' ></span>"+
    "<div class='container' style='margin-top:10px;'>" +
    "<div class='row'>"+
    "<div class='col-sm'>birthday:<br><input class='form-control' type='text' value='02/24/1812' id='birthday'></div>" +
    "<div class='col-sm'>birthLatitude <a href=https://www.google.ru/maps/ target=_blank>get coordinates</a>:<br><input class='form-control' type='text' value='31.2' id='birthLatitude'></div>" +
    "</div><div class='row'>"+
    "<div class='col-sm'>deathday:<br><input class='form-control' type='text' value='06/17/1900' id='deathday'></div>" +
    "<div class='col-sm'>birthLongitude:<br><input class='form-control' type='text' value='141.3' id='birthLongitude'></div>" +
    "</div><div class='row'>"+
    "<div class='col-sm'>gender(0-m, 1-f):<br><input class='form-control' type='text' value='' id='gender'></div>" +
    "<div class='col-sm'>race:<br><input class='form-control' type='text' value='' id='race'></div>" +
    "</div><div class='row'>"+
    "<div class='col-sm'>height:<br><input class='form-control' type='text' value='' id='heightperson'></div>" +
    "<div class='col-sm'>hairColor:<br><input class='form-control' type='text' value='' id='hairColor'></div>" +
    "</div><div class='row'>"+
    "<div class='col-sm'>eyeColor:<br><input class='form-control' type='text' value='' id='eyeColor'></div>" + 
    //"<div class='col-sm'>skinColor:<br><input class='form-control' type='text' value='' id='skinColor'></div>" +
    "</div>" +
    "</div>" +
    "</div></div>" +
    "<div style='margin-top:10px;' class='card'>" +
    "<div class='card-header'>Transaction</div>" +
    "<div class='card-block'>" +
	"<div style='padding-top: 5px;' class='input-group'>Timestamp:&nbsp;<input class='form-control' type='text' value='' id='timestamp'/>&nbsp;DateTime:&nbsp;<input class='form-control' readonly type='text' value='' id='datetime'>&nbsp;<input class='btn btn-default' type='button' value='Now' OnClick='doNowTime()'></div>" +
    "WEB URL:<br><input class='form-control' readonly type='text' value='127.0.0.1:9067' id='nodeUrl'>"+
	"<input class='btn btn-default btn-block' style='margin-top:10px;' type='button' id='generateTransaction' value='Generate RAW Transaction' OnClick='enterPersonDoPaymentTransaction()'/>" +
	"<textarea style='margin-top:10px;' class='form-control' rows=7 id=txRaw></textarea>" +
	"<input style='margin-top:10px;' class='btn btn-default btn-block' type='button' value='POST Process' OnClick='doPostProcess()'>"+
	"Result:<br>"+
    "<textarea class='form-control' rows=7 id=output></textarea>" +
    "</div></div>";