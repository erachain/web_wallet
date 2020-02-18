
function requestTelegrams(type) {
    httpRequest('GET', "/apitelegrams/get?address=" + appData.base58AccountAddress , function(data) {
        if ( type == "in" ) {
            document.getElementById("inboxTelegramsList").innerHTML = "";
        } else if (type == "out") {
            document.getElementById("outboxTelegramsList").innerHTML = "";            
        }
        let sortedList = JSON.parse(data).reverse();
        answerString = "<table class='table'><thead><tr><th>Date</th><th>Expires</th><th>Sender</th><th>Title</th><th>Message</th></tr></thead><tbody>";
        let answerCount = 0;
        for (let key in sortedList) {
            let date = new Date(sortedList[key]["transaction"]["timestamp"]);
            let date_e = new Date(sortedList[key]["transaction"]["timestamp"] + 24 * 60 * 60 * 1000);
            if ( (sortedList[key]["transaction"]["type"] === 31 && sortedList[key]["transaction"]["amount"] === undefined)  &&
                ( ( sortedList[key]["transaction"]["recipient"] === appData.base58AccountAddress && type === "in" ) ||
                ( sortedList[key]["transaction"]["recipient"]  !== appData.base58AccountAddress && type === "out" ) )   
                 ) {

                    let message = sortedList[key]["transaction"]["message"];

                    if(sortedList[key]["transaction"]["encrypted"] === true){
                        let output = '<img src="./img/guard.png" class="guard-crypto">';
                        if(type === "in"){
                            output += EraCrypt.decryptMessage(message, getPublicKeyToAddress(sortedList[key]["transaction"]["creator"]), appData.keyPair.privateKey);
                        } else if(type === "out") {
                            output += EraCrypt.decryptMessage(message, getPublicKeyToAddress(sortedList[key]["transaction"]["recipient"]), appData.keyPair.privateKey);
                        }
                        message = output;
                    }

                    answerString = answerString + "<tr><td>" + pad(date.getDate(), 2) + "." + pad((date.getMonth() + 1), 2) + "." +    
                        date.getFullYear() + " " + pad(date.getHours(),2) + ":" + pad(date.getMinutes(),2) +  "</td>" +
                        "<td>" + pad(date_e.getDate(), 2) + "." + pad((date_e.getMonth() + 1), 2) + "." +
                        date_e.getFullYear() + " " + pad(date_e.getHours(),2) + ":" + pad(date_e.getMinutes(),2) +  "</td>" +
                        
                        "<td><a href=" + appData.nodeUrl + "/index/blockexplorer.html?address=" + sortedList[key]["transaction"]["creator"] +" target=_blank>" + sortedList[key]["transaction"]["creator"].substring(0, 12) + "..."  + "</a></td>"+
                        "<td>" + ( sortedList[key]["transaction"]["title"] === undefined ? '&mdash;' : sortedList[key]["transaction"]["title"] ) + "</td>"+
                        "<td>" + message + "</td>" +
                        "</tr>";
                    answerCount += 1;
            }
        }
        answerString = answerString + "</tbody></table>";
        if (answerCount == 0 ) {
            answerString = "No messages";
        }
        if ( type == "in" ) {
            document.getElementById("inboxTelegramsList").innerHTML = answerString;
        } else if (type == "out") {
            document.getElementById("outboxTelegramsList").innerHTML = answerString;            
        }
    })
}

function inboxTelegramsOnLoad() {
	$("#nodeUrl").val(appData.nodeUrl);
	$("#base58SenderAccountAddress").val(appData.base58AccountAddress);
}