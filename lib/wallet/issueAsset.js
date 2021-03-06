var casheTimestamp = '';
var casheFee = '';
var casheAmount = '';
var imagebyte = '';

function issueAssetDoUpdate() {
    $('#base58SenderAccountAddress').html(appData.base58AccountAddress);
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
    var base58SenderAccountAddress = getAccountAddressFromPublicKey(appData.keyPair.publicKey);
    $('#base58SenderAccountAddress').val(base58SenderAccountAddress);
    if($('#base58LastReferenceOfAccount').val() == "" || $('#base58LastReferenceOfAccount').val() == 'false') {
        doLoadLastReference();
        sleep(200);
    }
    if($('#timestamp').val() == "") {
        doNowTime();
    }
    var quantity = $('#quantity').val();
    var timestamp = parseInt(doNowTime());
    var head = $("#nameAsset").val(); //"Проверка";
    var message = appData.getDescriptionValue();
    var icon = [0];
    var image = imagebyte;
    var port = appData.getUrlPort();
    var scale = $("#scale").val();
    var divisible = 0;
    if  ($('#divisible').prop('checked')) {
        divisible =1;
    }
    var movable = 0;
    if  ($('#movable').prop('checked')) {
       movable = 1;
    }
    // issue Asset transaction
    $("#txRaw").val(Base58.encode(issue_Asset(appData.keyPair, timestamp, head, icon, image, message, quantity, scale, divisible, movable, port)));
    askPOSTProcess();
}

function issueAssetonLoad() {
    document.getElementById('files').addEventListener('change', handleFileSelect, false);
    $("#base58SenderAccountAddress").val(appData.base58AccountAddress);
    $("#nodeUrl").val(appData.nodeUrl);
    $("#nameAsset").val('');
    simplemde = new SimpleMDE({ element: document.getElementById("MDdescription") });
    CKEDITOR.replace( 'description' );
}

