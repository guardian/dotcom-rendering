// ----- Imports ----- //
import { fakeRequestToEmailSignupService } from './requestEmailSignUp';

// ----- Types ----- //
interface FormBundle {
	form: HTMLFormElement;
	submitButton: HTMLButtonElement;
	resetButton: HTMLButtonElement;
	input: HTMLInputElement;
	newsletterId: string;
}

// ----- Constants ----- //
const COMPONENT_BASE_CLASSNAME = "js-signup-form" as const;
const MODIFIER_CLASSNAME = {
	waiting: `${COMPONENT_BASE_CLASSNAME}--waiting`,
	success: `${COMPONENT_BASE_CLASSNAME}--success`,
	failure: `${COMPONENT_BASE_CLASSNAME}--failure`,
} as const;

// ----- Procedures ----- //

async function handleSubmission(bundle: FormBundle): Promise<void> {
	const { input, newsletterId, submitButton, form } = bundle;

	if (!input.value) {
		return;
	}

	form.classList.add(MODIFIER_CLASSNAME.waiting);
	input.setAttribute('disabled', '');
	submitButton.setAttribute('disabled', '');

	const response = await fakeRequestToEmailSignupService(
		input.value,
		newsletterId,
	);
	form.classList.remove(MODIFIER_CLASSNAME.waiting);

	if (response.status === 200) {
		form.classList.add(MODIFIER_CLASSNAME.success);
	} else {
		form.classList.add(MODIFIER_CLASSNAME.failure);
	}
}

function handleReset(bundle: FormBundle): void {
	const { form, input, submitButton } = bundle;
	form.classList.remove(MODIFIER_CLASSNAME.failure);
	form.classList.remove(MODIFIER_CLASSNAME.success);
	form.classList.remove(MODIFIER_CLASSNAME.waiting);
	input.removeAttribute('disabled');
	submitButton.removeAttribute('disabled');
}

function setup(form: HTMLFormElement): void {
	const newsletterId = form.getAttribute('data-newsletter-id');
	const submitButton = form.querySelector('button[type=submit]');
	const resetButton = form.querySelector('button[type=reset]');
	const input = form.querySelector('input');

	if (!input || !newsletterId || !submitButton || !resetButton) {
		console.error('MISSING', {
			submitButton,
			input,
			newsletterId,
			resetButton,
		});
		return;
	}

	const bundle: FormBundle = {
		form,
		submitButton: submitButton as HTMLButtonElement,
		resetButton: resetButton as HTMLButtonElement,
		input,
		newsletterId,
	};

	form.addEventListener('submit', (event) => {
		event.preventDefault();
		handleSubmission(bundle).catch((err: unknown) => {
			console.error(err);
		});
	});

	resetButton.addEventListener('click', (event) => {
		event.preventDefault(); // default behaviour would clear the input field
		handleReset(bundle);
	});
}

function initSignupForms(): void {
	const signupForms = Array.from(
		document.querySelectorAll(`form.${COMPONENT_BASE_CLASSNAME}`),
	) as unknown as HTMLFormElement[];
	// Should be cast directly to HTMLFormElement[] but:
	// Prettier: "This assertion is unnecessary since it does not change the type of the expression"
	// The compiler disagrees. It types querySelectorAll to NodeListOf<Element>, so does needs to be
	// told they will be HTMLFormElement

	signupForms.forEach(setup);
}

// ----- Exports ----- //

export { initSignupForms };
