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
                    answerString = "<table class='table'><thead><tr><th>SeqNo</th><th>Title</th><th>Type</th><th>Date</th><th>Amount:Key</th><th>Fee</th><th>Confirmations</th></tr></thead><tbody>";
                    for (var key in sortedList) {
                        console.log(sortedList[key]);
                        var date = new Date(sortedList[key]["timestamp"]), correctTime = '&mdash;';

                        if(sortedList[key]["timestamp"] !== undefined){
                            correctTime = pad(date.getDate(), 2) + "." + pad((date.getMonth() + 1), 2) + "." + date.getFullYear() + " " +
                                pad(date.getHours(), 2) + ":" + pad(date.getMinutes(), 2);
                        }

                        answerString = answerString + "<tr class='trans_type_" + sortedList[key]["type"] + "'>";

                        if(sortedList[key]["height"] !== undefined && sortedList[key]["sequence"] !== undefined){
                            let blockSeq = sortedList[key]["height"] + '-' + sortedList[key]["sequence"];
                            answerString = answerString + "<td><a href='" + appData.nodeUrl + "/index/blockexplorer.html?tx=" + blockSeq + "' target='_blank'>" + blockSeq + "</a></td>";
                        } else {
                            answerString = answerString + "<td>&mdash;</td>";
                        }

                        if(sortedList[key]["type"] == 100){
                            answerString = answerString + "<td>" + sortedList[key]["message"] + "</td>";
                        } else {
                            if(sortedList[key]["title"] !== undefined){
                                if(sortedList[key]["title"].length > 40){
                                    answerString = answerString + "<td>" + sortedList[key]["title"].substring(0, 40) + "..." + "</td>";
                                } else {
                                    answerString = answerString + "<td>" + sortedList[key]["title"] + "</td>";
                                }
                            } else {
                                answerString = answerString + "<td>" + sortedList[key]["type_name"] + "</td>";
                            }
                        }

                        answerString = answerString + "<td>" + sortedList[key]["type_name"] + "</td>";
                        answerString = answerString + "<td>" + correctTime +  "</td>";
                        if ( sortedList[key]["amount"] !== undefined ) {
                            let asset = new AssetsList;
                            let amount = (function (recipient, amount) {
                                if(recipient === appData.base58AccountAddress){
                                    return '+' + amount;
                                }

                                return '-' + amount;
                            })(sortedList[key]["recipient"], sortedList[key]["amount"]);

                            answerString = answerString + "<td>" + amount + " <a href=# onclick=\"appData.requestAsset('" + sortedList[key]["asset"] + "')\">" + asset.getName(sortedList[key]["asset"]) + "</a></td>"
                        } else {
                            answerString = answerString + "<td>&mdash;</td>";
                        }

                        if(sortedList[key]["fee"]){
                            answerString = answerString + "<td>" + sortedList[key]["fee"] + "</td>";
                        } else {
                            answerString = answerString + "<td>&mdash;</td>";
                        }

                        answerString = answerString + "<td>" + sortedList[key]["confirmations"] + "</td>";
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
