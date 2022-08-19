// ----- Imports ----- //

// ----- Types ----- //
interface FormBundle {
	form: HTMLFormElement;
	button: HTMLButtonElement;
	input: HTMLInputElement;
	newsletterId: string;
	feedback: Element;
}

// ----- Procedures ----- //

// TO DO - add the domain for the sign-up endpoint to the content security policy
// 'connect-src' attribute.
//apps-rendering/src/server/csp.ts

async function mockedResponse(
	emailAddress: string,
	newsletterId: string,
): Promise<{ status: number }> {
	await new Promise((r) => {
		setTimeout(r, 1000);
	});

	if (!emailAddress.includes('.')) {
		return { status: 500 };
	}

	return { status: 200 };
}

async function handleSubmission(bundle: FormBundle): Promise<void> {
	const { input, newsletterId, button, form, feedback } = bundle;

	form.classList.add('js-signup-form--waiting');
	input.setAttribute('disabled', '');
	button.setAttribute('disabled', '');

	const response = await mockedResponse(input.value, newsletterId);
	form.classList.remove('js-signup-form--waiting');

	if (response.status === 200) {
		form.classList.add('js-signup-form--success');
		feedback.innerHTML = `SIGNED UP to ${newsletterId}`;
	} else {
		form.classList.add('js-signup-form--failure');
		feedback.innerHTML = `Failed to sign up to ${newsletterId}`;
	}
}

function setup(form: HTMLFormElement): void {
	const newsletterId = form.getAttribute('data-newsletter-id');
	const button = form.querySelector('button');
	const input = form.querySelector('input');
	const feedback = form.querySelector('.js-sign-up-form__feedback-message');

	if (!input || !newsletterId || !button || !feedback) {
		console.log('MISSING', { button, input, newsletterId, feedback });
		return;
	}

	const bundle: FormBundle = { form, button, input, newsletterId, feedback };

	form.addEventListener('submit', (event) => {
		event.preventDefault();
		if (!input.value) {
			return;
		}

		handleSubmission(bundle).catch((err: unknown) => {
			console.error(err);
		});
	});
}

function initSignupForms(): void {
	const signupForms = Array.from(
		document.querySelectorAll('form.js-signup-form'),
	) as unknown as HTMLFormElement[];
	// Should be cast directly to HTMLFormElement[] but:
	// Prettier: "This assertion is unnecessary since it does not change the type of the expression"
	// The compiler disagrees. It types querySelectorAll to NodeListOf<Element>, so does needs to be
	// told they will be HTMLFormElement

	signupForms.forEach(setup);
}

// ----- Exports ----- //

export default initSignupForms;
