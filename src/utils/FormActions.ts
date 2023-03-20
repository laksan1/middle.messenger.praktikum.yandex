import Validator, { ValidatorTypes } from './Validator';

export default function checkForm(e?: Event): boolean {
	if (!e) {
		throw Error('event parameter is not transmitted');
	}

	if (!(e.target instanceof HTMLFormElement)) {
		throw Error('event target is not HTMLFormElement');
	}

	const form = e.target;
	let result = true;

	Array.from(form.elements).forEach((elem) => {
		if (elem instanceof HTMLInputElement || elem instanceof HTMLTextAreaElement) {
			const validationType = elem.getAttribute('data-validation-type');
			if (!validationType) return;

			const validator = new Validator(elem, validationType as ValidatorTypes);

			const isInputValid = validator.check();
			if (!isInputValid) {
				result = false;
			}
		}
	});

	if (!result) {
		form.reportValidity();
	}

	return result;
}
