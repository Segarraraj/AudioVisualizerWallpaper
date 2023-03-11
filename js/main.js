var apikey = "";
var cityname = "";
var country = "";

var lat = 0.0;
var lon = 0.0;

function livelyPropertyListener(name, val) {
	switch(name) {
        case "bgImg":
            document.getElementById("main").style.backgroundImage = "url(" + val.replace("\\", "/") + ")";
            break;
        case "bgBlur":
            document.getElementById("main").style.filter = "blur(" + val + "px)";
            break;
        case "apikey":
            apikey = val;
            break;
        case "cityname":
            cityname = val;
            getLatLon();
            break;
        case "country":
            country = val;
            getLatLon();
            break;
  	}
}

function getLatLon() {
    if (apikey == "" || cityname == "" || country == "") {
        return;
    }

    var geoURL = `http://api.openweathermap.org/geo/1.0/direct?q=${cityname},${country}&appid=${apikey}`;
    fetch(geoURL).then((response) => response.json()).then((data) => {
        lat = data[0].lat;
        lon = data[0].lon;

        getWeather();
    });
}

function getWeather() {
    if (lat == 0.0 && lon == 0.0) {
        return;
    }

    var weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}`;
    fetch(weatherURL).then((response) => response.json()).then((data) => {
        console.log(data);        
    });
}