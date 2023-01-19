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
	var mouse_delta_x = 0, mouse_delta_y = 0, mouse_x = 0, mouse_y = 0;
	let _window = document.getElementById("window");
	document.getElementById("titlebar").onmousedown = ({e}) => {
		e = e || window.event;
		e.preventDefault();
		// get the mouse cursor position at startup:
		mouse_x = e.clientX;
		mouse_y = e.clientY;
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
			mouse_delta_x = mouse_x - r.clientX;
			mouse_delta_y = mouse_y - r.clientY;
			mouse_x = r.clientX;
			mouse_y = r.clientY;
			// set the element's new position:
			_window.style.top = (_window.offsetTop - mouse_delta_y) + "px";
			_window.style.left = (_window.offsetLeft - mouse_delta_x) + "px";
		}
	}

	/* display terminal messages */
	terminal.appendChild(create_line("Type <span class='cyan'>'help'</span> to get a list of commands."));
	requestAnimationFrame(terminal_loop);
}

// main terminal prompt loop
var waiting_for_input = false;
var current_prompt = null;
function terminal_loop()
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
			switch (text)
			{
				case "":
					break;
				case "help":
					terminal.appendChild(create_line("Hello! Welcome to my website."));
					terminal.appendChild(create_line("Here's a list of all the runnable commands."));
					terminal.appendChild(create_line("&nbsp;"));
					terminal.appendChild(create_line("&nbsp;&nbsp;&nbsp;&nbsp;help&nbsp;&nbsp;&nbsp; display this message"));
					terminal.appendChild(create_line("&nbsp;&nbsp;&nbsp;&nbsp;clear&nbsp;&nbsp; clear the terminal"));
					terminal.appendChild(create_line("&nbsp;"));
					break;
				case "clear":
					terminal.textContent = '';
					break
				default:
					terminal.appendChild(create_line(text + ": command not found "));
			}
		}
		terminal.appendChild(create_prompt()); // create a new prompt
		terminal.scroll(0, terminal.scrollHeight)
		current_prompt = document.getElementById("command-prompt");
		// add an event listener to wait for when you press enter in the prompt
		current_prompt.addEventListener("keydown", ({key}) => {
			if (key === "Enter") waiting_for_input = false;
		})
		current_prompt.focus();
		waiting_for_input = true; // resume waiting for input until enter is pressed
	}
	requestAnimationFrame(terminal_loop);
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
