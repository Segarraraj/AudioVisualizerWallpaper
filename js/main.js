var locale = "es-ES";
var hour12 = false;
var hour00 = true;
var ddmmyyyy = false;

updateClock();

function livelyPropertyListener(name, val) {
	switch(name) {
        case "bgImg":
            document.getElementById("main").style.backgroundImage = "url(" + val.replace("\\", "/") + ")";
            break;
        case "bgBlur":
            document.getElementById("main").style.filter = "blur(" + val + "px)";
            break;
        case "locale":
            locale = val;
            break;
        case "12hour":
            hour12 = val;
            break;
        case "00hour":
            hour00 = val;
            break;
        case "ddmmyyyy":
            ddmmyyyy = val;
            break;
  	}
}

function updateClock() {
    let date = new Date();   

    var hour = new Intl.DateTimeFormat(locale, {'hour':'2-digit','minute':'2-digit','hourCycle':hour12?(hour00?'h11':'h12'):(hour00?'h23':'h24')}).format(date);
    let fullDate;

    if (ddmmyyyy) {
        fullDate = new Intl.DateTimeFormat(locale, {'day':'2-digit','month':'2-digit','year':'numeric'}).format(date);
    } else {
        fullDate = new Intl.DateTimeFormat(locale, {'day':'2-digit','weekday':'long','month':'long'}).format(date);
    }

    var pm = document.getElementById("pm");
    if (hour12) {
        pm.style.display = "inline-block";
        pm.innerHTML = date.getHours() < 12 ? 'AM' : 'PM';
        hour = hour.substring(0, 5);
    } else {
       pm.style.display = "none";
    }
    
    document.getElementById("hour").innerHTML = hour;
    document.getElementById("date").innerHTML = fullDate;

    setTimeout(updateClock, 60000 - date.getSeconds() * 1000 - date.getMilliseconds());
}

function livelyCurrentTrack(data) {
    let obj = JSON.parse(data);
    console.log(obj);

    if (obj == null) {
        document.getElementById("nowPlaying").style.display = "none";
    } else {        
        document.getElementById("songName").innerHTML = obj.Title;
        document.getElementById("songAuthor").innerHTML = obj.Artist;
        if (obj.Thumbnail != null) {
            document.getElementById("albumImage").style.display = "inline";
            document.getElementById("albumImage").src = "data:image/png;base64, " + obj.Thumbnail;
        } else {
            document.getElementById("albumImage").style.display = "none";
        }
    }
}