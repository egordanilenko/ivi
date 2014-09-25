function onSite()
{
    return true;
}

function thisMovie(movieName) {
     if (navigator.appName.indexOf('Microsoft') != -1) {
         return window[movieName];
     } else {
         return document[movieName];
     }
 }

function toggleP(e){
    var keynum;
    if(window.event) // IE
    {
        keynum = e.keyCode
    }
    else if(e.which) // Netscape/Firefox/Opera
    {
        keynum = e.which
    }
    if(String.fromCharCode(keynum) == " " && thisMovie('player').isFullScreen()){
        thisMovie('player').togglePause();
    }
}
