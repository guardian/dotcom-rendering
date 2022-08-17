// ----- Imports ----- //


// ----- Procedures ----- //

function setup(form: HTMLFormElement) {
	const newsletterId = form.getAttribute('data-newsletter-id');
	const button = form.querySelector('button');
	const input = form.querySelector('input');

	if (!input) {
		console.log('MISSING INPUT', { button, input });
		return;
	}

	form.addEventListener('submit', (event)=> {
		event.preventDefault()
		console.log('SUBMIT', input.value, newsletterId)
	})
}

function initSignupForms(): void {
	const signupForms = Array.from(
		document.querySelectorAll('form.js-signup-form'),
	) as HTMLFormElement[];

	signupForms.forEach(setup);
}

// ----- Exports ----- //

export default initSignupForms;
