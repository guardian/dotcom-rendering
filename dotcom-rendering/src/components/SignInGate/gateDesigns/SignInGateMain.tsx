import { cmp } from '@guardian/libs';
import { Button, Link, LinkButton } from '@guardian/source/react-components';
import { useConfig } from '../../ConfigContext';
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
	registerButton,
	signInGateContainer,
	signInHeader,
	signInLink,
} from './shared';

export const SignInGateMain = ({
	signInUrl,
	registerUrl,
	guUrl,
	dismissGate,
	abTest,
	ophanComponentId,
	isMandatory = false,
}: SignInGateProps) => {
	const { renderingTarget } = useConfig();

	return (
		<div css={signInGateContainer} data-testid="sign-in-gate-main">
			<style>{hideElementsCss}</style>
			<div css={firstParagraphOverlay} />
			<h1 css={headingStyles}>Register: it’s quick and easy</h1>
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
					data-testid="sign-in-gate-main_privacy"
					css={privacyLink}
					onClick={() => {
						cmp.showPrivacyManager();
						trackLink(
							ophanComponentId,
							'privacy',
							renderingTarget,
							abTest,
						);
					}}
				>
					privacy settings
				</button>
				.
			</p>
			<div css={actionButtons}>
				<LinkButton
					data-testid="sign-in-gate-main_register"
					data-ignore="global-link-styling"
					css={registerButton}
					priority="primary"
					size="small"
					href={registerUrl}
					onClick={() => {
						trackLink(
							ophanComponentId,
							'register-link',
							renderingTarget,
							abTest,
						);
					}}
				>
					Register for free
				</LinkButton>
				{!isMandatory && (
					<Button
						data-testid="sign-in-gate-main_dismiss"
						data-ignore="global-link-styling"
						css={laterButton}
						priority="subdued"
						size="small"
						onClick={() => {
							dismissGate();
							trackLink(
								ophanComponentId,
								'not-now',
								renderingTarget,
								abTest,
							);
						}}
					>
						I’ll do it later
					</Button>
				)}
			</div>

			<p css={[bodySeparator, bodyBold, signInHeader]}>
				Have a subscription? Made a contribution? Already registered?
			</p>

			<Link
				data-testid="sign-in-gate-main_signin"
				data-ignore="global-link-styling"
				css={signInLink}
				href={signInUrl}
				onClick={() => {
					trackLink(
						ophanComponentId,
						'sign-in-link',
						renderingTarget,
						abTest,
					);
				}}
			>
				Sign In
			</Link>

			<div css={faq}>
				<Link
					data-ignore="global-link-styling"
					href={`${guUrl}/membership/2019/dec/20/signing-in-to-the-guardian`}
					onClick={() => {
						trackLink(
							ophanComponentId,
							'how-link',
							renderingTarget,
							abTest,
						);
					}}
				>
					Why register & how does it help?
				</Link>

				<Link
					data-ignore="global-link-styling"
					href={`${guUrl}/info/2014/nov/03/why-your-data-matters-to-us-full-text`}
					onClick={() => {
						trackLink(
							ophanComponentId,
							'why-link',
							renderingTarget,
							abTest,
						);
					}}
				>
					How will my information & data be used?
				</Link>

				<Link
					data-ignore="global-link-styling"
					href={`${guUrl}/help/identity-faq`}
					onClick={() => {
						trackLink(
							ophanComponentId,
							'help-link',
							renderingTarget,
							abTest,
						);
					}}
				>
					Get help with registering or signing in
				</Link>
			</div>
		</div>
	);
};
