import React, { FunctionComponent } from 'react';
import { css, cx } from 'emotion';

import {
	headline,
	body,
	titlepiece,
} from '@guardian/src-foundations/typography';
import { from } from '@guardian/src-foundations/mq';
import { space, palette } from '@guardian/src-foundations';
import { LinkButton } from '@guardian/src-button';
import { Link } from '@guardian/src-link';
import { cmp } from '@guardian/consent-management-platform';
import { trackLink } from '@frontend/web/components/SignInGate/componentEventTracking';
import { SerializedStyles } from '@emotion/core';
import { SignInGateProps } from '../types';
import {
	actionButtons,
	bodyText,
	firstParagraphOverlay,
	hideElementsCss,
	laterButton,
	privacyLink,
	registerButton,
	signInGateContainer,
} from '../shared';

interface LinesProps {
	cssOverrides?: SerializedStyles;
}

export const Lines: FunctionComponent<LinesProps> = (props) => {
	const { cssOverrides } = props;
	const n = 3;
	const thickness = 1;
	const distance = 6;
	const height = (n - 1) * distance + thickness;
	const color = palette.brand[400];

	const linesCss = css`
		background-image: repeating-linear-gradient(
			to bottom,
			${color},
			${color} ${thickness}px,
			transparent ${thickness}px,
			transparent ${distance}px
		);
		background-repeat: 'repeat';
		background-position: 'top';
		height: ${height}px;
		border: 0;
		margin: 0;
		opacity: 0.2;
		width: calc(100% + 20px);
		padding-left: 20px !important;
		margin-left: -20px !important;
		${from.leftCol} {
			width: calc(100% + 10px);
			padding-left: 10px !important;
			margin-left: -10px !important;
		}
		${cssOverrides}
	`;

	return <hr className={linesCss} />;
};

const signInGateBackground = css`
	/* stylelint-disable-next-line color-no-hex */
	background-color: #eaf1fd;
`;

const headingStyles = css`
	${titlepiece.small({})};
	border-top: 2px ${palette.brandText.ctaPrimary} solid;
	padding-bottom: ${space[9]}px;
	color: ${palette.brandText.ctaPrimary};

	${from.phablet} {
		padding-right: 160px;
		${headline.medium({ fontWeight: 'bold' })};
	}
`;

const bodyBold = css`
	${body.medium({ fontWeight: 'bold' })}
	padding-bottom: 20px;
	color: ${palette.brandText.ctaPrimary};
	${from.phablet} {
		padding-right: 110px;
	}
`;

const leftMarginFill = css`
	padding-left: 20px !important;
	margin-left: -20px !important;
	${from.leftCol} {
		padding-left: 10px !important;
		margin-left: -10px !important;
	}
`;

const lineTop = css`
	border-top: 1px solid rgba(5, 41, 98, 0.2);
`;

const signInHeader = css`
	padding-bottom: ${space[2]}px;
`;

const signInLinkSection = css`
	padding-bottom: ${space[9]}px;
	line-height: ${space[2]}px;
`;

const faq = css`
	padding-top: ${space[3]}px;
	padding-bottom: 18px;

	& a {
		color: ${palette.brandText.ctaPrimary};
		display: block;
		margin-bottom: ${space[4]}px;
	}

	& a:hover {
		color: ${palette.brandText.ctaPrimary};
	}
`;

// Slight colour highlight
export const SignInGateDesignOptVar5 = ({
	signInUrl,
	guUrl,
	dismissGate,
	abTest,

	ophanComponentId,
	isComment,
}: SignInGateProps) => {
	return (
		<div
			className={cx([
				signInGateContainer,
				signInGateBackground,
				leftMarginFill,
			])}
			data-cy="sign-in-gate-design-opt-variant-5"
		>
			<style>{hideElementsCss}</style>
			<div className={firstParagraphOverlay(!!isComment)} />
			<h1 className={cx([headingStyles, leftMarginFill])}>
				Register for free and continue reading
			</h1>
			{/* TODO leftMargin fill not working - see Source documentation:
            https://www.theguardian.design/2a1e5182b/p/2619e3-overriding-styles
            cssOverrides don't work either */}
			<Lines />
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
					data-cy="sign-in-gate-design-opt-variant-5_privacy"
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
					data-cy="sign-in-gate-design-opt-variant-5_register"
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
					data-cy="sign-in-gate-design-opt-variant-5_dismiss"
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
				<p
					className={cx([
						bodyBold,
						signInHeader,
						lineTop,
						leftMarginFill,
					])}
				>
					Have a subscription? Made a contribution? Already
					registered?
				</p>

				<Link
					data-cy="sign-in-gate-design-opt-variant-5_signin"
					href={signInUrl}
					onClick={() => {
						trackLink(ophanComponentId, 'sign-in-link', abTest);
					}}
				>
					Sign In
				</Link>
			</div>
			<div className={faq}>
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
