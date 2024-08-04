// global mouse position
var mouse_delta_x = 0, mouse_delta_y = 0, mouse_x = 0, mouse_y = 0;

class Window {
	constructor(window_obj) {
		this.obj = window_obj;
		this.mouse_x = 0;
		this.mouse_y = 0;
		this.mouse_delta_x = 0;
		this.mouse_delta_y = 0;

		// create the window and put it into the screen
		this.obj._window = document.createElement("div");
		this.obj._window.classList.add("window");
		this.titlebar = document.createElement("div");
		this.titlebar.classList.add("titlebar");
		this.obj._window.appendChild(this.titlebar);
		document.body.appendChild(this.obj._window);

		// init the inner to the window
		this.obj.init(this.obj);

		this.titlebar.onmousedown = ({e}) => {
			e = e || window.event;
			e.preventDefault();
			// get the mouse cursor position at startup:
			this.mouse_x = e.clientX;
			this.mouse_y = e.clientY;
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
				this.mouse_delta_x = mouse_x - r.clientX;
				this.mouse_delta_y = mouse_y - r.clientY;
				this.mouse_x = r.clientX;
				this.mouse_y = r.clientY;
				top_pos = this.obj._window.offsetTop - mouse_delta_y;
				left_pos = this.obj._window.offsetLeft - mouse_delta_x;
				// if terminal has reached edge of screen, do not move it
				if (top_pos + this.obj._window.clientHeight > window.innerHeight - 10);
				else if (left_pos + this.obj._window.clientWidth > window.innerWidth - 10);
				else if (top_pos < 10 || left_pos < 10);
				else {
					// set the element's new position:
					this.obj._window.style.top = (top_pos) + "px";
					this.obj._window.style.left = (left_pos) + "px";
				}
			}
		}
	};
};

var windows = [new Window(create_new_terminal())];

function wm_update() {
	windows.forEach(w => w.obj.update(w.obj));
	requestAnimationFrame(wm_update);
};

requestAnimationFrame(wm_update);
