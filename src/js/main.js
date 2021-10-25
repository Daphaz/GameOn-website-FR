class Display {
	constructor({
		form,
		fields,
		buttonMenu,
		navbar,
		modal,
		btnModal,
		btnCloseModal,
		navbarToggle,
		btnCloseOverlay,
	}) {
		this.form = form;
		this.fields = fields;
		this.buttonMenu = buttonMenu;
		this.navbar = navbar;
		this.modal = modal;
		this.btnModal = btnModal;
		this.btnCloseModal = btnCloseModal;
		this.navbarToggle = navbarToggle;
		this.btnCloseOverlay = btnCloseOverlay;
	}

	/**
	 *  Setup
	 */
	setup() {
		this.modalEvent();
		this.menuEvent();
		this.initForm();
	}

	/**
	 *  Modal.
	 */
	closeModal() {
		document.body.classList.remove("fix-scroll");
		this.modal.classList.remove("open");
		this.modal.classList.add("close");
		this.navbarToggle.disabled = false;
		this.navbarToggle.style.opacity = 1;
	}

	modalEvent() {
		// Open.
		this.btnModal.addEventListener("click", () => {
			window.scrollTo(0, 0);
			document.body.classList.add("fix-scroll");
			this.modal.classList.remove("close");
			this.modal.classList.add("open");
			this.navbarToggle.disabled = true;
			this.navbarToggle.style.opacity = 0;
		});

		// Close.
		this.btnCloseModal.addEventListener("click", () => {
			this.closeModal();
		});
	}

	/**
	 * Menu Mobile.
	 */
	menuEvent() {
		this.buttonMenu.addEventListener("click", () => {
			if (this.navbar.classList.contains("toggle")) {
				this.navbar.classList.replace("toggle", "hide");
				document.body.classList.remove("no-scroll");
			} else if (this.navbar.classList.contains("hide")) {
				this.navbar.classList.replace("hide", "toggle");
				document.body.classList.add("no-scroll");
			} else {
				this.navbar.classList.add("toggle");
				document.body.classList.add("no-scroll");
			}
		});
	}

	/**
	 *  Form Submit.
	 */
	initForm() {
		this.regex =
			/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

		const inputs = this.fields
			.map((field) => ({
				element: document.querySelector(`input[name=${field}]`),
				message: "",
				error: false,
			}))
			.filter((val) => val);

		this.validateOnSubmit(inputs);
		this.validateOnEntry(inputs);
		this.btnCloseOverlay.addEventListener("click", () => {
			this.closeModal();
		});
	}

	validateOnSubmit(inputs) {
		this.form.addEventListener("submit", (e) => {
			e.preventDefault();

			inputs.forEach((input) => {
				if (!input.element.value) {
					this.setStatus("error", input, null);
				} else {
					if (input.element.type === "email") {
						if (!this.regex.test(input.element.value)) {
							this.setStatus("error", input, "Enter a valid email adress");
						}
					}
				}
			});

			const isNotValid = inputs.some((input) => input.error);

			if (!isNotValid) {
				const overlay = document.querySelector(".form__overlay");

				overlay.classList.add("visible");
			}
		});
	}

	validateOnEntry(inputs) {
		inputs.forEach((input) => {
			input.element.addEventListener("input", () => {
				if (input.element.value.trim() === "") {
					this.setStatus("error", input, null);
				} else {
					if (input.element.type === "email") {
						if (!this.regex.test(input.element.value)) {
							this.setStatus("error", input, "Enter a valid email adress");
						} else {
							this.setStatus("sucess", input, null);
						}
					} else {
						this.setStatus("sucess", input, null);
					}
				}
			});
		});
	}

	setStatus(status, input, message) {
		const errorElement =
			input.element.parentElement.querySelector(".form__error");
		if (status === "sucess") {
			input.error = false;
			input.element.classList.remove("input-error");
			input.message = "";
			errorElement.innerText = "";
		}

		if (status === "error") {
			input.error = true;
			input.element.classList.add("input-error");
			this.setMessageError(input, message);
		}
	}

	setMessageError(input, message) {
		const errorElement =
			input.element.parentElement.querySelector(".form__error");

		switch (input.element.name) {
			case "firstname":
				input.message = "Firstname is required";
				break;
			case "lastname":
				input.message = "Lastname is required";
				break;
			case "email":
				if (message) {
					input.message = message;
				} else {
					input.message = "Email is required";
				}
				break;
			case "birthdate":
				input.message = "Birthdate is required";
				break;
			case "tournament":
				input.message = "Tournament is required";
				break;

			default:
				break;
		}

		errorElement.innerText = input.message;
	}
}

/**
 *  Selectors.
 */
const form = document.querySelector(".modal__form");
const fields = ["firstname", "lastname", "email", "birthdate", "tournament"];
const buttonMenu = document.querySelector(".navbar__toggle");
const navbar = document.querySelector(".navbar");
const modal = document.querySelector(".modal");
const btnModal = document.getElementById("signup");
const btnCloseModal = document.querySelector(".form__close");
const navbarToggle = document.querySelector(".navbar__toggle");
const btnCloseOverlay = document.getElementById("close-overlay");

// Display instance.
const App = new Display({
	form,
	fields,
	buttonMenu,
	navbar,
	modal,
	btnModal,
	btnCloseModal,
	navbarToggle,
	btnCloseOverlay,
});

App.setup();
