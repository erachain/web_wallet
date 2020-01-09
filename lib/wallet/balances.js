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
                        answerString = "<table class='table'>" +
                            "<thead><tr>" +
                            "<th>Asset key</th>" +
                            "<th>Asset name</th>" +
                            "<th title='Reflects the number of tokens owned by the user. He can dispose of them at his discretion and no one can pick them up.'>Ownership balance</th>" +
                            "<th title='Debt balance. Reflects the number of tokens transferred in debt. The user who received them can return them to the one who translated them to him, and the user who translated them can also pick them up.'>Balance in management</th>" +
                            "<th title='Reflects the number of tokens, exists on the user&apos;s storage.'>Storage balance</th>" +
                            "<th></th>" +
                            "</tr></thead>" +
                            "<tbody>";
                        for (var key in balancesList) {
                            let assetName = assetList.getName(key);
                            if(assetName === undefined){
                                continue;
                            }
                            answerString = answerString + "<tr>" +
                                "<td><a href=# onclick=\"appData.requestAsset('" + key + "')\">" + key + "</td>" +
                                "<td>" + assetName + "</td>" +
                                "<td>" + balancesList[key][0][1] + "</td>" +
                                "<td>" + balancesList[key][1][1] + "</td>" +
                                "<td>" + balancesList[key][2][1] + "</td>" +
                                "<td><a href='javascript:' class='button__mail' onclick='menuClick(\"orderCreate\", " + key + ")'>Create order</td>" +
                                "</tr>";
                        }
                        answerString = answerString + "</tbody></table>";
                    } else {
                        answerString = '<center><h4>Активов на счёте нет</h4></center>'
                    }

                        document.getElementById("balancesList").innerHTML = answerString;
                    } catch (e) {
            console.error(e);
            document.getElementById("balancesList").innerHTML = '<center><h4 style="color:red">Ошибка ответа</h4></center>';
                    }
                }
            };
            httpRequest.send();
        } catch (e) {
            console.error(e);
            document.getElementById("balancesList").innerHTML = '<center><h4 style="color:red">Ошибка соединения</h4></center>';
         }
    }

