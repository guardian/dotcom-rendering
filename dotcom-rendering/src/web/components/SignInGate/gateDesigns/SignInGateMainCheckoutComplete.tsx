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
	faqPersonalised,
	firstParagraphOverlay,
	headingStyles,
	hideElementsCss,
	laterButton,
	privacyLink,
	registerButton,
	signInGateContainer,
} from './shared';

// HEADER TEXT
const COMPLETE_REGISTRATION_HEADER = 'Complete your registration';
const SIGN_IN_HEADER = 'Sign in to your account';
const SUBSCRIPTION_HEADER = 'Thank you for subscribing';

// SUBHEADER TEXT
const SUBSCRIPTION_SUBHEADER = 'You have a subscription.';
const SUPPORTER_SUBHEADER = 'You are a Guardian supporter';
const SIGN_IN_PROMPT = 'Remember to sign in for a better experience';

// BODY TEXT
const COMPLETE_REGISTRATION_BODY_ADS_INCENTIVE =
	'Complete your registration to stop seeing ads, to see fewer requests for financial support, to subscribe to newsletters and comment, and to easily manage your account. ';
const COMPLETE_REGISTRATION_BODY_NO_ADS_INCENTIVE =
	'Complete your registration to receive fewer requests for financial support, to easily manage your account, and to subscribe to newsletters and comment. ';
const SIGN_IN_BODY_ADS_INCENTIVE =
	'Sign in to stop seeing ads, to see fewer requests for financial support, to subscribe to newsletters and comment, and to easily manage your account. ';
const SIGN_IN_BODY_NO_ADS_INCENTIVE =
	'Sign in to receive fewer requests for financial support, to easily manage your account, and to subscribe to newsletters and comment. ';
const SIGN_IN_INCENTIVES_DIGITAL = [
	'Ad free',
	'Fewer interruptions',
	'Newsletters and comments',
];
const SIGN_IN_INCENTIVES_NON_DIGITAL = [
	'Fewer interruptions',
	'Newsletters and comments',
	'Manage your account',
];

// BUTTON TEXT
const COMPLETE_REGISTRATION_BUTTON = 'Complete registration';
const SIGN_IN_BUTTON = 'Sign in';

const getHeadingText: (product: Product) => string = (product) => {
	const headingMap: Record<Product, string> = {
		DigitalPack: SUBSCRIPTION_HEADER,
		Paper: SUBSCRIPTION_HEADER,
		GuardianWeekly: SUBSCRIPTION_HEADER,
		Contribution: SUBSCRIPTION_HEADER,
	};
	return headingMap[product];
};

const getSubHeadingText: (product: Product) => string = (product) => {
	const subHeadingMap: Record<Product, string> = {
		DigitalPack: SUBSCRIPTION_SUBHEADER,
		Paper: SUBSCRIPTION_SUBHEADER,
		GuardianWeekly: SUBSCRIPTION_SUBHEADER,
		Contribution: SUPPORTER_SUBHEADER,
	};
	return subHeadingMap[product];
};

const getBodyText: (product: Product) => string[] = (product) => {
	const currentUserBodyMap: Record<Product, string[]> = {
		DigitalPack: SIGN_IN_INCENTIVES_DIGITAL,
		Paper: SIGN_IN_INCENTIVES_DIGITAL,
		Contribution: SIGN_IN_INCENTIVES_DIGITAL,
		GuardianWeekly: SIGN_IN_INCENTIVES_DIGITAL,
	};
	return currentUserBodyMap[product];
};

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

	// send new/guest userType to the /register page instead of /signin
	const personaliseSignInURl = (url: string): string => {
		if (userType === 'current') return url;

		const regex = /\/(signin)/;
		const substitution = `/register`;
		return url.replace(regex, substitution);
	};

	return (
		<div css={signInGateContainer} data-cy="sign-in-gate-main">
			<style>{hideElementsCss}</style>
			<div css={firstParagraphOverlay} />
			<h1 css={headingStyles}>{getHeadingText(product)} </h1>
			<p css={[bodySeparator, bodyBold]}>{SIGN_IN_PROMPT}</p>
			<ul css={bodyText}>
				{getBodyText(product).map((item) => {
					return <li key={item}>{item}</li>;
				})}
			</ul>
			<div css={actionButtons}>
				<LinkButton
					data-cy="sign-in-gate-main_register"
					data-ignore="global-link-styling"
					css={registerButton}
					priority="primary"
					size="small"
					href={personaliseSignInURl(signInUrl)}
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

			<div css={[bodySeparator, faqPersonalised]}>
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
