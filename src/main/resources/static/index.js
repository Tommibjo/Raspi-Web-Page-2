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

        var containerSpan = document.createElement("span"); // Luodaan uusi span kommenteille.
        containerSpan.setAttribute("id", "mainSpan");

        var timeSpan = document.createElement("span"); // Luodaan uusi span aikaleimalle
        timeSpan.setAttribute("id", "timeSpan");

        var usernameSpan = document.createElement("span");
        usernameSpan.setAttribute("id", "usernameSpan");

        usernameSpan.appendChild(document.createTextNode(messages[i].username));
        containerSpan.appendChild(usernameSpan);
        containerSpan.appendChild(document.createElement("br"));
        containerSpan.appendChild(document.createElement("br"));
        containerSpan.appendChild(document.createTextNode(messages[i].comment));
        containerSpan.appendChild(document.createElement("br"));
        containerSpan.appendChild(document.createElement("br"));
        timeSpan.appendChild(document.createTextNode(messages[i].postTime));
        containerSpan.appendChild(timeSpan);

        document.body.insertBefore(containerSpan, document.getElementById("Messages")); // korvataan Messages -> var newSpan:illa

        var usernameStyle = document.createElement("style");
        usernameStyle.innerHTML = "#usernameSpan {font-weight: bold;}";
        document.getElementById("usernameSpan").appendChild(usernameStyle);

        var timeStyle = document.createElement("style"); // Luodaan uusi tyyli div osiolle
        timeStyle.innerHTML = "#timeSpan {color: #999;}";
        document.getElementById("timeSpan").appendChild(timeStyle);

        var containerStyle = document.createElement("style"); // Luodaan uusi tyyli span osiolle
        containerStyle.innerHTML = "#mainSpan {border: 1px solid;background-color:rgba(232, 235, 240, 0.8); border-color: black;padding-top: 5px;padding-bottom:5px;padding-right:7px;padding-left:7px; display: table; width: 405px;margin: 10px 0;margin-right: auto; margin-left: auto;}";
        document.getElementById("mainSpan").appendChild(containerStyle);
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
    var hours = '0' + currentdate.getHours().toString();
    var minutes = '0' + currentdate.getMinutes().toString();
    var seconds = '0' + currentdate.getSeconds().toString();
    var day = '0' + currentdate.getDay().toString();
    var month = '0' + (currentdate.getMonth() + 1).toString();
    var year = currentdate.getFullYear().toString();
    var timeStamp = hours.slice(-2) + ":" + minutes.slice(-2) + ":" + seconds.slice(-2) + " " + day.slice(-2) + "/" + month.slice(-2) + "/" + year;

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

