// ----- Imports ----- //
import { createElement as h } from 'react';
import { hydrate } from 'react-dom';
import HydratableEmailSignupForm from 'components/NewsletterSignup/HydratableEmailSignupForm';

function hydrateTarget(target: Element) {
	const newsletterId = target.getAttribute('data-newsletter-id');
	if (!newsletterId) {
		console.warn('missing ID');
		return;
	}
	hydrate(h(HydratableEmailSignupForm, { newsletterId }), target);
}

function hydrateSignupForms(): void {
	const targets = Array.from(
		document.querySelectorAll('.js-sign-up-form-container'),
	) as HTMLFormElement[];

	targets.forEach(hydrateTarget);
}

// ----- Exports ----- //

export { hydrateSignupForms };
