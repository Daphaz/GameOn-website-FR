class SubmitForm {
	constructor({ form, fields }) {
		this.form = form;
		this.fields = fields;
	}

	initial() {
		const inputs = this.fields
			.map((field) => ({
				element: document.querySelector(`input[name=${field}]`),
				message: "",
				error: false,
			}))
			.filter((val) => val);

		this.validateOnSubmit(inputs);
		this.validateOnEntry(inputs);
		this.close();
	}

	validateOnSubmit(inputs) {
		this.form.addEventListener("submit", (e) => {
			e.preventDefault();

			inputs.forEach((input) => {
				if (!input.element.value) {
					this.setStatus("error", input);
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
			input.element.addEventListener("input", (event) => {
				if (input.element.value.trim() === "") {
					this.setStatus("error", input);
				} else {
					this.setStatus("sucess", input);
				}
			});
		});
	}

	setStatus(status, input) {
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
			this.setMessageError(input);
		}
	}

	setMessageError(input) {
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
				input.message = "Email is required";
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

	close() {
		const btnClose = document.getElementById("close-overlay");
		const navbarToggle = document.querySelector(".navbar__toggle");
		const modal = document.querySelector(".modal");

		btnClose.addEventListener("click", function () {
			document.body.classList.remove("fix-scroll");
			modal.classList.remove("open");
			modal.classList.add("close");
			navbarToggle.disabled = false;
		});
	}
}

const form = document.querySelector(".modal__form");
const fields = ["firstname", "lastname", "email", "birthdate", "tournament"];

const Submit = new SubmitForm({ form, fields });

Submit.initial();
