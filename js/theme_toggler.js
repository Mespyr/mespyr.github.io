var checkbox = document.getElementById("theme_input");

function get_cookie(cname) {
	let name = cname + "=";
	let decodedCookie = decodeURIComponent(document.cookie);
	let ca = decodedCookie.split(';');
	for(let i = 0; i <ca.length; i++) {
		let c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
}

function set_cookie(cname, cvalue) {
	document.cookie = cname + "=" + cvalue + ";";
}

checkbox.onclick = () => {
	if (checkbox.checked == true) {
		// save theme name
		set_cookie("theme_color", "dark");
		document.body.classList.add('active');
	}
	else {
		set_cookie("theme_color", "brown");
		document.body.classList.remove('active');
	}
}

let theme_color = get_cookie("theme_color");

// set default theme
if (theme_color == "")
	set_cookie("theme_color", "brown");

// if theme was set to dark
if (theme_color == "dark") {
	checkbox.checkbox = true;
	document.body.classList.add('active');
}
