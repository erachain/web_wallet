function transactionsOnLoad() {
    $("#base58SenderAccountAddress").val(appData.base58AccountAddress);
}

function requestTransactions() {
    document.getElementById("transactionsList").innerHTML = "";
    var httpRequest = typeof XMLHttpRequest != 'undefined'
            ? new XMLHttpRequest()
            : new ActiveXObject('Microsoft.XMLHTTP');
        var requestUrl = appData.nodeUrl + "/apirecords/getbyaddress?address=" + appData.base58AccountAddress;
        httpRequest.open('GET', requestUrl, true);
        try {
            httpRequest.onreadystatechange = function() {
                if (httpRequest.readyState === XMLHttpRequest.DONE && this.status === 200) {
                    var transactionsList = JSON.parse(this.responseText);
                    var answerString = "";
                    var sortedList = [];
                    for (var key in transactionsList) {
                        sortedList.push(transactionsList[key]);
                    }
                    sortedList.sort(function (a, b) {
                        return b["timestamp"] - a["timestamp"];
                    });
                    answerString = "<table class='table'><thead><tr><th>Type</th><th></th><th>Date</th><th></th><th>Amount</th><th></th><th>Asset</th><th></th><th>Signature</th></tr></thead><tbody>";
                    for (var key in sortedList) {
                        var date = new Date(sortedList[key]["timestamp"]), correctTime = '&mdash;';

                        if(sortedList[key]["timestamp"] !== undefined){
                            correctTime = pad(date.getDate(), 2) + "." + pad((date.getMonth() + 1), 2) + "." + date.getFullYear() + " " +
                                date.getHours() + ":" + date.getMinutes();
                        }

                        answerString = answerString + "<tr class='trans_type_" + sortedList[key]["type"] + "'><td>" + sortedList[key]["type_name"] + "</td><td></td>" +
                            "<td>" + correctTime +  "</td><td></td>";
                        if ( sortedList[key]["type_name"] === "SEND" ) {
                            answerString = answerString + "<td>" + sortedList[key]["amount"] + "</td><td></td>" +
                            "<td><a href=# onclick=\"appData.requestAsset('" + sortedList[key]["asset"] + "')\">" + sortedList[key]["asset"] + "</a></td><td></td>"
                        } else {
                            answerString = answerString + "<td></td><td></td><td></td><td></td>";
                        }
                        answerString = answerString + "<td><a href=" + appData.nodeUrl + "/index/blockexplorer.html?tx=" + transactionsList[key]["signature"] + " target=_blank>" + sortedList[key]["signature"].substring(0, 12) + "..."; + "</a></td>";
                        answerString = answerString + "</tr>";
                    }
                    answerString = answerString + "</tbody></table>";
                    document.getElementById("transactionsList").innerHTML = answerString;

                    forgingToggle();
                }
            };
            httpRequest.send();
        } catch (e) { }
}
function forgingToggle(){
    let forging = $('#forging-check');
    if(forging.prop('checked')){
        $('.trans_type_100').hide();
    } else {
        $('.trans_type_100').show();
    }
}
