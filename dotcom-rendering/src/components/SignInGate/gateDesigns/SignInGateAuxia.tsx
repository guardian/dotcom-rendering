import { cmp } from '@guardian/libs';
import { Button, Link, LinkButton } from '@guardian/source/react-components';
import { useConfig } from '../../ConfigContext';
import { trackLink } from '../componentEventTracking';
import type { SignInGatePropsAuxia, TreatmentContentDecoded } from '../types';
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

export const SignInGateAuxia = ({
	guUrl,
	signInUrl,
	dismissGate,
	abTest,
	ophanComponentId,
	userTreatment,
	logTreatmentInteractionCall,
}: SignInGatePropsAuxia) => {
	const { renderingTarget } = useConfig();

	const treatmentContent = JSON.parse(
		userTreatment.treatmentContent,
	) as TreatmentContentDecoded;

	/*
	The component must be written to gracefully handle empty values for the following field:
		- subtitle
		- body
		- privacy_button_name
	*/

	const title = treatmentContent.title;
	const subtitle = treatmentContent.subtitle;
	const body = treatmentContent.body;
	const privacy_button_name = treatmentContent.privacy_button_name;
	const firstCtaName = treatmentContent.first_cta_name;
	const firstCtaLink = treatmentContent.first_cta_link;
	const secondCtaName = treatmentContent.second_cta_name;

	const hasContent = (input: string): boolean => {
		return input !== '';
	};

	return (
		<div css={signInGateContainer} data-testid="sign-in-gate-main">
			<style>{hideElementsCss}</style>
			<div css={firstParagraphOverlay} />
			<h1 css={headingStyles}>{title}</h1>
			{hasContent(subtitle) && <p css={bodyBold}>{subtitle}</p>}
			{hasContent(body) && (
				<p css={bodyText}>
					{body}{' '}
					{hasContent(privacy_button_name) && (
						<button
							data-testid="sign-in-gate-main_privacy"
							css={privacyLink}
							onClick={async () => {
								cmp.showPrivacyManager();
								trackLink(
									ophanComponentId,
									'privacy',
									renderingTarget,
									abTest,
								);
								await logTreatmentInteractionCall(
									'CLICKED',
									'PRIVACY-BUTTON',
								);
							}}
						>
							privacy settings
						</button>
					)}
				</p>
			)}
			<div css={actionButtons}>
				<LinkButton
					data-testid="sign-in-gate-main_register"
					data-ignore="global-link-styling"
					cssOverrides={registerButton}
					priority="primary"
					size="small"
					href={firstCtaLink}
					onClick={async () => {
						trackLink(
							ophanComponentId,
							'register-link',
							renderingTarget,
							abTest,
						);
						await logTreatmentInteractionCall(
							'CLICKED',
							'REGISTER-LINK',
						);
					}}
				>
					{firstCtaName}
				</LinkButton>
				<Button
					data-testid="sign-in-gate-main_dismiss"
					data-ignore="global-link-styling"
					cssOverrides={laterButton}
					priority="subdued"
					size="small"
					onClick={async () => {
						dismissGate();
						trackLink(
							ophanComponentId,
							'not-now',
							renderingTarget,
							abTest,
						);
						await logTreatmentInteractionCall('DISMISSED', '');
					}}
				>
					{secondCtaName}
				</Button>
			</div>

			<p css={[bodySeparator, bodyBold, signInHeader]}>
				Have a subscription? Made a contribution? Already registered?
			</p>

			<Link
				data-testid="sign-in-gate-main_signin"
				data-ignore="global-link-styling"
				cssOverrides={signInLink}
				href={signInUrl}
				onClick={async () => {
					trackLink(
						ophanComponentId,
						'sign-in-link',
						renderingTarget,
						abTest,
					);
					await logTreatmentInteractionCall(
						'CLICKED',
						'SIGN-IN-LINK',
					);
				}}
			>
				Sign In
			</Link>

			<div css={faq}>
				<Link
					data-ignore="global-link-styling"
					href={`${guUrl}/membership/2019/dec/20/signing-in-to-the-guardian`}
					onClick={async () => {
						trackLink(
							ophanComponentId,
							'how-link',
							renderingTarget,
							abTest,
						);
						await logTreatmentInteractionCall(
							'CLICKED',
							'HOW-TO-LINK',
						);
					}}
				>
					Why register & how does it help?
				</Link>

				<Link
					data-ignore="global-link-styling"
					href={`${guUrl}/info/2014/nov/03/why-your-data-matters-to-us-full-text`}
					onClick={async () => {
						trackLink(
							ophanComponentId,
							'why-link',
							renderingTarget,
							abTest,
						);
						await logTreatmentInteractionCall(
							'CLICKED',
							'WHY-LINK',
						);
					}}
				>
					How will my information & data be used?
				</Link>

				<Link
					data-ignore="global-link-styling"
					href={`${guUrl}/help/identity-faq`}
					onClick={async () => {
						trackLink(
							ophanComponentId,
							'help-link',
							renderingTarget,
							abTest,
						);
						await logTreatmentInteractionCall(
							'CLICKED',
							'HELP-LINK',
						);
					}}
				>
					Get help with registering or signing in
				</Link>
			</div>
		</div>
	);
};
