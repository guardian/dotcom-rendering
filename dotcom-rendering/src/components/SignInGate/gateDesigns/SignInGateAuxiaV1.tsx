import { css } from '@emotion/react';
import {
	from,
	headlineMedium24,
	headlineMedium34,
	palette,
	space,
	textSans15,
	textSans17,
	textSansBold15,
} from '@guardian/source/foundations';
import { SvgCross, SvgGuardianLogo } from '@guardian/source/react-components';
import { AuthProviderButtons } from '../../AuthProviderButtons/AuthProviderButtons';
import { useConfig } from '../../ConfigContext';
import { ExternalLink } from '../../ExternalLink/ExternalLink';
import { InformationBox } from '../../InformationBox/InformationBox';
import { GuardianTerms } from '../../Terms/Terms';
import { trackLink } from '../componentEventTracking';
import type { SignInGatePropsAuxia, TreatmentContentDecoded } from '../types';
import { hideElementsCss } from './shared';

const DividerWithOr = () => {
	return (
		<div css={dividerContainer}>
			<hr css={line} />
			<span css={orText}>or</span>
			<hr css={line} />
		</div>
	);
};

export const SignInGateAuxiaV1 = ({
	signInUrl,
	dismissGate,
	abTest,
	ophanComponentId,
	userTreatment,
	logTreatmentInteractionCall,
}: SignInGatePropsAuxia) => {
	const { renderingTarget } = useConfig();

	const {
		title,
		subtitle,
		body,
		first_cta_name: firstCtaName,
		first_cta_link: firstCtaLink,
		second_cta_name: secondCtaName,
	} = JSON.parse(userTreatment.treatmentContent) as TreatmentContentDecoded;

	const has = (s?: string) => !!s && s.trim() !== '';
	const isDismissible = has(secondCtaName);
	const dismissStatusLabel = isDismissible
		? 'dismissible'
		: 'non-dismissible';

	return (
		<div css={signInGateContainer} data-testid="sign-in-gate-main">
			<style>{hideElementsCss}</style>
			<div css={topBar}>
				<SvgGuardianLogo textColor="#041F4A" width={96} />

				{isDismissible && (
					<button
						type="button"
						data-testid="sign-in-gate-main_dismiss"
						data-ignore="global-link-styling"
						css={dismissButtonStyles}
						onClick={() => {
							dismissGate();
							trackLink(
								ophanComponentId,
								'not-now',
								renderingTarget,
								abTest,
							);
							void logTreatmentInteractionCall('DISMISSED', '');
						}}
					>
						<SvgCross size="xsmall" />
					</button>
				)}
			</div>

			<h2 css={subHeadingStyles}>{title}</h2>

			{has(subtitle) && <p css={descriptionText}>{subtitle}</p>}
			{has(body) && <p css={descriptionText}>{body}</p>}

			<div css={socialContainer}>
				<AuthProviderButtons
					queryParams={{ returnUrl: signInUrl }}
					providers={['social']}
					onClick={(provider) => {
						trackLink(
							ophanComponentId,
							`sign-in-${provider}-${dismissStatusLabel}`,
							renderingTarget,
							abTest,
						);
						void logTreatmentInteractionCall(
							'CLICKED',
							'SIGN-IN-LINK',
						);
					}}
				/>
			</div>

			<DividerWithOr />

			<div css={emailContainer}>
				<AuthProviderButtons
					queryParams={{ returnUrl: signInUrl }}
					providers={['email']}
					onClick={(provider) => {
						trackLink(
							ophanComponentId,
							`sign-in-${provider}-${dismissStatusLabel}`,
							renderingTarget,
							abTest,
						);
						void logTreatmentInteractionCall(
							'CLICKED',
							'SIGN-IN-LINK',
						);
					}}
				/>
			</div>

			<div css={termsBox}>
				<InformationBox>
					<GuardianTerms />
				</InformationBox>
			</div>

			{has(firstCtaName) && has(firstCtaLink) && (
				<p css={createAccountText}>
					Not signed in before?{' '}
					<ExternalLink
						href={firstCtaLink}
						onClick={() => {
							trackLink(
								ophanComponentId,
								`register-link-${dismissStatusLabel}`,
								renderingTarget,
								abTest,
							);
							void logTreatmentInteractionCall(
								'CLICKED',
								'REGISTER-LINK',
							);
						}}
						data-testid="sign-in-gate-main_register"
						data-ignore="global-link-styling"
					>
						{firstCtaName}
					</ExternalLink>
				</p>
			)}
		</div>
	);
};

// --- Styling ---
export const signInGateContainer = css`
	max-width: 617px;
	padding: ${space[4]}px 0 ${space[10]}px;

	${from.desktop} {
		min-height: 600px;
	}
`;

const topBar = css`
	display: flex;
	justify-content: space-between;
	padding: 0 0 ${space[4]}px;
	border-bottom: 1px solid ${palette.neutral[86]};
`;

const dismissButtonStyles = css`
	background: transparent;
	border: none;
	cursor: pointer;
	padding: 0;
`;

const subHeadingStyles = css`
	${headlineMedium24};
	color: ${palette.brand[400]};
	padding: ${space[2]}px 0 ${space[3]}px;
	white-space: pre-line;

	${from.phablet} {
		${headlineMedium34};
		padding: ${space[2]}px 0 ${space[5]}px;
	}
`;

const descriptionText = css`
	${textSans15};
	padding-bottom: ${space[6]}px;

	${from.phablet} {
		${textSans17};
		padding-bottom: ${space[5]}px;
	}
`;

const socialContainer = css`
	padding-bottom: ${space[5]}px;
`;

const emailContainer = css`
	padding-bottom: ${space[4]}px;

	${from.phablet} {
		padding-bottom: ${space[3]}px;
	}
`;

const termsBox = css`
	padding-bottom: ${space[4]}px;

	${from.phablet} {
		padding-bottom: ${space[3]}px;
	}
`;

const createAccountText = css`
	${textSans15};
	color: ${palette.neutral[10]};

	a {
		${textSansBold15};
	}
`;

const dividerContainer = css`
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 0 8px 12px;
`;

const line = css`
	flex: 1;
	border: none;
	border-top: 1px solid ${palette.neutral[73]};
`;

const orText = css`
	${textSansBold15};
	color: ${palette.neutral[46]};
	padding: 0 8px;
	white-space: nowrap;
	line-height: 20px;

	${from.phablet} {
		line-height: 24px;
	}
`;
