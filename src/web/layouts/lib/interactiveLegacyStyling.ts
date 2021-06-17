import { css } from '@emotion/react';
import { from, until } from '@guardian/src-foundations/mq';

import { center } from '@root/src/web/lib/center';

// Classes present in Frontend that we add for legacy interactives.
export const interactiveLegacyClasses = {
	contentInteractive: 'content--interactive',
	contentLabels: 'content__labels',
	contentLabelsNotImmersive: 'content__labels--not-immersive',
	contentMainColumn: 'content__main-column--interactive',
	headline: 'content__headline',
	labelLink: 'content__label__link',
};

// Styles expected by interactives from the Frontend days. These shouldn't be
// used for new interactives though.
export const interactiveGlobalStyles = css`
	.gs-container {
		${center}
	}

	/* There is room for better solution where we don't have to load global styles onto the body.
		For now this works, but we shouldn't support for it for newly made interactives. */
	.${interactiveLegacyClasses.contentInteractive} {
		margin-bottom: 1rem;

		/* stylelint-disable */
		font-family: GuardianTextEgyptian, Guardian Text Egyptian Web, Georgia,
			serif;
		/* stylelint-enable */

		font-size: 1.0625rem;
		line-height: 1.5;
		font-weight: 400;

		::before,
		::after {
			box-sizing: content-box;
		}
	}

	button,
	input,
	optgroup,
	select,
	textarea {
		color: inherit;
	}

	button,
	html input[type='button'],
	input[type='reset'],
	input[type='submit'] {
		cursor: pointer;
	}

	/* Typically required for ad display. */
	${until.tablet} {
		.hide-until-tablet {
			display: none;
		}
	}

	${from.tablet} {
		.mobile-only {
			display: none;
		}
	}
`;
