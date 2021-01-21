import React from 'react';
import { css, cx } from 'emotion';

import { space, palette } from '@guardian/src-foundations';
import { LinkButton } from '@guardian/src-button';
import { Link } from '@guardian/src-link';
import { cmp } from '@guardian/consent-management-platform';
import { trackLink } from '@frontend/web/components/SignInGate/componentEventTracking';
import { SignInGateProps } from '../types';
import {
	actionButtons,
	bodyBold,
	bodyText,
	firstParagraphOverlay,
	headingStyles,
	hideElementsCss,
	laterButton,
	privacyLink,
	registerButton,
	signInGateContainer,
} from '../shared';

const signInHeader = css`
	padding-bottom: ${space[2]}px;
`;

const signInLinkSection = css`
	padding-bottom: ${space[9]}px;
	> a {
		color: ${palette.text.anchorPrimary};
	}
`;

// No FAQs
export const SignInGateDesignOptVar1 = ({
	signInUrl,
	dismissGate,
	abTest,
	ophanComponentId,
	isComment,
}: SignInGateProps) => {
	return (
		<div
			className={signInGateContainer}
			data-cy="sign-in-gate-design-opt-variant-1"
		>
			<style>{hideElementsCss}</style>
			<div className={firstParagraphOverlay(!!isComment)} />
			<h1 className={headingStyles}>
				Register for free and continue reading
			</h1>
			<p className={bodyBold}>
				It’s important to say this is not a step towards a paywall
			</p>
			<p className={bodyText}>
				Registering is a free and simple way to help us sustain our
				independent Guardian journalism.
			</p>
			<p className={bodyText}>
				When you register with us we are able to improve our news
				experience for you and for others. You will always be able to
				control your own&nbsp;
				<button
					data-cy="sign-in-gate-design-opt-variant-1_privacy"
					className={privacyLink}
					onClick={() => {
						cmp.showPrivacyManager();
						trackLink(ophanComponentId, 'privacy', abTest);
					}}
				>
					privacy settings
				</button>
				. Thank you.
			</p>
			<div className={actionButtons}>
				<LinkButton
					data-cy="sign-in-gate-design-opt-variant-1_register"
					className={registerButton}
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
					data-cy="sign-in-gate-design-opt-variant-1_dismiss"
					className={laterButton}
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
			<div className={signInLinkSection}>
				<p className={cx([bodyBold, signInHeader])}>
					Have a subscription? Made a contribution? Already
					registered?
				</p>
				<Link
					data-cy="sign-in-gate-design-opt-variant-1_signin"
					href={signInUrl}
					onClick={() => {
						trackLink(ophanComponentId, 'sign-in-link', abTest);
					}}
				>
					Sign In
				</Link>
			</div>
		</div>
	);
};
