// ----- Imports ----- //
import { parseIntOpt } from 'lib';
import { newslettersClient } from 'native/nativeApi';
import type { Optional } from 'optional';
import { getBridgetVersion } from './bridgetVersion';

// ----- Types ----- //
interface FormBundle {
	form: Element;
	submitButton: Element;
	resetButton: Element;
	input: HTMLInputElement;
	identityName: string;
}

// ----- Constants ----- //
const SIGNUP_CONTAINER_CLASSNAME = 'js-signup-form-container';
const FALLBACK_CONTENT_CLASSNAME = 'js-signup-form-fallback-container';
const LOADING_CONTENT_CLASSNAME = 'js-signup-form-loading-content';
const SIGNUP_COMPONENT_BASE_CLASSNAME = 'js-signup-form';
const MODIFIER_CLASSNAME = {
	waiting: `${SIGNUP_COMPONENT_BASE_CLASSNAME}--waiting`,
	success: `${SIGNUP_COMPONENT_BASE_CLASSNAME}--success`,
	failure: `${SIGNUP_COMPONENT_BASE_CLASSNAME}--failure`,
} as const;

// ----- Pure functions ----- //

/**
 * Parse a version number string and check if it is a version
 * that supports the newslettersClient API.
 *
 * @param version an optional string representing a version number
 * @returns whether string represents a version number with a
 * major version of 2 or higher
 */
const isBridgetCompatible = (version: Optional<string>): boolean =>
	version
		.map((versionString) => versionString.split('.')[0])
		.flatMap(parseIntOpt)
		.map((versionInt) => versionInt >= 2)
		.withDefault(false);

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

function revealContainer(container: HTMLElement): void {
	container.style.display = 'block';
}

const isHTMLElement = (element: Element): element is HTMLElement =>
	element instanceof HTMLElement;

const getElementArray = (className: string): HTMLElement[] =>
	Array.from(document.querySelectorAll(`.${className}`)).filter(
		isHTMLElement,
	);

async function initSignupForms(): Promise<void> {
	const version = await getBridgetVersion();
	const signupContainers = getElementArray(SIGNUP_CONTAINER_CLASSNAME);
	const loadingContainers = getElementArray(LOADING_CONTENT_CLASSNAME);
	const fallbackContainers = getElementArray(FALLBACK_CONTENT_CLASSNAME);

	loadingContainers.forEach(removeContainer);
	if (isBridgetCompatible(version)) {
		signupContainers.forEach(revealContainer);
		const signupForms = getElementArray(SIGNUP_COMPONENT_BASE_CLASSNAME);
		signupForms.forEach(setup);
	} else {
		signupContainers.forEach(removeContainer);
		fallbackContainers.forEach(revealContainer);
	}
}

// ----- Exports ----- //

export { initSignupForms };
