function getMail(params) {
    params = unserialize(params);

    httpRequest('GET', "/apirecords/get/" + params.signature, function (data) {
        let mailData = JSON.parse(data);

        document.getElementById('mailTitle').innerHTML = mailData.title;
        document.getElementById('title').value = 'Re: ' + mailData.title;
        document.getElementsByClassName('link__back')[0].dataset.mailType = params.type;
        document.getElementById('mail-table-height').innerHTML = mailData.height + '-' + mailData.sequence;
        document.getElementById('mail-table-date').innerHTML = new Date(mailData.timestamp);
        document.getElementById('mail-table-creator').innerHTML =
            '<a href="' + appData.nodeUrl + '/index/blockexplorer.html?address=' + mailData.creator +
            '" target="_blank">' + mailData.creator + '</a>';
        document.getElementById('mail-table-recipient').innerHTML =
            '<a href="' + appData.nodeUrl + '/index/blockexplorer.html?address=' + mailData.recipient +
            '" target="_blank">' + mailData.recipient + '</a>';
        document.getElementById('mail-table-title').innerHTML = mailData.title;

        if (params.type === 'in') {
            document.getElementById('base58RecipientAccountAddress').value = mailData.creator;
        } else {
            document.getElementById('base58RecipientAccountAddress').value = mailData.recipient;
            document.getElementById('amailReply').innerHTML = 'Add letter';
        }

        if (mailData.encrypted) {
            document.getElementById('mail-table-message').innerHTML = '<span class="message__encrypted">Encrypted</span>';

            let public_key;
            if (params.type === 'in') {
                public_key = getPublicKeyToAddress(mailData.creator);
            } else {
                public_key = getPublicKeyToAddress(mailData.recipient);
            }

            $('#inboxMailContent').append('<a href="javascript:" class="button__mail" onclick="mail_encrypted(\'' + mailData.message + '\', \'' + public_key + '\')">Decrypted</a>')
        } else {
            document.getElementById('mail-table-message').innerHTML = correctMailContent(mailData.data);
        }
    })
}

function inboxMailOnLoad(params) {
    getMail(params);
    $("#nodeUrl").val(appData.nodeUrl);
    $("#base58SenderAccountAddress").val(appData.base58AccountAddress);
    simplemde = new SimpleMDE({element: document.getElementById("MDdescription")});
    CKEDITOR.replace('description');
}

function unserialize(params) {
    let result = {};
    params = params.split('&');

    params.forEach(function (e) {
        let param = e.split('=');

        result[param[0]] = param[1];
    });

    return result;
}

function mail_encrypted(message, public_key) {
    document.getElementById('mail-table-message').innerHTML = correctMailContent(EraCrypt.decryptMessage(message, public_key, appData.keyPair.privateKey));
    document.getElementsByClassName('button__mail')[0].parentNode.removeChild(document.getElementsByClassName('button__mail')[0]);
}