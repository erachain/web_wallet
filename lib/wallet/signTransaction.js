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
                let html = '';
                let transaction_info = JSON.parse(this.responseText);
                let data_preview = parseDataTransactionBE(transaction_info.height + '-' + transaction_info.sequence);

                if (data_preview.title !== undefined) {
                    html += '<div class="transaction-preview">';

                    if (data_preview.body !== undefined && typeof data_preview.body === 'string') {
                        let data = data_preview.body;
                        if (data.charAt(0) === '#') {
                            html += '<div class="transaction-preview__body">' + marked(data) + '</div>';
                        } else {
                            html += '<div class="transaction-preview__body">' + data + '</div>';
                        }
                    }

                    if (data_preview.message !== undefined && typeof data_preview.message === 'string') {
                        let message = data_preview.message;
                        if (message.charAt(0) === '#') {
                            html += '<div class="transaction-preview__message">' + marked(message) + '</div>';
                        } else {
                            html += '<div class="transaction-preview__message">' + message + '</div>';
                        }
                    }

                    if (data_preview.files !== undefined && typeof data_preview.files === 'string') {
                        let files = data_preview.files;
                        files = files.replace('../', appData.nodeUrl + '/');
                        html += '<div class="transaction-preview__files">';
                        html += '<p>Files:</p>';
                        let link = files.match(/href ='([^']*')/g);
                        link = link[0].replace("href =", "");
                        files = files.replace(link, encodeURI(link));
                        html += files;
                        html += '</div>';
                    }

                    html += '</div>';
                }

                html += '<table class="mail-table transaction-preview__table">';
                html += '<tr><th colspan="2">Transaction</th></tr>';

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