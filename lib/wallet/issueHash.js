var hash_files = [];

function issueHashDoUpdate() {
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

function issueHashDoPaymentTransaction() {
    var base58SenderAccountSeed = document.getElementById('base58SenderAccountSeed').value;
    var senderAccountSeed = Base58.decode(base58SenderAccountSeed);
    if(senderAccountSeed.length != 32) {
        $('#base58SenderAccountAddress').val('');
        $("#output").val("invalid seed!");
        return;
    }
    keyPair = getKeyPairFromSeed(senderAccountSeed);
    var base58SenderAccountAddress = getAccountAddressFromPublicKey(keyPair.publicKey);
    $('#base58SenderAccountAddress').html(base58SenderAccountAddress);
    if($('#timestamp').val() == "") {
        doNowTime();
    }
    var timestamp = parseInt($('#timestamp').val());
    var title = $("#title").val();
    var description = $('#description').val();
    var hashes =[];
    var ii = 0;
    if (hash_files[1].length > 20) {
        hashes[ii] = Base58.decode(hash_files[1]);
        ii++;
    }
    if ($('#hash1').val().length > 20) {
        hashes[ii] = Base58.decode($('#hash1').val());
    }
    if (hashes.lingth == 0) return;
    var port = appData.getUrlPort();   
    $("#txRaw").val(Base58.encode(write_Hashes(keyPair, timestamp, title, hashes, description, port)));
}

function issueHashOnLoad() {
    $("#nodeUrl").val(appData.nodeUrl);
    $("#base58SenderAccountSeed").val(appData.base58AccountSeed);
    $("#base58SenderAccountAddress").val(appData.base58AccountAddress);
    document.getElementById('files').addEventListener('change', Hash_From_File, false);
    doNowTime();
}

function Hash_From_File(evt) {
    var files = evt.target.files; // FileList object
    // Loop through the FileList and render image files as thumbnails.
    for (var i = 0, f; f = files[i]; i++) {
        // Only process image files.
        var reader = new FileReader();
        // Read in the image file as a data URL.
        reader.readAsArrayBuffer(f); // readAsArrayBuffer(f);
        reader.onload = function(e) {
            imagebyte = new Uint8Array(e.target.result);
            hash_files[i] = Base58.encode(SHA256.digest(imagebyte));
            // var  base64String = btoa(String.fromCharCode.apply(null, imagebyte)); 
            var ss = hash_files[i];
            $("#file_Hash").html(ss);
        }
    }
}