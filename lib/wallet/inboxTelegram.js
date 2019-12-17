
function requestTelegrams(type) {
    httpRequest('GET', "/apitelegrams/get?address=" + appData.base58AccountAddress , function(data) {
        if ( type == "in" ) {
            document.getElementById("inboxTelegramsList").innerHTML = "";
        } else if (type == "out") {
            document.getElementById("outboxTelegramsList").innerHTML = "";            
        }
        let sortedList = JSON.parse(data).reverse();
        answerString = "<table class='table'><thead><tr><th>Date</th><th></th><th>Sender</th><th></th><th>Title</th><th></th><th>Message</th></tr></thead><tbody>";
        let answerCount = 0;
        for (let key in sortedList) {
            let date = new Date(sortedList[key]["transaction"]["timestamp"]);
            if ( (sortedList[key]["transaction"]["type_name"] === "Letter" || sortedList[key]["transaction"]["type_name"] === "Письмо")  &&
                ( ( sortedList[key]["transaction"]["recipient"] === appData.base58AccountAddress && type === "in" ) ||
                ( sortedList[key]["transaction"]["recipient"]  !== appData.base58AccountAddress && type === "out" ) )   
                 ) {

                    let message = sortedList[key]["transaction"]["data"];

                    if(sortedList[key]["transaction"]["encrypted"] === true){
                        let output = '<img src="./img/guard.png" class="guard-crypto">';
                        output += EraCrypt.decryptMessage(message, getPublicKeyToAddress(sortedList[key]["transaction"]["creator"]), appData.keyPair.privateKey);
                        message = output;
                    }

                    answerString = answerString + "<tr><td>" + pad(date.getDate(), 2) + "." + pad((date.getMonth() + 1), 2) + "." +    
                        date.getFullYear() + " " + pad(date.getHours(),2) + ":" + pad(date.getMinutes(),2) +  "</td><td></td>" + 
                        
                        "<td><a href=" + appData.nodeUrl + "/index/blockexplorer.html?addr=" + sortedList[key]["transaction"]["creator"] +" target=_blank>" + sortedList[key]["transaction"]["creator"].substring(0, 12) + "..."  + "</a></td><td></td>"+
                        "<td>" + sortedList[key]["transaction"]["head"]  + "</td><td></td>"+
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
	simplemde = new SimpleMDE({ element: document.getElementById("MDdescription") });
    CKEDITOR.replace( 'description' );
}