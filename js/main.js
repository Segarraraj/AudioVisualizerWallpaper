function livelyPropertyListener(name, val) {
	switch(name) {
        case "bgImg":
            document.getElementById("main").style.backgroundImage = "url(" + val.replace("\\", "/") + ")";
            break;
        case "bgBlur":
            document.getElementById("main").style.filter = "blur(" + val + "px)";
            break;
  	}
}