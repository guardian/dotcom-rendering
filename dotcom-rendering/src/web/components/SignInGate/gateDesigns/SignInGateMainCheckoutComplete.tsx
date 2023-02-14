import { Button, Link, LinkButton } from '@guardian/source-react-components';
import { trackLink } from '../componentEventTracking';
import type {
	Product,
	SignInGatePropsWithCheckoutCompleteCookieData,
	UserType,
} from '../types';
import {
	bodySpacing,
	bulletStyles,
	faqPersonalised,
	firstParagraphOverlay,
	hideElementsCss,
	notNowButton,
	personalisedActionButtons,
	personalisedBodyBold,
	personalisedBodyTextList,
	personalisedHeadingStyles,
	registerButton,
	signInGateContainer,
} from './shared';

// HEADER TEXT
const SUBSCRIPTION_HEADER = 'Thank you for subscribing';
const SUPPORTER_HEADER = 'Thank you for your support';

// SUBHEADER TEXT
const SIGN_IN_PROMPT = 'Remember to sign in for a better experience.';

// BODY TEXT
const SIGN_IN_INCENTIVES_DIGITAL = [
	'Supporter rewards – unlock the benefits of your support',
	'Incisive analysis and original reporting direct to your inbox, with our newsletters',
	'Get involved in the discussion – comment on stories',
];

const SIGN_IN_INCENTIVES_NON_DIGITAL = [
	'Fewer interruptions',
	'Incisive analysis and original reporting direct to your inbox, with our newsletters',
	'Get involved in the discussion – comment on stories',
];

// BUTTON TEXT
const COMPLETE_REGISTRATION_BUTTON = 'Complete registration';
const SIGN_IN_BUTTON = 'Sign in';

const getHeadingText: (product: Product) => string = (product) => {
	const headingMap: Record<Product, string> = {
		DigitalPack: SUBSCRIPTION_HEADER,
		Paper: SUBSCRIPTION_HEADER,
		GuardianWeekly: SUBSCRIPTION_HEADER,
		Contribution: SUPPORTER_HEADER,
	};
	return headingMap[product];
};

const getButtonText: (userType: UserType) => string = (userType) => {
	const buttonMap: Record<UserType, string> = {
		new: COMPLETE_REGISTRATION_BUTTON,
		guest: COMPLETE_REGISTRATION_BUTTON,
		current: SIGN_IN_BUTTON,
	};
	return buttonMap[userType];
};

const getBodyText: (product: Product) => string[] = (product) => {
	const bodyTextMap: Record<Product, string[]> = {
		DigitalPack: SIGN_IN_INCENTIVES_DIGITAL,
		Paper: SIGN_IN_INCENTIVES_NON_DIGITAL,
		GuardianWeekly: SIGN_IN_INCENTIVES_NON_DIGITAL,
		Contribution: SIGN_IN_INCENTIVES_NON_DIGITAL,
	};
	return bodyTextMap[product];
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
		if (userType === 'new' || userType == 'guest') {
			const regex = /\/(signin)/;
			const substitution = `/register`;
			return url.replace(regex, substitution);
		}
		return url;
	};

	return (
		<div css={signInGateContainer} data-cy="sign-in-gate-main">
			<style>{hideElementsCss}</style>
			<div css={firstParagraphOverlay} />
			<h1 css={personalisedHeadingStyles}>{getHeadingText(product)}</h1>
			<div css={bodySpacing}>
				<p css={personalisedBodyBold}>{SIGN_IN_PROMPT}</p>
				<p css={personalisedBodyBold}>This includes: </p>
			</div>
			<ul css={bulletStyles}>
				{getBodyText(product).map((item) => {
					return (
						<li css={personalisedBodyTextList} key={item}>
							{item}
						</li>
					);
				})}
			</ul>
			<div css={personalisedActionButtons}>
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
						css={notNowButton}
						priority="subdued"
						size="small"
						onClick={() => {
							dismissGate();
							trackLink(ophanComponentId, 'not-now', abTest);
						}}
					>
						Not now
					</Button>
				)}
			</div>

			<div css={faqPersonalised}>
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
