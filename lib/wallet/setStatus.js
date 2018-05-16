var casheBase58addressSeed = '';
var casheBase58SenderAccountAddress = '';
var casheBase58RecipientAccountAddress = '';
var casheTimestamp = '';
var casheFee = '';
var casheAmount = '';


function setStatusDoUpdate() 
{
    $('#base58SenderAccountAddress').html(appData.base58AccountAddress);
    var timestamp = doNowTime();
    
}

function setStatusDoPaymentTransaction() {
    $('#base58SenderAccountAddress').html(appData.base58AccountAddress);
    var timestamp = parseInt($('#timestamp').val());
    var description = $('#description').val();
    var status_Key = $('#statuskey').val();
    var item_Type = $('#itemtype').val(); //4; // ASSET_TYPE = 1; IMPRINT_TYPE = 2;	NOTE_TYPE = 3; PERSON_TYPE = 4;	STATUS_TYPE = 5; UNION_TYPE = 6;
    var item_Key = $('#itemkey').val(); //2; 
    dataS = new Date($('#startday').val());
    var date_Start = dataS.getTime();
    dataE = new Date($('#endday').val());
    var date_End = dataE.getTime();
    var value1 = $('#value1').val(); //3;
    var value2 = $('#value2').val(); //1;
    var string1 = $('#string1').val(); //"����������� ������";
    var string2 = $('#string2').val(); //"���������� ��������";
    var refToParent = 0;
    var port = appData.getUrlPort();
    $("#txRaw").val(Base58.encode(R_SetStatusToItem(appData.keyPair, timestamp, status_Key, item_Type, item_Key, date_Start, date_End, value1, value2, string1, string2, refToParent, description, port)));
    $("#myLink").html('<a href="' + $("#nodeUrl").val() + '/api/broadcast/' + $("#txRaw").val() +'">' + $("#nodeUrl").val() + '/api/broadcast/' + $("#txRaw").val() +'</a>');
}

function setStatusOnLoad() {
    $("#nodeUrl").val(appData.nodeUrl);
	$("#base58SenderAccountAddress").val(appData.base58AccountAddress);
}
