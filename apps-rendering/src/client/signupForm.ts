// ----- Imports ----- //
import { fakeRequestToEmailSignupService } from './requestEmailSignUp';

// ----- Types ----- //
interface FormBundle {
	form: Element;
	submitButton: Element;
	resetButton: Element;
	input: HTMLInputElement;
	newsletterId: string;
}

// ----- Constants ----- //
const COMPONENT_BASE_CLASSNAME = 'js-signup-form' as const;
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

function setup(form: Element): void {
	const newsletterId = form.getAttribute('data-newsletter-id');
	const submitButton = form.querySelector('button[type=submit]');
	const resetButton = form.querySelector('button[type=reset]');
	const input = form.querySelector('input[type=email]');

	// see: apps-rendering/src/components/NewsletterSignup/EmailSignupForm.tsx
	// All of these should always be present in the component, so in theory they
	// could be cast as truthy - but to protect against future bugs, this
	// script does not assume that the component will continue to follow the
	// 'contract' and have the required attributes and elements.
	if (!input || !newsletterId || !submitButton || !resetButton) {
		return;
	}

	const bundle: FormBundle = {
		form,
		submitButton,
		resetButton,
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
	);
	signupForms.forEach(setup);
}

// ----- Exports ----- //

export { initSignupForms };
