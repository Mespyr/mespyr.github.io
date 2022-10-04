fetch('./data/projects.json')
    .then((response) => response.json())
	.then((json) => {

	json.forEach(function(proj, idx, arr) {
		// create html out of data in json
		let sect = document.createElement('a')
		sect.className = "project-container-item"
		sect.href = proj.link
		sect.innerHTML = "<h2>" + proj.name + "</h2>" + proj.desc

		// get container and insert 'div' at the end of it
		let container = document.getElementById("project-container")
		container.insertBefore(sect, null)
	})
});
