// ----- Imports ----- //
import { err, ok, ResultKind } from '@guardian/types';
import type { Result } from '@guardian/types';
import HydratableEmailSignupForm from 'components/NewsletterSignup/HydratableEmailSignupForm';
import type { Props } from 'components/NewsletterSignup/HydratableEmailSignupForm';
import { createElement as h } from 'react';
import type { ReactElement } from 'react';

const getPropsFromContainer = (container: Element): Result<string, Props> => {
	const newsletterId = container.getAttribute('data-newsletter-id');
	if (!newsletterId) {
		return err('No newsletterId');
	}
	return ok({ newsletterId });
};

const createSignUpComponentFromProps = (
	container: Element,
): Result<string, ReactElement> => {
	const propResult = getPropsFromContainer(container);
	if (propResult.kind === ResultKind.Err) {
		return propResult;
	}
	const component = h(HydratableEmailSignupForm, propResult.value);
	return ok(component);
};

// ----- Exports ----- //

export { createSignUpComponentFromProps };
