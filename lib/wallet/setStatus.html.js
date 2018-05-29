var setStatus = "<h5>Set Status</h5>" +
    "<div class='form-group'>" +
    "<div class='card'>" +
    "<div class='card-header'>Sender</div>" +
    "<div class='card-block'>" +
    //"Account seed:<br>"+
    //"<div class='input-group'><input autofocus readonly class='form-control' type='text' value='' id='base58SenderAccountSeed'></div>" +
    "Account address:<br>" +
    "<div class='input-group'><input class='form-control' readonly type='text' value='' id='base58SenderAccountAddress'></div>" +
    "</div></div>" +
    "<div style='margin-top:10px;' class='card'>" +
    "<div class='card-header'>Set Status</div>" +
    "<div class='card-block'>" +
    "Description<br>"+
    "<textarea class='form-control' rows=4 style='width:100%; height: 45px;' id='description'></textarea>"+
    "<div class='input-group' style='margin-top:20px;'><p style='min-width:120px;'>Status Key:</p><input class='form-control' style='width:80px;' type='text' value='1' id='statuskey'>&nbsp;"+
    "<p style='min-width:120px;'>Item Key:</p><input class='form-control' style='width:80px;' type='text' value='1' id='itemkey'>&nbsp;"+
    "<p style='min-width:120px;'>Item Type:</p>"+
    "<select style='min-width:160px;' class='form-control' id='itemtype'>" +
	"<option value='1'>ASSET TYPE</option><option value='2'>IMPRINT TYPE</option><option value='3'>NOTE TYPE</option><option value='4' selected >PERSON TYPE</option><option value='5'>STATUS TYPE</option><option value='6'>UNION TYPE</option></select></div>"+
    "<div class='input-group' style='margin-top:20px;'>"+
    "Start day: <input class='form-control' type='text' value='12/31/2017' id='startday'>"+
    "&nbsp;End day:<input class='form-control' type='text' value='01/31/2019' id='endday'></div>"+
    "<div class='input-group' style='margin-top:20px;'>"+
    "<p style='min-width:120px;'>Value1 (%1):</p><input class='form-control' type='text' value='' id='value1'><p style='min-width:120px;'>&nbsp;Value2 (%2):</p><input class='form-control' type='text' value='' id='value2'></div>"+
	"<div class='input-group' style='margin-top:20px;'>"+
    "<p style='min-width:120px;'>String1 (%3):</p><input class='form-control' type='text' value='' id='string1'><p style='min-width:120px;'>&nbsp;String2 (%4):</p><input class='form-control' type='text' value='' id='string2'></div>"+
    //"<div style='margin-top: 10px;' class='input-group'><p style='min-width:150px;'>Timestamp:</p><input style='max-width:250px;' class='form-control' type='text' value='' id='timestamp'>" +
    //"<p style='min-width:120px; margin-left:20px;'>DateTime:</p><input class='form-control' class='readonly' readonly type='text' value='' id='datetime'>&nbsp;" +
    //"<input class='btn btn-default' type='button' value='Now' onclick='doNowTime()'></div>" +
    "</div></div>"+
    "<div style='margin-top: 10px;' class='card'>" +
    "<div class='card-header'>Transaction</div>" +
    "<div class='card-block'>" +
    "WEB URL:<input readonly class='form-control' type='text' value='127.0.0.1:9067' id='nodeUrl'>" +
	"<input style='margin-top: 10px;' class='btn btn-default btn-block' type='button' id='generateTransaction' value='Generate RAW Transaction' onclick='setStatusDoPaymentTransaction()'><br>" +
	"<textarea class='form-control' rows='5' id=txRaw></textarea><br>	</td>"+
	"<input style='margin-top:10px;' class='btn btn-default btn-block' type='button' value='POST Process' onclick='doPostProcess()'><br>"+
	"Result:<br>"+
    "<textarea class='form-control' rows='5' id=output></textarea><br>" +
    "</div></div>";