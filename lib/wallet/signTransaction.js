function signTransactionDoPaymentTransaction() {
    let timestamp = parseInt(doNowTime()),
        blockHeight = $('#block-height').val(),
        transNumber = $('#transaction-number').val(),
        port = appData.getUrlPort();

    $("#txRaw").val(Base58.encode(R_Vouch(appData.keyPair, timestamp, blockHeight, transNumber, port)));
    askPOSTProcess();
}

function requestSignTransaction() {
    let block_height = $('#block-height').val(),
        transaction_number = $('#transaction-number').val();

    let httpRequest = typeof XMLHttpRequest != 'undefined'
        ? new XMLHttpRequest()
        : new ActiveXObject('Microsoft.XMLHTTP');

    let requestUrl = appData.nodeUrl + "/apirecords/getbynumber/" + block_height + '-' + transaction_number;

    httpRequest.open('GET', requestUrl, true);
    httpRequest.onreadystatechange = function () {
        if (httpRequest.readyState === XMLHttpRequest.DONE && this.status === 200) {
            try {
                let transaction_info = JSON.parse(this.responseText),
                    html = '<table class="mail-table">';

                Object.keys(transaction_info).map(function (key) {
                    html += "<tr>" +
                        "<td>" + key + "</td>" +
                        "<td>" + transaction_info[key] + "</td>" +
                        "</tr>";
                });

                html += '</table>';

                document.getElementById("transaction-info").innerHTML = html;
            } catch (e) {
            }
        }
    };

    httpRequest.send();
}

function signTransactionLoad() {
    $("#nodeUrl").val(appData.nodeUrl);
    $("#base58SenderAccountAddress").val(appData.base58AccountAddress);
}