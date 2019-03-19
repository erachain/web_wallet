function balancesOnLoad() {
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
                if (httpRequest.readyState === XMLHttpRequest.DONE && this.status === 200) {
                    try {
                        var balancesList = JSON.parse(this.responseText);
                        if (Object.keys(balancesList).length > 0) {

                            var answerString = "";
                        answerString = "<table class='table'><thead><tr><th>Asset key</th><th>Asset name</th><th>Amount</th></tr></thead><tbody>";
                        for (var key in balancesList) {
                            answerString = answerString + "<tr><td><a href=# onclick=\"appData.requestAsset('" + key + "')\">" + key + "</td><td>" + assetList.getName(key) + "</td><td>" + balancesList[key][0][1] + "</td></tr>";
                        }
                        answerString = answerString + "</tbody></table>";
                    } else {
                        answerString = '<center><h4>Активов на счёте нет</h4></center>'
                    }

                        document.getElementById("balancesList").innerHTML = answerString;
                    } catch (e) {
            console.error(e)
            document.getElementById("balancesList").innerHTML = '<center><h4 style="color:red">Ошибка ответа</h4></center>';
                    }
                }
            };
            httpRequest.send();
        } catch (e) {
            console.error(e)
            document.getElementById("balancesList").innerHTML = '<center><h4 style="color:red">Ошибка соединения</h4></center>';
         }
    }

