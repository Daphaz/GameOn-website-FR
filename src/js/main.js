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
		const inputs = this.fields
			.map((field) => ({
				element:
					field === "location"
						? document.querySelectorAll(`input[name=${field}]`)
						: document.querySelector(`input[name=${field}]`),
				message: "",
				error: false,
				name: field,
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
				if (input.name === "location") {
					const arr = [...input.element];
					const isChecked = arr.some((input) => input.checked);
					if (!isChecked) {
						this.setErrorInput(input);
					}
				} else if (input.name === "lorem1") {
					const inputLoremChecked = document.querySelector(
						'input[type="lorem1"]:checked'
					)?.value;
					if (!inputLoremChecked) {
						this.setErrorInput(input);
					}
				} else {
					this.setErrorInput(input);
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
			if (input.name === "location") {
				const arrLocationInputs = [...input.element];
				arrLocationInputs.forEach((inp) => {
					inp.addEventListener("input", () => {
						this.setErrorInput(input);
					});
				});
			} else {
				input.element.addEventListener("input", () => {
					this.setErrorInput(input);
				});
			}
		});
	}

	setValidInput(input) {
		input.error = false;
		input.message = "";

		if (input.name !== "location") {
			input.element.classList.remove("input-error");
		}
	}

	setErrorInput(input) {
		let errorElement;

		input.error = true;

		if (input.name === "location") {
			errorElement = document.querySelector(".form__error.radio");
		} else if (input.name === "lorem1") {
			errorElement = document.querySelector(".form__error.lorem1");
		} else {
			errorElement = input.element.parentElement.querySelector(".form__error");
			input.element.classList.add("input-error");
		}

		const regex =
			/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

		switch (input.name) {
			case "firstname":
				if (input.element.value.trim() === "") {
					input.message = "Votre prénom est requis.";
				} else if (input.element.value.length < 2) {
					input.message = "Minimum de 2 caractères";
				} else {
					this.setValidInput(input);
					errorElement.innerText = "";
				}
				break;
			case "lastname":
				if (input.element.value.trim() === "") {
					input.message = "Votre nom est requis.";
				} else if (input.element.value.length < 2) {
					input.message = "Minimum de 2 caractères";
				} else {
					this.setValidInput(input);
					errorElement.innerText = "";
				}
				break;
			case "email":
				if (input.element.value.trim() === "") {
					input.message = "Votre email est requis.";
				} else if (!regex.test(input.element.value)) {
					input.message = "Vous devez entrez un email valide.";
				} else {
					this.setValidInput(input);
					errorElement.innerText = "";
				}
				break;
			case "birthdate":
				if (input.element.value.trim() === "") {
					input.message = "Vous devez entrer votre date de naissance.";
				} else {
					this.setValidInput(input);
					errorElement.innerText = "";
				}
				break;
			case "tournament":
				if (input.element.value.trim() === "") {
					input.message = "Nombre de concours est requis.";
				} else {
					this.setValidInput(input);
					errorElement.innerText = "";
				}
				break;
			case "location":
				const arrInputs = [...input.element];
				const isCheckedInputs = arrInputs.some((input) => input.checked);
				if (!isCheckedInputs) {
					input.message = "Vous devez choisir une option.";
				} else {
					this.setValidInput(input);
					errorElement.innerText = "";
				}
				break;
			case "lorem1":
				if (!input.element.checked) {
					input.message = "Cochez les conditions générales.";
				} else {
					this.setValidInput(input);
					errorElement.innerText = "";
				}
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
const fields = [
	"firstname",
	"lastname",
	"email",
	"birthdate",
	"tournament",
	"location",
	"lorem1",
];
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
