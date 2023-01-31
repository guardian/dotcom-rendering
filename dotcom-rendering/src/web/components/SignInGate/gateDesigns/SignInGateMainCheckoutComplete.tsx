import { cmp } from '@guardian/consent-management-platform';
import { Button, Link, LinkButton } from '@guardian/source-react-components';
import { trackLink } from '../componentEventTracking';
import type { SignInGateProps } from '../types';
// import type { SignInGatePropsWithCheckoutCompleteCookieData } from '../types';
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

export const SignInGateMainCheckoutComplete = ({
	signInUrl,
	guUrl,
	dismissGate,
	abTest,
	ophanComponentId,
	isMandatory = false,
	checkoutCompleteCookieData,
}: SignInGateProps) => {
	const heading: (userType: string, product: string) => string = (
		userType,
		product,
	) => {
		if (userType === 'new' && product === 'DigitalPack') {
			return 'Complete your registration';
		} else return '';
	};

	const subHeading: (userType: string, product: string) => string = (
		userType,
		product,
	) => {
		if (userType === 'new' && product === 'DigitalPack') {
			return 'You have a subscription.';
		} else return '';
	};

	const body: (userType: string, product: string) => string = (
		userType,
		product,
	) => {
		if (userType === 'new' && product === 'DigitalPack') {
			return 'Complete your registration to stop seeing ads, to see fewer requests for financial support, to subscribe to newsletters and comment, and to easily manage your account. ';
		}
		return '';
	};

	const buttonText: (userType: string, product: string) => string = (
		userType,
		product,
	) => {
		if (userType === 'new' && product === 'DigitalPack') {
			return 'Complete registration';
		} else return '';
	};
	const { userType, product } =
		checkoutCompleteCookieData !== undefined
			? checkoutCompleteCookieData
			: { userType: '', product: '' };

	return (
		<div css={signInGateContainer} data-cy="sign-in-gate-main">
			<style>{hideElementsCss}</style>
			<div css={firstParagraphOverlay} />
			<h1 css={headingStyles}>{heading(userType, product)} </h1>
			<p css={bodyBold}>{subHeading(userType, product)}</p>
			<p css={bodyText}>
				{body(userType, product)}
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
					{buttonText(userType, product)}
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
