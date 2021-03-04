import React from 'react';
import { cx } from 'emotion';

import { LinkButton } from '@guardian/src-button';
import { Link } from '@guardian/src-link';
import { trackLink } from '@frontend/web/components/SignInGate/componentEventTracking';
import { cmp } from '@root/node_modules/@guardian/consent-management-platform';
import { CurrentABTest, SignInGateProps } from '../types';
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
	signInHeader,
	signInLink,
} from '../shared';

// if the words 'privacy settings' are present in the paragraph once, replace it with the privacy settings CMP button
const formatParagraph = (
	paragraph: string,
	ophanComponentId: string,
	abTest: CurrentABTest | undefined,
) => {
	if (paragraph.includes('privacy settings')) {
		const parts = paragraph.split('privacy settings');
		if (parts.length === 2) {
			return (
				<p className={bodyText}>
					{parts[0]}
					<button
						data-cy={`sign-in-gate-${abTest?.variant}_privacy`}
						className={privacyLink}
						onClick={() => {
							cmp.showPrivacyManager();
							trackLink(ophanComponentId, 'privacy', abTest);
						}}
					>
						privacy settings
					</button>
					{parts[1]}
				</p>
			);
		}
	}
	return <p className={bodyText}>{paragraph}</p>;
};

export const SignInGateCopyOptVar = ({
	signInUrl,
	guUrl,
	dismissGate,
	abTest,
	ophanComponentId,
	isComment,
	signInGateCopy,
}: SignInGateProps) => {
	return (
		<div
			className={signInGateContainer}
			data-cy={`sign-in-gate-${abTest?.variant}`}
		>
			<style>{hideElementsCss}</style>
			<div className={firstParagraphOverlay(!!isComment)} />
			<h1 className={headingStyles}>{signInGateCopy?.header}</h1>
			<p className={bodyBold}>{signInGateCopy?.subHeader}</p>
			{signInGateCopy?.paragraphs.map((paragraph) => {
				return formatParagraph(paragraph, ophanComponentId, abTest);
			})}
			<div className={actionButtons}>
				<LinkButton
					data-cy={`sign-in-gate-${abTest?.variant}_register`}
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
					data-cy={`sign-in-gate-${abTest?.variant}_dismiss`}
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
			<p className={cx([bodyBold, signInHeader])}>
				Have a subscription? Made a contribution? Already registered?
			</p>
			<Link
				data-cy={`sign-in-gate-${abTest?.variant}_signin`}
				className={signInLink}
				href={signInUrl}
				onClick={() => {
					trackLink(ophanComponentId, 'sign-in-link', abTest);
				}}
			>
				Sign In
			</Link>
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
