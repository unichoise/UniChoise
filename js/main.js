function openChat() {
    document.querySelector("#chat").style.opacity = "";
    document.querySelector("#chat").style.zIndex = "10";
}

function closeChat() {
    document.querySelector("#chat").style.opacity = "0";
    setTimeout(function () {
        document.querySelector("#chat").style.zIndex = "-10";
    }, 490)
}


function insertBotMessage(message) {
    document.querySelector("#chat-content").innerHTML += "<div class=\"balon2 p-2 m-0 position-relative\" data-is=\"Bot - " + moment().format("hh:mm a") + "\">" +
        "<a class=\"float-left sohbet2\">" + message + "</a>" +
        "</div>"
}

function insertYourMessage(message) {
    document.querySelector("#chat-content").innerHTML += "<div class=\"balon1 p-2 m-0 position-relative\" data-is=\"You - " +  moment().format("hh:mm a") + "\">\n" +
        "<a class=\"float-right\"> " + message + " </a>" +
        "</div>"
}

function sendChatMessage() {
    var msg = document.querySelector("#chat-input").value;
    insertYourMessage(msg);
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/bot.php?text=" + msg);
    xhr.onreadystatechange = function (ev) {
        // noinspection EqualityComparisonWithCoercionJS
        if(xhr.readyState == 4) {
            if(xhr.status != 200) {
                alert("ERROR " + xhr.status + " " + xhr.statusText);
            } else {
                insertBotMessage(xhr.responseText)
            }
        }
    };
    xhr.send()
    // insertBotMessage("yay")
}

document.querySelector("#search").addEventListener("keyup", function (evt) {
    if(evt.keyCode == 13) {
        evt.preventDefault();
        window.location.href = "/index.php?search=" + document.querySelector("#search").value;
    }
});

document.querySelectorAll(".section").forEach(function (value) {
    value.addEventListener("click", function (evt) {
        window.location.href = "/desc.php?id=" + value.dataset.id;
    });
});