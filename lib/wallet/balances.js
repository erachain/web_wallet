function balancesOnLoad() {
	$("#base58SenderAccountSeed").val(appData.base58AccountSeed);
    $("#base58SenderAccountAddress").val(appData.base58AccountAddress);
}

function requestBalances() {
    document.getElementById("balancesList").innerHTML = "";
    var httpRequest = typeof XMLHttpRequest != 'undefined'
            ? new XMLHttpRequest()
            : new ActiveXObject('Microsoft.XMLHTTP');
        var requestUrl = appData.nodeUrl + "/api/addressassets/" + appData.base58AccountAddress;
        httpRequest.open('GET', requestUrl, true);
        try {
            httpRequest.onreadystatechange = function() {
                if (this.status == 200) {
                    try {
                        var balancesList = JSON.parse(this.responseText);
                        var answerString = "";
                        answerString = "<table class='table'><thead><tr><th>Asset key</th><th>Asset name</th><th>Amount</th></tr></thead><tbody>";
                        for (var key in balancesList) {
                            answerString = answerString + "<tr><td>" + key + "</td><td>" + assetList.getName(key) + "</td><td>" + balancesList[key][0][1] + "</td></tr>";
                        }
                        answerString = answerString + "</tbody></table>";
                        document.getElementById("balancesList").innerHTML = answerString;
                    } catch (e) { }
                }
            };
            httpRequest.send();
        } catch (e) { }
    }

