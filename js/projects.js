fetch('./data/projects.json')
    .then((response) => response.json())
	.then((json) => {

	console.log("Checking javascript syntax to see if this works")
	console.log(json)

});
