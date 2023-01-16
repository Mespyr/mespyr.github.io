const terminal = document.getElementById("terminal");
document.body.onload = init_terminal;

/* autofocus to current prompt when pressing a key down */
document.addEventListener("keydown", ({_}) => {
	let current_prompt = document.getElementById("command-prompt");
	if (current_prompt != null) {
		terminal.scroll(0, terminal.scrollHeight)
		current_prompt.focus();
	}
})

/* init terminal and window start prompt loop */
function init_terminal()
{
	/* make window draggable */
	var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
	let _window = document.getElementById("window");
	document.getElementById("titlebar").onmousedown = ({e}) => {
		e = e || window.event;
		e.preventDefault();
		// get the mouse cursor position at startup:
		pos3 = e.clientX;
		pos4 = e.clientY;
		document.onmouseup = () => {
			// stop moving when mouse button is released:
			document.onmouseup = null;
			document.onmousemove = null;
		}
		// call a function whenever the cursor moves:
		document.onmousemove = ({r}) => {
			r = r || window.event;
			r.preventDefault();
			// calculate the new cursor position:
			pos1 = pos3 - r.clientX;
			pos2 = pos4 - r.clientY;
			pos3 = r.clientX;
			pos4 = r.clientY;
			// set the element's new position:
			_window.style.top = (_window.offsetTop - pos2) + "px";
			_window.style.left = (_window.offsetLeft - pos1) + "px";
		}
	}

	/* display terminal messages */
	terminal.appendChild(create_line("Type <span class='cyan'>'help'</span> to get a list of commands."));

	var waiting_for_input = false;
	var current_prompt = null;

	function loop()
	{
		if (!waiting_for_input)
		{
			// destroy old prompt and replace it with regular line
			if (current_prompt != null)
			{
				let text = current_prompt.value;
				current_prompt.parentNode.parentNode.removeChild(current_prompt.parentNode);
				terminal.appendChild(create_line("<span class='pink'>>>></span> " + text));

				// parse prompt
				if (text === "");
				else if (text === "help")
				{
					terminal.appendChild(create_line("Hello! Welcome to my website."));
					terminal.appendChild(create_line("Here's a list of all the runnable commands."));
					terminal.appendChild(create_line("&nbsp;"));
					terminal.appendChild(create_line("&nbsp;&nbsp;&nbsp;&nbsp;help&nbsp;&nbsp;&nbsp; display this message"));
					terminal.appendChild(create_line("&nbsp;&nbsp;&nbsp;&nbsp;clear&nbsp;&nbsp; clear the terminal"));
					terminal.appendChild(create_line("&nbsp;"));
				}
				else if (text === "clear")
				  terminal.textContent = '';
				else
					terminal.appendChild(create_line(text + ": command not found "));
			}
			// create a new prompt
			terminal.appendChild(create_prompt());
			terminal.scroll(0, terminal.scrollHeight)
			current_prompt = document.getElementById("command-prompt");
			// add an event listener to wait for when you press enter in the prompt
			current_prompt.addEventListener("keydown", ({key}) => {
				if (key === "Enter") {
					waiting_for_input = false;
				}
			})
			current_prompt.focus();
			// resume waiting for input until enter is pressed
			waiting_for_input = true;
		}
		requestAnimationFrame(loop);
	}
	requestAnimationFrame(loop);
}

function create_line(message)
{
	const elem = document.createElement("div");
	elem.classList.add("line");
	elem.innerHTML = message;
	return elem;
}
function create_prompt()
{
	const elem = create_line(">>>&nbsp;<input id='command-prompt' type='text'>");
	elem.classList.add("pink");
	elem.classList.add("bold");
	elem.id = "command-prompt-wrapper";
	return elem;
}
