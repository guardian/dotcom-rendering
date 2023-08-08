import { css } from '@emotion/react';
import { cmp } from '@guardian/consent-management-platform';
import {
	from,
	headline,
	line,
	space,
	textSans,
	until,
} from '@guardian/source-foundations';
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
	hideElementsCss,
	laterButton,
	privacyLink,
	registerButton,
	signInGateContainer,
	signInLink,
} from './shared';

const heading = css`
	${headline.small({ fontWeight: 'bold' })};
	border-top: 2px black solid;
	padding-bottom: ${space[3]}px;

	${from.phablet} {
		padding-right: 160px;
		margin-bottom: ${space[9]}px;
	}
`;

const inlineLink = css`
	margin-left: ${space[4]}px;
`;

const signInHeader = css`
	padding-bottom: 0;
`;

const buttonMargin = css`
	margin-bottom: ${space[6]}px;
`;

const bodyPadding = css`
	${from.phablet} {
		padding-right: ${space[12]}px;
	}
`;

const socialBox = (verticalStack = false) => css`
	display: flex;
	align-items: center;
	margin-top: ${space[6]}px;

	${verticalStack &&
	css`
		${until.tablet} {
			/* stylelint-disable-next-line declaration-no-important */
			padding-right: 0 !important;
			flex-direction: column;
			margin-top: ${space[5]}px;
		}
	`}
`;

const fakeSocialSignInLink = css`
	/* stylelint-disable-next-line declaration-no-important */
	font-weight: bold !important;
	margin-left: 0;
`;

const socialBoxText = css`
	flex: 1 0 auto;
`;

const iconButton = (verticalStack = false) => css`
	:first-of-type {
		margin-left: 0;
	}
	margin-left: ${space[1]}px;

	flex: 1 1 100%;
	/* stylelint-disable-next-line declaration-no-important */
	justify-content: center !important;

	${until.mobileMedium} {
		/* stylelint-disable-next-line declaration-no-important */
		padding: 0 12px !important;
	}

	${from.mobileMedium} {
		margin-left: ${space[3]}px;
	}

	${until.tablet} {
		/* stylelint-disable-next-line declaration-no-important */
		font-size: 15px !important;
	}

	${from.tablet} {
		:first-of-type {
			margin-left: ${space[4]}px;
		}
	}

	svg {
		/* stylelint-disable-next-line declaration-no-important */
		width: 15px !important;

		${from.mobileMedium} {
			/* stylelint-disable-next-line declaration-no-important */
			width: 20px !important;
		}
	}

	${verticalStack &&
	css`
		${until.tablet} {
			margin: ${space[1]}px 0;
			width: 100%;
		}
	`}
`;

const hideMobile = css`
	${until.tablet} {
		display: none;
	}
`;

const showMobile = css`
	${from.tablet} {
		display: none;
	}
`;

const separator = css`
	display: flex;
	align-items: center;
	text-align: center;
	margin-top: ${space[4]}px;

	:before,
	:after {
		content: '';
		flex: 1;
		border-bottom: 1px solid ${line.primary};
	}

	:not(:empty)::before {
		margin-right: 0.25em;
	}

	:not(:empty)::after {
		margin-left: 0.25em;
	}
`;

const separatorText = css`
	${textSans.medium({ lineHeight: 'regular' })}
`;

const facebookIcon = (
	<svg
		width="20"
		height="20"
		viewBox="0 0 20 20"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M7.22779 4.65909V7.5H4.16663V10.6364H7.22779V20H10.9146V10.6364H13.9311L14.6014 7.5H10.9146V5C10.9146 3.61364 11.719 3.13636 12.7692 3.13636H14.6014L14.4897 0.159091C13.5736 0.0681818 12.8586 0 11.8084 0C9.19409 0 7.22779 1.65909 7.22779 4.65909Z"
			fill="#1877F2"
		/>
	</svg>
);

const googleIcon = (
	<svg
		width="20"
		height="20"
		viewBox="0 0 20 20"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M10.5 20C16.0228 20 20.5 15.5228 20.5 10C20.5 4.47715 16.0228 0 10.5 0C4.97715 0 0.5 4.47715 0.5 10C0.5 15.5228 4.97715 20 10.5 20Z"
			fill="white"
		/>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M3.82898 6.7425C4.14271 6.05241 4.58605 5.4503 5.10589 4.90546C6.28225 3.67247 7.70657 2.88285 9.3926 2.61353C11.7524 2.23654 13.8644 2.79299 15.6896 4.36455C15.8049 4.46387 15.8334 4.52191 15.708 4.6447C15.0638 5.27551 14.4298 5.91669 13.792 6.55411C13.7266 6.61947 13.6824 6.69929 13.5662 6.59278C11.9594 5.1205 9.3365 5.13727 7.62902 6.72519C7.04283 7.27036 6.62597 7.92369 6.35306 8.67262C6.31323 8.64655 6.27138 8.62325 6.23383 8.59437C5.43194 7.97748 4.6305 7.35989 3.82898 6.7425Z"
			fill="#D7282A"
		/>
		<mask
			id="mask0"
			mask-type="alpha"
			maskUnits="userSpaceOnUse"
			x="3"
			y="11"
			width="13"
			height="7"
		>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M3.82251 11.6795H15.7829V17.8821H3.82251V11.6795Z"
				fill="white"
			/>
		</mask>
		<g mask="url(#mask0)">
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M6.33399 11.6795C6.56431 12.2645 6.85057 12.8177 7.27597 13.2875C8.35768 14.4821 9.6985 14.9974 11.305 14.8306C12.0514 14.7531 12.7315 14.5003 13.367 14.1119C13.4279 14.1664 13.486 14.2246 13.5502 14.2748C14.2939 14.8555 15.0386 15.4349 15.7829 16.0146C14.9621 16.7942 13.9929 17.3131 12.9028 17.5888C10.3323 18.2385 7.96285 17.8278 5.85884 16.1675C4.98899 15.481 4.3048 14.6331 3.82251 13.6294C4.65972 12.9794 5.49686 12.3294 6.33399 11.6795Z"
				fill="#45AC43"
			/>
		</g>
		<mask
			id="mask1"
			mask-type="alpha"
			maskUnits="userSpaceOnUse"
			x="10"
			y="8"
			width="9"
			height="9"
		>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M10.6722 8.73779H18.072V16.0146H10.6722V8.73779Z"
				fill="white"
			/>
		</mask>
		<g mask="url(#mask1)">
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M15.783 16.0146C15.0387 15.4349 14.294 14.8555 13.5503 14.2749C13.4861 14.2247 13.4281 14.1664 13.3671 14.1119C13.8711 13.7272 14.2916 13.2723 14.5678 12.6943C14.6779 12.4639 14.7553 12.2227 14.8285 11.9788C14.8789 11.8107 14.8633 11.7452 14.6553 11.747C13.4164 11.7576 12.1775 11.7523 10.9385 11.7522C10.6761 11.7522 10.6758 11.752 10.6758 11.4807C10.6757 10.6409 10.6799 9.80116 10.6723 8.96142C10.6708 8.79948 10.6992 8.7373 10.8815 8.7378C13.1667 8.74445 15.4519 8.743 17.7372 8.7399C17.8605 8.73974 17.9381 8.74891 17.9595 8.89896C18.2438 10.8976 18.0159 12.8072 16.9698 14.5711C16.6495 15.1111 16.2647 15.6042 15.783 16.0146Z"
				fill="#5D7FBE"
			/>
		</g>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M6.33406 11.6795C5.49692 12.3295 4.65979 12.9795 3.82258 13.6294C3.41374 12.8694 3.17792 12.0528 3.06791 11.2023C2.87729 9.72876 3.08675 8.31101 3.71186 6.95895C3.74619 6.88467 3.78969 6.81465 3.8289 6.74255C4.63042 7.35986 5.43186 7.97745 6.23375 8.59434C6.2713 8.62322 6.31319 8.64652 6.35298 8.67259C6.01718 9.67291 6.03392 10.6753 6.33406 11.6795Z"
			fill="#F4C300"
		/>
	</svg>
);

const appleIcon = (
	<svg
		width="20"
		height="20"
		viewBox="0 0 20 20"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			d="M15.1173 10.7533C15.1173 13.7106 18.1328 14.8684 18.1328 14.8684C17.4932 16.9092 16.2099 18.6073 14.3429 19.6658C13.0163 20.4178 11.4836 19.6658 9.85097 19.6658C8.21829 19.6658 6.68561 20.4178 5.35908 19.6658C2.58487 18.093 0.867188 14.1765 0.867188 10.7533C0.867188 7.77471 1.46602 6.31155 3.39656 5.31825C5.32711 4.32495 7.77481 5.9394 9.85097 5.9394C11.9271 5.9394 14.7709 4.14886 16.3054 5.31822C16.9019 5.77284 17.3439 6.23053 17.6712 6.7158C17.6712 6.7158 15.1173 7.79601 15.1173 10.7533Z"
			fill="black"
		/>
		<path
			d="M10.9888 2.23343C10.1198 3.4648 9.52522 5.80437 9.52522 5.80437C9.52522 5.80437 11.823 4.76878 12.6033 3.48044C13.3212 2.29499 13.2966 1.61225e-05 13.2966 1.61225e-05C13.2966 1.61225e-05 11.7119 1.20871 10.9888 2.23343Z"
			fill="black"
		/>
	</svg>
);

export const SignInGateFakeSocial = ({
	signInUrl,
	registerUrl,
	guUrl,
	dismissGate,
	abTest,
	ophanComponentId,
}: SignInGateProps) => {
	const verticalButtonStack =
		abTest?.variant === 'fake-social-variant-vertical';

	return (
		<div css={signInGateContainer} data-cy="sign-in-gate-fake-social">
			<style>{hideElementsCss}</style>
			<div css={firstParagraphOverlay} />
			<h1 css={[heading, bodyPadding]}>
				You need to register to keep reading
			</h1>
			<h2 css={[bodySeparator, bodyBold, bodyPadding]}>
				It’s still free to read - this is not a paywall
			</h2>
			<p css={[bodyText, bodyPadding]}>
				We’re committed to keep our quality reporting open. By
				registering and providing us with insight into your preferences,
				you’re helping us to engage with you more deeply, and that allow
				us to keep our journalism free for all.
			</p>
			<p css={[bodyText, bodyPadding]}>
				You’ll always be able to control your own&nbsp;
				<button
					data-cy="sign-in-gate-fake-social_privacy"
					css={privacyLink}
					onClick={() => {
						cmp.showPrivacyManager();
						trackLink(ophanComponentId, 'privacy', abTest);
					}}
				>
					privacy settings
				</button>{' '}
				and every article will remain free.
			</p>
			<div css={[actionButtons, buttonMargin, bodyPadding]}>
				<LinkButton
					data-cy="sign-in-gate-fake-social_register"
					data-ignore="global-link-styling"
					css={registerButton}
					priority="primary"
					size="small"
					href={registerUrl}
					onClick={() => {
						trackLink(ophanComponentId, 'register-link', abTest);
					}}
				>
					Register for free
				</LinkButton>

				<Button
					data-cy="sign-in-gate-fake-social_dismiss"
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
			</div>

			<p css={[bodySeparator, bodyBold, signInHeader, bodyPadding]}>
				Already registered?{' '}
				<Link
					data-cy="sign-in-gate-fake-social_signin"
					data-ignore="global-link-styling"
					css={[signInLink, inlineLink, fakeSocialSignInLink]}
					href={signInUrl}
					onClick={() => {
						trackLink(ophanComponentId, 'sign-in-link', abTest);
					}}
				>
					Sign In
				</Link>
			</p>
			<div css={[separator, separatorText, showMobile]}>
				or continue with
			</div>
			<div
				css={[
					bodyBold,
					signInHeader,
					bodyPadding,
					socialBox(verticalButtonStack),
				]}
			>
				<span css={[hideMobile, socialBoxText]}>Or continue with</span>
				<LinkButton
					data-cy="sign-in-gate-fake-social_facebook"
					data-ignore="global-link-styling"
					priority="tertiary"
					size="small"
					css={iconButton(verticalButtonStack)}
					href={signInUrl}
					onClick={() => {
						trackLink(ophanComponentId, 'facebook-button', abTest);
					}}
					iconSide="left"
					icon={facebookIcon}
				>
					Facebook
				</LinkButton>
				<LinkButton
					data-cy="sign-in-gate-fake-social_google"
					data-ignore="global-link-styling"
					priority="tertiary"
					size="small"
					css={iconButton(verticalButtonStack)}
					href={signInUrl}
					onClick={() => {
						trackLink(ophanComponentId, 'google-button', abTest);
					}}
					iconSide="left"
					icon={googleIcon}
				>
					Google
				</LinkButton>
				<LinkButton
					data-cy="sign-in-gate-fake-social_apple"
					data-ignore="global-link-styling"
					priority="tertiary"
					size="small"
					css={iconButton(verticalButtonStack)}
					href={signInUrl}
					onClick={() => {
						trackLink(ophanComponentId, 'apple-button', abTest);
					}}
					iconSide="left"
					icon={appleIcon}
				>
					Apple
				</LinkButton>
			</div>

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
					Get help with registering or signing in.
				</Link>
			</div>
		</div>
	);
};
