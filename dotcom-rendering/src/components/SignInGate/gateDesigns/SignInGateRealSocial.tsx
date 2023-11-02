import { cmp } from '@guardian/consent-management-platform';
import { Button, Link, LinkButton } from '@guardian/source-react-components';
import { trackLink } from '../componentEventTracking';
import type { SignInGateProps } from '../types';
import {
	actionButtons,
	bodyBold,
	bodySeparator,
	bodyText,
	faq,
	firstParagraphOverlay,
	headingStyles,
	hideElementsCss,
	laterButton,
	privacyLink,
	signInGateContainer,
	signInHeader,
	signInLink,
} from './shared';
import { SocialButton, socialButtonIcon } from '../../SocialButtons';
import { css } from '@emotion/react';
import { space } from '@guardian/source-foundations';

export const SignInGateRealSocial = ({
	signInUrl,
	registerUrl,
	guUrl,
	dismissGate,
	abTest,
	ophanComponentId,
	isMandatory = false,
}: SignInGateProps) => {
	return (
		<div css={signInGateContainer} data-cy="sign-in-gate-main">
			<style>{hideElementsCss}</style>
			<div css={firstParagraphOverlay} />
			<h1 css={headingStyles}>You need to register to keep reading</h1>
			<p css={bodyBold}>
				It’s still free to read – this is not a paywall
			</p>
			<p css={bodyText}>
				We’re committed to keeping our quality reporting open. By
				registering and providing us with insight into your preferences,
				you’re helping us to engage with you more deeply, and that
				allows us to keep our journalism free for all. You’ll always be
				able to control your own{' '}
				<button
					data-cy="sign-in-gate-main_privacy"
					css={privacyLink}
					onClick={() => {
						cmp.showPrivacyManager();
						trackLink(ophanComponentId, 'privacy', abTest);
					}}
				>
					privacy settings
				</button>
				.
			</p>
			<div css={actionButtons}>
				{['google', 'apple'].map((socialProvider, index) => (
					<SocialButton
						key={socialProvider}
						label={socialProvider}
						icon={socialButtonIcon(socialProvider)}
						socialProvider={socialProvider}
					/>
				))}
				<LinkButton
					data-cy="sign-in-gate-main_register"
					data-ignore="global-link-styling"
					priority="tertiary"
					href={registerUrl}
					onClick={() => {
						trackLink(ophanComponentId, 'register-link', abTest);
					}}
				>
					Email and password
				</LinkButton>
			</div>
			{!isMandatory && (
				<Button
					data-cy="sign-in-gate-main_dismiss"
					data-ignore="global-link-styling"
					css={laterButton}
					priority="subdued"
					size="small"
					onClick={() => {
						dismissGate();
						trackLink(ophanComponentId, 'not-now', abTest);
					}}
				>
					I’ll do it later
				</Button>
			)}

			<p
				css={[
					bodySeparator,
					bodyBold,
					signInHeader,
					css`
						margin-top: ${space[4]}px;
					`,
				]}
			>
				Have a subscription? Made a contribution? Already registered?
			</p>

			<Link
				data-cy="sign-in-gate-main_signin"
				data-ignore="global-link-styling"
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
					data-ignore="global-link-styling"
					href={`${guUrl}/membership/2019/dec/20/signing-in-to-the-guardian`}
					onClick={() => {
						trackLink(ophanComponentId, 'how-link', abTest);
					}}
				>
					Why register & how does it help?
				</Link>

				<Link
					data-ignore="global-link-styling"
					href={`${guUrl}/info/2014/nov/03/why-your-data-matters-to-us-full-text`}
					onClick={() => {
						trackLink(ophanComponentId, 'why-link', abTest);
					}}
				>
					How will my information & data be used?
				</Link>

				<Link
					data-ignore="global-link-styling"
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
