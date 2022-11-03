let nav_headers = document.getElementsByClassName("nav-item");
let page_content = document.getElementById("nav-container");

function bind_on_hover(nav_idx) {
	return function(event) {
		if (nav_idx - 1 >= 0)
			nav_headers[nav_idx - 1].classList.add("prev-nav-item-on-hovor")
	}
}

function bind_on_leave(nav_idx) {
	return function(event) {
		if (nav_idx - 1 >= 0)
			nav_headers[nav_idx - 1].classList.remove("prev-nav-item-on-hovor")
	}
}

for (var i = 0; i < nav_headers.length; i++) {
	nav_headers[i].addEventListener("mouseover", bind_on_hover(i))
	nav_headers[i].addEventListener("mouseout",  bind_on_leave(i))
}
