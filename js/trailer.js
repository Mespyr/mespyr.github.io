const trailer = document.getElementById("trailer");
const trailer_text = document.getElementById("trailer-text");

const animateTrailer = (e, interacting) => {
	const x = e.clientX - trailer.offsetWidth / 2,
				y = e.clientY - trailer.offsetHeight / 2;
	
	const keyframes = {
		transform: `translate(${x}px, ${y}px) scale(${interacting ? 4 : 1})`,
	}
	
	trailer.animate(keyframes, {
		duration: 800,
		fill: "forwards"
	});
}

window.onmousemove = e => {
	const interactable = e.target.closest(".trailer-interact"),
		interacting = interactable !== null;
	animateTrailer(e, interacting);

	if (interacting)
		trailer_text.textContent = interactable.textContent;
	else trailer_text.textContent = "";
}
