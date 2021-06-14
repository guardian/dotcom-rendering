import { css } from '@emotion/react';

import { center } from '@root/src/web/lib/center';

// Styles expected by interactives from the Frontend days. These shouldn't be
// used for new interactives though.
export const interactiveGlobalStyles = css`
	.gs-container {
		${center}
	}

	/* There is room for better solution where we don't have to load global styles onto the body.
		For now this works, but we shouldn't support for it for newly made interactives. */
	body {
		margin-bottom: 1rem;

		/* stylelint-disable */
		font-family: GuardianTextEgyptian, Guardian Text Egyptian Web, Georgia,
			serif;
		/* stylelint-enable */

		font-size: 1.0625rem;
		line-height: 1.5;
		font-weight: 400;
	}
`;

// Classes present in Frontend that we add for legacy interactives.
export const interactiveLegacyClasses = {
	contentInteractive: 'content--interactive',
	headline: 'content__headline',
	labelLink: 'content__label__link',
};
