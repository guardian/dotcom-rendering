import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { from, space, until } from '@guardian/source/foundations';
import { palette } from '../../../../palette';
import { contentTransitionEasing } from '../../shared/transitions';

const newsletterFormTransition = `0.2s ${contentTransitionEasing}`;

export const styles = {
	form: css`
		display: grid;
		column-gap: ${space[3]}px;
		row-gap: ${space[2]}px;
		align-items: end;

		${until.tablet} {
			row-gap: ${space[3]}px;
		}
	`,
	collapsedForm: css`
		row-gap: 0;
	`,
	bannerSignedInLayout: css`
		grid-template-columns: minmax(0, 1fr);
		grid-template-areas: 'submit';
		margin-top: ${space[2]}px;
		row-gap: ${space[4]}px;
		${until.tablet} {
			padding: 0 10px;
			margin-top: 0;
		}
	`,
	bannerSignedOutLayout: css`
		grid-template-columns: minmax(0, 1fr) auto;
		grid-template-areas: 'email submit';

		${until.tablet} {
			grid-template-columns: 1fr;
			grid-template-areas:
				'email'
				'submit';
			padding: 0 10px;
		}
	`,
	signedInButton: css`
		max-width: 100%;
		${from.tablet} {
			width: 240px;
		}
	`,
	emailField: css`
		grid-area: email;
		min-width: 0;

		label div {
			color: ${palette('--newsletter-signup-input-text')};
			font-size: 14px;
		}

		input {
			color: ${palette('--newsletter-signup-input-text')};
			background-color: ${palette(
				'--newsletter-signup-input-background',
			)};
		}

		[role='alert'] {
			min-height: 24px;
			line-height: 24px;
			margin-bottom: 6px;

			svg {
				width: 24px;
				height: 24px;
				transform: none;
			}
		}
	`,
	additionalFields: (isExpanded: boolean): SerializedStyles => css`
		display: grid;
		grid-column: 1 / -1;
		grid-template-rows: ${isExpanded ? '1fr' : '0fr'};
		margin-top: -${space[2]}px;
		transition: ${newsletterFormTransition};
		transition-property: grid-template-rows;

		> div {
			min-height: 0;
			overflow: hidden;
		}

		${until.tablet} {
			margin-top: -${space[3]}px;
		}

		@media (prefers-reduced-motion: reduce) {
			transition: none;
		}
	`,
	additionalFieldsContent: css`
		padding-top: ${space[2]}px;
		padding-bottom: 28px;

		${until.tablet} {
			padding-top: ${space[3]}px;
		}
	`,
	toggleContainer: css`
		grid-column: 1 / -1;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: ${space[3]}px;
		min-width: 0;
	`,
	marketingToggleBox: css`
		width: 100%;
		padding: ${space[2]}px;
		border: 1px solid ${palette('--card-border-supporting')};
		border-radius: 4px;
		label {
			color: ${palette('--newsletter-signup-toggle-text')};
		}
	`,
	recaptchaContainer: css`
		.grecaptcha-badge {
			visibility: hidden;
		}
	`,
	privacyContainer: (
		isSignedIn: boolean | 'Pending',
	): SerializedStyles => css`
		margin-top: ${space[2]}px;
		${until.tablet} {
			margin-top: ${isSignedIn ? 0 : space[3]}px;
		}
		grid-column: 1 / -1;
		${isSignedIn === true &&
		css`
			margin-top: 0;
		`};
	`,
	submitButtonContainer: css`
		grid-area: submit;
		width: 100%;
		display: flex;
		gap: ${space[2]}px;
		${from.tablet} {
			width: auto;
		}
	`,
	submitButton: css`
		width: 100%;
		${from.tablet} {
			width: auto;
		}
	`,
};
