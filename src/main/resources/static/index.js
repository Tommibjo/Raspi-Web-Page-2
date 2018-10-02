/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var messages = new Array();

/*
 * Function description:
 * Updates the HTML chat / <span> element.
 */
function updateJsonDiv() {

    for (var i = 0, len = messages.length; i < len; i++) { // Loopataan messages array läpi
        var newSpan = document.createElement("span"); // Luodaan uusi span kommenteille.
        var newStyle = document.createElement('style');
        newStyle.innerHTML = "span {border: 1px solid #dedede;background-color: #f1f1f1;border-radius: 15px; padding-top: 5px;padding-bottom:5px;padding-right:7px;padding-left:7px;margin: 2px; height: auto; width: auto; display: table;}";
        newSpan.appendChild(document.createTextNode(messages[i].username));
        newSpan.appendChild(document.createTextNode('\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0'));
        newSpan.appendChild(document.createTextNode(messages[i].postTime));
        newSpan.appendChild(document.createElement("br"));
        newSpan.appendChild(document.createElement("br"));
        newSpan.appendChild(document.createTextNode(messages[i].comment)); // Lisätään jokaisen taulukosta löytyvät nimet, sekä kommentit tekstiksi;
        newSpan.appendChild(document.createElement("br")); // Lisätään <Span:iin> vielä rivinvaihto 
        newSpan.appendChild(newStyle);

        document.body.insertBefore(newSpan, document.getElementById("Messages")); // korvataan Messages -> var newSpan:illa
    }
    messages = [];
    console.log("{Comments updated on front}");
}

/*
 * Function description:
 * Request method "GET" from http://localhost:8080/comment
 * Server returns "comment.json" file, which gets iterated to "messages" js-array
 */
function downloadComments() {
    var receivedJson;
    const request = new XMLHttpRequest();
    request.open('GET', "http://localhost:8080/comment");
    request.onerror = () => {
        console.log("{error with downloadComments() function}");
    };
    request.send();
    request.onload = () => {

        if (request.status === 200) {
            receivedJson = JSON.parse(request.responseText);
            for (var i = 0, len = receivedJson.length; i < len; i++) {
                messages.push(receivedJson[i]);
                console.log(receivedJson[i]);
            }
            console.log("Messages in message array: " + messages.length);
        }
        updateJsonDiv();
    };
    console.log("{Comments downloaded from server}");
}

/*
 * Function description:
 * Converts given object to JSON and sends the file via "POST" method to http://localhost:8080/comment
 */
function uploadComment(Object) {
    var jsonData = JSON.stringify(Object);
    console.log(jsonData);
    const request = new XMLHttpRequest();
    request.open("POST", "http://localhost:8080/comment");
    request.onerror = () => {
        console.log("{error with uploadcomments() function}");
    };
    request.setRequestHeader("Content-Type", "application/json");
    request.send(jsonData);
}

function createObject(username, comment) {
    var currentdate = new Date();
    var timeStamp = currentdate.getHours() + ":"
            + currentdate.getMinutes() + ":" + currentdate.getSeconds();
    var data = {
        "username": username,
        "comment": comment,
        "postTime": timeStamp
    };

    uploadComment(data);
    messages.push(data);
    updateJsonDiv();
}


/*
 * Function description:
 * Activates on <form> submit button
 * Fetches username & comment from HTML, turns the data to JS-object and distributes the object to further processing
 */
function onClick() {
    var username = document.getElementById("usernameInput").value; // sun pitää lisätä tälle muuttujalle viimeisimmän olion "username"
    var comment = document.getElementById("commentInput").value;
    if (comment === "") {
        alert("Can't leave empty comment!");
        return false;
    } else {
        if (username === "") {
            createObject("Anonymous internet user", comment);
        } else {
            createObject(username, comment);
        }
        document.getElementById("usernameInput").value = ""; // empties the <input type="text" name="username" id="usernameInput"/>
        document.getElementById("commentInput").value = ""; // empties the <input type="text" name="comment" id="commentInput"/>
    }
}

/*
 * Listener to activate and load the comments.
 */
document.addEventListener('DOMContentLoaded', function () {
    downloadComments();
}, false);

