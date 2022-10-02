fetch('./data/projects.json')
    .then((response) => response.json())
	.then((json) => {

	json.forEach(function(proj, idx, arr) {
		// create html out of data in json
		let div = document.createElement('div')
		div.innerHTML = "<h2>" + proj.name + "</h2>" +
			"Link: " + proj.link

		// get container and insert 'div' at the end of it
		let container = document.getElementById("container")
		container.insertBefore(div, null)
	})
});
