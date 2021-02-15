import React from 'react';
import { css } from '@emotion/react';

import { space } from '@guardian/src-foundations';
import { LinkButton } from '@guardian/src-button';
import { Link } from '@guardian/src-link';
import { cmp } from '@guardian/consent-management-platform';
import { trackLink } from '@frontend/web/components/SignInGate/componentEventTracking';
import { SignInGateProps } from '../types';
import {
	actionButtons,
	bodyBold,
	bodyText,
	faq,
	firstParagraphOverlay,
	headingStyles,
	hideElementsCss,
	laterButton,
	privacyLink,
	registerButton,
	signInGateContainer,
	signInLink,
} from '../shared';

const signInHeader = css`
	padding-bottom: 0;
	margin-top: ${space[6]}px;
`;

// Move button above text
export const SignInGateDesignOptVar6 = ({
	signInUrl,
	guUrl,
	dismissGate,
	abTest,
	ophanComponentId,
	isComment,
}: SignInGateProps) => {
	return (
		<div
			css={signInGateContainer}
			data-cy="sign-in-gate-design-opt-variant-6"
		>
			<style>{hideElementsCss}</style>
			<div css={firstParagraphOverlay(!!isComment)} />
			<h1 css={headingStyles}>Register for free and continue reading</h1>

			<div css={actionButtons}>
				<LinkButton
					data-cy="sign-in-gate-design-opt-variant-6_register"
					css={registerButton}
					priority="primary"
					size="small"
					href={signInUrl}
					onClick={() => {
						trackLink(ophanComponentId, 'register-link', abTest);
					}}
				>
					Register for free
				</LinkButton>

				<LinkButton
					data-cy="sign-in-gate-design-opt-variant-6_dismiss"
					css={laterButton}
					priority="subdued"
					size="small"
					onClick={() => {
						dismissGate();
						trackLink(ophanComponentId, 'not-now', abTest);
					}}
				>
					I’ll do it later
				</LinkButton>
			</div>

			<p css={bodyBold}>
				It’s important to say this is not a step towards a paywall
			</p>
			<p css={bodyText}>
				Registering is a free and simple way to help us sustain our
				independent Guardian journalism.
			</p>
			<p css={bodyText}>
				When you register with us we are able to improve our news
				experience for you and for others. You will always be able to
				control your own&nbsp;
				<button
					data-cy="sign-in-gate-design-opt-variant-6_privacy"
					css={privacyLink}
					onClick={() => {
						cmp.showPrivacyManager();
						trackLink(ophanComponentId, 'privacy', abTest);
					}}
				>
					privacy settings
				</button>
				. Thank you.
			</p>

			<p css={[bodyBold, signInHeader]}>
				Have a subscription? Made a contribution? Already registered?
			</p>

			<Link
				data-cy="sign-in-gate-design-opt-variant-6_signin"
				css={signInLink}
				href={signInUrl}
				onClick={() => {
					trackLink(ophanComponentId, 'sign-in-link', abTest);
				}}
			>
				Sign In
			</Link>

			<div css={faq}>
				<Link
					href={`${guUrl}/membership/2019/dec/20/signing-in-to-the-guardian`}
					onClick={() => {
						trackLink(ophanComponentId, 'how-link', abTest);
					}}
				>
					Why register & how does it help?
				</Link>

				<Link
					href={`${guUrl}/info/2014/nov/03/why-your-data-matters-to-us-full-text`}
					onClick={() => {
						trackLink(ophanComponentId, 'why-link', abTest);
					}}
				>
					How will my information & data be used?
				</Link>

				<Link
					href={`${guUrl}/help/identity-faq`}
					onClick={() => {
						trackLink(ophanComponentId, 'help-link', abTest);
					}}
				>
					Get help with registering or signing in
				</Link>
			</div>
		</div>
	);
};
