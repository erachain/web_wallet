var casheBase58addressSeed = '';
var casheBase58SenderAccountAddress = '';
var casheBase58RecipientAccountAddress = '';
var casheTimestamp = '';
var casheFee = '';
var casheAmount = '';


function setStatusDoUpdate() 
{
    var base58addressSeed = $('#base58SenderAccountSeed').val();

    if ((base58addressSeed != '') && (casheBase58addressSeed != base58addressSeed)) {
        casheBase58addressSeed = base58addressSeed;
        if (Base58.decode(base58addressSeed).length == 32) {
            keyPair = getKeyPairFromSeed(base58addressSeed, false);
            
            var base58SenderAccountAddress = getAccountAddressFromPublicKey(keyPair.publicKey);
            
            $('#base58SenderAccountAddress').html(base58SenderAccountAddress);	
            
        } else {
            $('#base58SenderAccountAddress').val('');
        }
    
    }
    
    var base58SenderAccountAddress = $('#base58SenderAccountAddress').html();

    if ((base58SenderAccountAddress != '') && (casheBase58SenderAccountAddress != base58SenderAccountAddress)) {
        casheBase58SenderAccountAddress = base58SenderAccountAddress;
        doLoadBalance(base58SenderAccountAddress, $('#senderBalance'));
    }
    
    var timestamp = $('#timestamp').val();
            
    if (!(timestamp == '' || casheTimestamp == timestamp)) {
        casheTimestamp = timestamp;
        
        if (! isNaN(casheTimestamp)) {

            var date = new Date(parseInt(casheTimestamp));
            $('#datetime').val(date.toLocaleDateString() + ' ' + date.toLocaleTimeString());
            
        } else {
            $('#datetime').val('');
        }
    }
    
}

function setStatusDoPaymentTransaction() {

    var base58SenderAccountSeed = document.getElementById('base58SenderAccountSeed').value;
    
    var senderAccountSeed = Base58.decode(base58SenderAccountSeed);
    
    if(senderAccountSeed.length != 32) {
        $('#base58SenderAccountAddress').val('');
        $("#output").val("invalid seed!");
        return;
    }
    
    if($('#timestamp').val() == "") {
        doNowTime();
    }
        
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

    $("#txRaw").val(Base58.encode(R_SetStatusToItem(keyPair, timestamp, status_Key, item_Type, item_Key, date_Start, date_End, value1, value2, string1, string2, refToParent, description, port)));
    $("#myLink").html('<a href="' + $("#nodeUrl").val() + '/api/broadcast/' + $("#txRaw").val() +'">' + $("#nodeUrl").val() + '/api/broadcast/' + $("#txRaw").val() +'</a>');
}

function setStatusOnLoad()
{
    $("#nodeUrl").val(appData.nodeUrl);
    doNowTime();
    $("#base58SenderAccountSeed").val(appData.base58AccountSeed);
	$("#base58SenderAccountAddress").val(appData.base58AccountAddress);
}
