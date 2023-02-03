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

const getHeadingText: (userType: UserType) => string = (userType) => {
	const headingMap: Record<UserType, string> = {
		new: 'Complete your registration',
		guest: 'Complete your registration',
		current: 'Sign in to your account',
	};
	return headingMap[userType];
};

const getSubHeadingText: (product: Product) => string = (product) => {
	const subHeadingMap: Record<Product, string> = {
		DigitalPack: 'You have a subscription.',
		Paper: 'You have a subscription.',
		GuardianWeekly: 'You have a subscription.',
		Contribution: 'You are a Guardian supporter',
	};
	return subHeadingMap[product];
};

const getBodyText: (
	checkoutCompleteCookieData: CheckoutCompleteCookieData,
) => string = (checkoutCompleteCookieData) => {
	const newOrGuestNonDigitalBodyText =
		'Complete your registration to receive fewer requests for financial support, to easily manage your account, and to subscribe to newsletters and comment.';
	const newOrGuestUserBodyMap: Record<Product, string> = {
		DigitalPack:
			'Complete your registration to stop seeing ads, to see fewer requests for financial support, to subscribe to newsletters and comment, and to easily manage your account.',
		Paper: newOrGuestNonDigitalBodyText,
		Contribution: newOrGuestNonDigitalBodyText,
		GuardianWeekly: newOrGuestNonDigitalBodyText,
	};

	const currentNonDigitalBodyText =
		'Complete your registration to receive fewer requests for financial support, to easily manage your account, and to subscribe to newsletters and comment.';
	const currentUserBodyMap: Record<Product, string> = {
		DigitalPack:
			'Sign in to stop seeing ads, to see fewer requests for financial support, to subscribe to newsletters and comment, and to easily manage your account. ',
		Paper: currentNonDigitalBodyText,
		Contribution: currentNonDigitalBodyText,
		GuardianWeekly: currentNonDigitalBodyText,
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

const getButtonText: (userType: UserType) => string = (userType) => {
	const buttonMap: Record<UserType, string> = {
		new: 'Complete registration',
		guest: 'Complete registration',
		current: 'Sign in',
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
			<h1 css={headingStyles}>{getHeadingText(userType)} </h1>
			<p css={[bodySeparator, bodyBold]}>{getSubHeadingText(product)}</p>
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
