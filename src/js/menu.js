/**
 *  Selector.
 */
var buttonMenu = document.querySelector(".navbar__toggle");
var navbar = document.querySelector(".navbar");

/**
 *  Open and Close Menu Mobile.
 */
buttonMenu.addEventListener("click", function (event) {
	if (navbar.classList.contains("toggle")) {
		navbar.classList.replace("toggle", "hide");
		document.body.classList.remove("no-scroll");
	} else if (navbar.classList.contains("hide")) {
		navbar.classList.replace("hide", "toggle");
		document.body.classList.add("no-scroll");
	} else {
		navbar.classList.add("toggle");
		document.body.classList.add("no-scroll");
	}
});
