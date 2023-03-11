function livelyPropertyListener(name, val)
{
	switch(name) {
    case "bgImg":
        document.getElementById("main")[0].style.backgroundImage = "url(" + val.replace("\\", "/") + ")";
        break;
  	}
}