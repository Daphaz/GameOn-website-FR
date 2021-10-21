var modal = document.querySelector(".modal");
var btn = document.getElementById("signup");
var btnClose = document.querySelector(".form__close");
var navbarToggle = document.querySelector(".navbar__toggle");

/**
 *  Open.
 */
btn.addEventListener("click", function () {
	window.scrollTo(0, 0);
	document.body.classList.add("fix-scroll");
	modal.classList.remove("close");
	modal.classList.add("open");
	navbarToggle.disabled = true;
});

/**
 *  Close.
 */
btnClose.addEventListener("click", function () {
	document.body.classList.remove("fix-scroll");
	modal.classList.remove("open");
	modal.classList.add("close");
	navbarToggle.disabled = false;
});
