var locale = "es-ES";
var hour12 = true;
var hour00 = true;

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
  	}
}

function updateClock() {
    let date = new Date();   

    var hour = new Intl.DateTimeFormat(locale, {'hour':'2-digit','minute':'2-digit','hourCycle':hour12?(hour00?'h11':'h12'):(hour00?'h23':'h24')}).format(date);

    var pm = document.getElementById("pm");
    if (hour12) {
        pm.style.display = "inline-block";
        pm.innerHTML = date.getHours() < 12 ? 'AM' : 'PM';
        hour = hour.substring(0, hour.length - 6);
    } else {
       pm.style.display = "none";
    }
    
    document.getElementById("hour").innerHTML = hour;

    setTimeout(updateClock, 60000 - date.getSeconds() * 1000 - date.getMilliseconds());
}