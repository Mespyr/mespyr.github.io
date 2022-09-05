var checkbox = document.getElementById("theme_input");

checkbox.onclick = () => {
	if (checkbox.checked == true)
		document.body.classList.add('active');
	else
		document.body.classList.remove('active');
}
