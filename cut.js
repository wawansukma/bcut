var endpoint = "https://www.jsonstore.io/2dc7bd2cae547b9c98b0deb90a40559bca06294b0826e0a9ce505ada7230e974";

var hashh = window.location.hash.substr(1);
if (window.location.hash != "") {
    $.getJSON(endpoint + "/" + hashh, function (data) {
        data = data["result"];

        if (data != null) {
            window.location.href = data;
        }

    });
}

$("#sbtn").click(shorturl);

function cinp(){
    document.getElementById("erbox").innerHTML = "";
    var cival = document.getElementById("custominput").value;

    $.getJSON(endpoint + "/" + cival, function (data) {
                data = data["result"];
        
                if (data != null) {
                    console.log("Already Used Custom Address");
                    document.getElementById("erbox").style.color = "red";
                    document.getElementById("erbox").innerHTML = "❌ Custom Address Already Used, Choose Another";
                    document.getElementById("custominput").placeholder = document.getElementById("custominput").value;
                    document.getElementById("custominput").value = "";
                    
                    return false;
                    
                }else if(data==null){
                    console.log("Available Custom Address");
                    document.getElementById("erbox").style.color = "green";
                    document.getElementById("erbox").innerHTML = " Custom Address Available ✔️";
                    return true;

                }
        
    });

}

function geturl(){
    var url = document.getElementById("urlinput").value;
    var protocol_ok = url.startsWith("http://") || url.startsWith("https://") || url.startsWith("ftp://");
    if(!protocol_ok){
        newurl = "http://"+url;
        return newurl;
        }else{
            return url;
        }
}

function getrandom() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}

function genhash(){
        if (document.getElementById("custominput").value == ""){
            window.location.hash = getrandom();
            check_is_unique();
        }else{
        window.location.hash = document.getElementById("custominput").value;
            
        }
}

function check_is_unique(){
    url = window.location.hash.substr(1);
    console.log('URL CHECK ' + url);
    $.getJSON(endpoint + "/" + url, function (data) {
        data = data["result"];

        if (data != null) {
            genhash();
            console.log("Already Used Address");
        }

    });

}

function send_request(url) {
    this.url = url;
    $.ajax({
        'url': endpoint + "/" + window.location.hash.substr(1),
        'type': 'POST',
        'data': JSON.stringify(this.url),
        'dataType': 'json',
        'contentType': 'application/json; charset=utf-8'
});
simplecopy(window.location.href);
document.getElementById('shortenedURL').value = window.location.href
}

function shorturl(){
    var longurl = geturl();
    genhash();
    send_request(longurl);
}
