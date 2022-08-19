// ----- Imports ----- //
import { createElement as h, ReactElement } from 'react';
import HydratableEmailSignupForm from 'components/NewsletterSignup/HydratableEmailSignupForm';
import { err, ok, Result } from '@guardian/types';


const createSignUpComponentFromProps = (
	container: Element,
): Result<string, ReactElement> => {

	const newsletterId = container.getAttribute('data-newsletter-id');

	if (!newsletterId) {
		return err('No newsletterId')
	}

	const component = h(HydratableEmailSignupForm, { newsletterId });
	return ok(component)
};

// ----- Exports ----- //

export {  createSignUpComponentFromProps };
