import { cmp } from '@guardian/consent-management-platform';
import { Button, Link, LinkButton } from '@guardian/source-react-components';
import { trackLink } from '../componentEventTracking';
import type {
	CheckoutCompleteCookieData,
	Product,
	SignInGatePropsWithCheckoutCompleteCookieData,
	UserType,
} from '../types';
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

export const COMPLETE_REGISTRATION_HEADER = 'Complete your registration';
export const SIGN_IN_HEADER = 'Sign in to your account';

const getHeadingText: (userType: UserType) => string = (userType) => {
	const headingMap: Record<UserType, string> = {
		new: COMPLETE_REGISTRATION_HEADER,
		guest: COMPLETE_REGISTRATION_HEADER,
		current: SIGN_IN_HEADER,
	};
	return headingMap[userType];
};

export const SUBSCRIPTION_SUBHEADER = 'You have a subscription.';
export const SUPPORTER_SUBHEADER = 'You are a Guardian supporter';

const getSubHeadingText: (product: Product) => string = (product) => {
	const subHeadingMap: Record<Product, string> = {
		DigitalPack: SUBSCRIPTION_SUBHEADER,
		Paper: SUBSCRIPTION_SUBHEADER,
		GuardianWeekly: SUBSCRIPTION_SUBHEADER,
		Contribution: SUPPORTER_SUBHEADER,
	};
	return subHeadingMap[product];
};

// Couldn't think of a better name distinction here...
export const COMPLETE_REGISTRATION_BODY_STOP_ADS =
	'Complete your registration to stop seeing ads, to see fewer requests for financial support, to subscribe to newsletters and comment, and to easily manage your account. ';
export const COMPLETE_REGISTRATION_BODY =
	'Complete your registration to receive fewer requests for financial support, to easily manage your account, and to subscribe to newsletters and comment. ';
export const SIGN_IN_BODY_STOP_ADS =
	'Sign in to stop seeing ads, to see fewer requests for financial support, to subscribe to newsletters and comment, and to easily manage your account. ';
export const SIGN_IN_BODY =
	'Sign in to receive fewer requests for financial support, to easily manage your account, and to subscribe to newsletters and comment. ';

const getBodyText: (
	checkoutCompleteCookieData: CheckoutCompleteCookieData,
) => string = (checkoutCompleteCookieData) => {
	const newOrGuestUserBodyMap: Record<Product, string> = {
		DigitalPack: COMPLETE_REGISTRATION_BODY_STOP_ADS,
		Paper: COMPLETE_REGISTRATION_BODY,
		Contribution: COMPLETE_REGISTRATION_BODY,
		GuardianWeekly: COMPLETE_REGISTRATION_BODY,
	};

	const currentUserBodyMap: Record<Product, string> = {
		DigitalPack: SIGN_IN_BODY_STOP_ADS,
		Paper: SIGN_IN_BODY,
		Contribution: SIGN_IN_BODY,
		GuardianWeekly: SIGN_IN_BODY,
	};

	const { userType, product } = checkoutCompleteCookieData;

	switch (userType) {
		case 'new':
			return newOrGuestUserBodyMap[product];
		case 'guest':
			return newOrGuestUserBodyMap[product];
		case 'current':
			return currentUserBodyMap[product];
	}
};

export const COMPLETE_REGISTRATION_BUTTON = 'Complete registration';
export const SIGN_IN_BUTTON = 'Sign in';

const getButtonText: (userType: UserType) => string = (userType) => {
	const buttonMap: Record<UserType, string> = {
		new: COMPLETE_REGISTRATION_BUTTON,
		guest: COMPLETE_REGISTRATION_BUTTON,
		current: SIGN_IN_BUTTON,
	};
	return buttonMap[userType];
};

export const SignInGateMainCheckoutComplete = ({
	signInUrl,
	guUrl,
	dismissGate,
	abTest,
	ophanComponentId,
	isMandatory = false,
	checkoutCompleteCookieData,
}: SignInGatePropsWithCheckoutCompleteCookieData) => {
	const { userType, product } = checkoutCompleteCookieData;

	return (
		<div css={signInGateContainer} data-cy="sign-in-gate-main">
			<style>{hideElementsCss}</style>
			<div css={firstParagraphOverlay} />
			<h1 css={headingStyles}>{getHeadingText(userType)} </h1>
			<p css={bodyBold}>{getSubHeadingText(product)}</p>
			<p css={bodyText}>
				{getBodyText(checkoutCompleteCookieData)}
				You’ll always be able to control your own{' '}
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
				<LinkButton
					data-cy="sign-in-gate-main_register"
					data-ignore="global-link-styling"
					css={registerButton}
					priority="primary"
					size="small"
					href={signInUrl}
					onClick={() => {
						trackLink(ophanComponentId, 'register-link', abTest);
					}}
				>
					{getButtonText(userType)}
				</LinkButton>
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
			</div>

			<p css={[bodySeparator, bodyBold, signInHeader]}>
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
