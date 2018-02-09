var casheBase58addressSeed = '';
var casheBase58SenderAccountAddress = '';
var casheBase58RecipientAccountAddress = '';
var casheTimestamp = '';
var casheFee = '';
var casheAmount = '';
var imagebyte = '';
 
function issueAssetDoUpdate() 
{
    var base58addressSeed = $('#base58SenderAccountSeed').val();
    if ((base58addressSeed != '') && (casheBase58addressSeed != base58addressSeed)) {
        casheBase58addressSeed = base58addressSeed;
        if (Base58.decode(base58addressSeed).length == 32) {
            keyPair = getKeyPairFromSeed(base58addressSeed, false);
            var base58SenderAccountAddress = getAccountAddressFromPublicKey(keyPair.publicKey);
            $('#base58SenderAccountAddress').val(base58SenderAccountAddress);	
        } else {
            $('#base58SenderAccountAddress').val('');
        }
    }
    var base58SenderAccountAddress = $('#base58SenderAccountAddress').val();
    if ((base58SenderAccountAddress != '') && (casheBase58SenderAccountAddress != base58SenderAccountAddress)) {
        casheBase58SenderAccountAddress = base58SenderAccountAddress;
    }
    var base58RecipientAccountAddress = $('#base58RecipientAccountAddress').val();
    if ((base58RecipientAccountAddress != '') && (casheBase58RecipientAccountAddress != base58RecipientAccountAddress)) {
        casheBase58RecipientAccountAddress = base58RecipientAccountAddress;
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
    if($('#fee').val() != casheFee) {
        var caretPosition = getTextCursorPosition($('#fee'))
        var removeCommasBuf = removeAllexceptDotAndNumbers($('#fee').val());
        if(removeCommasBuf != $('#fee').val()) {
            $('#fee').val(removeCommasBuf);
            setTextCursorPosition($('#fee'), caretPosition - 1);
        }
        casheFee = $('#fee').val();
    }
}

function issueAssetDoPaymentTransaction() {
    var base58SenderAccountSeed = document.getElementById('base58SenderAccountSeed').value;
    var senderAccountSeed = Base58.decode(base58SenderAccountSeed);
    if(senderAccountSeed.length != 32) {
        $('#base58SenderAccountAddress').val('');
        $("#output").val("invalid seed!");
        return;
    }
    keyPair = getKeyPairFromSeed(senderAccountSeed);
    var base58SenderAccountAddress = getAccountAddressFromPublicKey(keyPair.publicKey);
    $('#base58SenderAccountAddress').val(base58SenderAccountAddress);
    if($('#base58LastReferenceOfAccount').val() == "" || $('#base58LastReferenceOfAccount').val() == 'false') {
        doLoadLastReference();
        sleep(200);
    }
    if($('#timestamp').val() == "") {
        doNowTime();
    }
    var quantity = $('#quantity').val();
    var timestamp = parseInt($('#timestamp').val());
    var head = $("#nameAsset").val(); //"Проверка";
    var message = $("#description").val();
    var icon = [0];
    var image = imagebyte;
    var port = appData.getUrlPort();
    var scale = $("#scale").val();
    var divisible = 0;
    if  ($('#divisible').prop('checked')) {
        divisible =1;
    }
    var movable = 0;
    //if  ($('#movable').prop('checked')) {
    //   movable = 1;
    //}
    // issue Asset transaction
    $("#txRaw").val(Base58.encode(issue_Asset(keyPair, timestamp, head, icon, image, message, quantity, scale, divisible, movable, port)));
    var a = $("#txRaw").val().length;
    if($("#txRaw").val().length < 1250) { 
        $("#myLink").html('<a href="' + appData.nodeUrl + '/api/broadcast/' + $("#txRaw").val() +'">' + appData.nodeUrl + '/api/broadcast/' + $("#txRaw").val() +'</a>');
    }
}

function issueAssetonLoad()
{
    document.getElementById('files').addEventListener('change', handleFileSelect, false);
    $("#nodeUrl").val(appData.nodeUrl);
    $("#base58SenderAccountSeed").val(appData.base58AccountSeed);
    $("#base58SenderAccountAddress").val(appData.base58AccountAddress);
    $("#nameAsset").val('');
    doNowTime();
}

