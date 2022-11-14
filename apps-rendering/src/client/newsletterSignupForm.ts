// ----- Imports ----- //
import { newslettersClient } from 'native/nativeApi';
import { getBridgetVersion } from './bridgetVersion';
import { isSameOrLaterVersion } from './versionNumbers';

// ----- Types ----- //
interface FormBundle {
	form: Element;
	submitButton: Element;
	resetButton: Element;
	input: HTMLInputElement;
	identityName: string;
}

// ----- Constants ----- //
const COMPONENT_CONTAINER_CLASSNAME = 'js-signup-form-container' as const;
const COMPONENT_BASE_CLASSNAME = 'js-signup-form' as const;
const MODIFIER_CLASSNAME = {
	waiting: `${COMPONENT_BASE_CLASSNAME}--waiting`,
	success: `${COMPONENT_BASE_CLASSNAME}--success`,
	failure: `${COMPONENT_BASE_CLASSNAME}--failure`,
} as const;

// ----- Procedures ----- //

function handleSubmission(bundle: FormBundle): void {
	const { input, identityName, submitButton, form } = bundle;

	if (!input.value) {
		return;
	}

	form.classList.add(MODIFIER_CLASSNAME.waiting);
	input.setAttribute('disabled', '');
	submitButton.setAttribute('disabled', '');

	// newslettersClient.requestSignUp can throw errors
	// user feedback about the type of error (eg Network Error,
	// Service unavailable) will be handled by the native layer
	// The component only need to know success or failure.
	newslettersClient
		.requestSignUp(input.value, identityName)
		.then((success) => {
			if (success) {
				form.classList.add(MODIFIER_CLASSNAME.success);
			} else {
				form.classList.add(MODIFIER_CLASSNAME.failure);
			}
		})
		.catch(() => {
			form.classList.add(MODIFIER_CLASSNAME.failure);
		})
		.finally(() => {
			form.classList.remove(MODIFIER_CLASSNAME.waiting);
		});
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
	const identityName = form.getAttribute('data-newsletter-id');
	const submitButton = form.querySelector('button[type=submit]');
	const resetButton = form.querySelector('button[type=reset]');
	// typeScript will only cast to the right sub-type of Element if the querySelector
	// string is just the tag - IE querySelector('input') is automatically typed as
	// (HTMLInputElement | null), but querySelector('input[type=email]') is typed to
	// (Element | null) so needs to be cast.

	// eslint-disable-next-line -- because 👆 but eslint disagrees.
	const input = form.querySelector(
		'input[type=email]',
	) as HTMLInputElement | null;

	// see: apps-rendering/src/components/NewsletterSignup/EmailSignupForm.tsx
	// All of these should always be present in the component, so in theory they
	// could be cast as truthy - but to protect against future bugs, this
	// script does not assume that the component will continue to follow the
	// 'contract' and have the required attributes and elements.
	if (!input || !identityName || !submitButton || !resetButton) {
		return;
	}

	const bundle: FormBundle = {
		form,
		submitButton,
		resetButton,
		input,
		identityName,
	};

	form.addEventListener('submit', (event) => {
		event.preventDefault();
		handleSubmission(bundle);
	});

	resetButton.addEventListener('click', (event) => {
		event.preventDefault(); // default behaviour would clear the input field
		handleReset(bundle);
	});
}

function removeContainer(container: Element): void {
	container.parentElement?.removeChild(container);
}

async function initSignupForms(): Promise<void> {
	const version = (await getBridgetVersion()) || '';

	if (isSameOrLaterVersion(version, '2.0.0')) {
		const signupForms = Array.from(
			document.querySelectorAll(`form.${COMPONENT_BASE_CLASSNAME}`),
		);
		signupForms.forEach(setup);
	} else {
		const signupContainers = Array.from(
			document.querySelectorAll(`.${COMPONENT_CONTAINER_CLASSNAME}`),
		);
		signupContainers.forEach(removeContainer);
	}
}

// ----- Exports ----- //

export { initSignupForms };
