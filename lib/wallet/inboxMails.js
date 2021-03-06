
function requestMails(type) {
    httpRequest('GET', "/apirecords/getbyaddress?address=" + appData.base58AccountAddress , function(data) {
        if ( type == "in" ) {
            document.getElementById("inboxMailsList").innerHTML = "";
        } else if (type == "out") {
            document.getElementById("outboxMailsList").innerHTML = "";            
        }
        let sortedList = JSON.parse(data);
        answerString = "<table class='table'><thead><tr><th>Date</th><th></th><th>title</th><th></th><th>Signature</th></tr></thead><tbody>";
        let answerCount = 0;
        for (let key in sortedList) {
            let date = new Date(sortedList[key]["timestamp"]);
            if ( sortedList[key]["type_name"] === "LETTER"  && 
                ( ( sortedList[key]["recipient"] === appData.base58AccountAddress && type === "in" ) ||
                ( sortedList[key]["recipient"]  !== appData.base58AccountAddress && type === "out" ) )   
                 ) {
                    answerString = answerString + "<tr><td>" + pad(date.getDate(), 2) + "." + pad((date.getMonth() + 1), 2) + "." +    
                        date.getFullYear() + " " + pad(date.getHours(),2) + ":" + pad(date.getMinutes(),2) +  "</td><td></td>" + 
                        "<td>" + sortedList[key]["head"]  + "</td><td></td>"+
                        "<td><a href=" + appData.nodeUrl + "/index/blockexplorer.html?tx=" + sortedList[key]["signature"] + " target=_blank>" + sortedList[key]["signature"].substring(0, 12) + "..."
                         + "</a></td>"
                        "</tr>";
                    answerCount += 1;
            }
        }
        answerString = answerString + "</tbody></table>";
        if (answerCount == 0 ) {
            answerString = "No messages";
        }
        if ( type == "in" ) {
            document.getElementById("inboxMailsList").innerHTML = answerString;
        } else if (type == "out") {
            document.getElementById("outboxMailsList").innerHTML = answerString;            
        }
    })
}

function inboxMailsOnLoad() {
	$("#nodeUrl").val(appData.nodeUrl);
	$("#base58SenderAccountAddress").val(appData.base58AccountAddress);
	simplemde = new SimpleMDE({ element: document.getElementById("MDdescription") });
    CKEDITOR.replace( 'description' );
}