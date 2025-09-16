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
	*/

	const title = treatmentContent.title;
	const subtitle = treatmentContent.subtitle;
	const body = treatmentContent.body;
	const firstCtaName = treatmentContent.first_cta_name;
	const firstCtaLink = treatmentContent.first_cta_link;
	const secondCtaName = treatmentContent.second_cta_name;

	const hasContent = (input: string): boolean => {
		return input !== '';
	};

	const isDismissible =
		userTreatment.treatmentType === 'DISMISSABLE_SIGN_IN_GATE';
	const dismissStatusLabel = isDismissible
		? 'dismissible'
		: 'non-dismissible';

	return (
		<div css={signInGateContainer} data-testid="sign-in-gate-main">
			<style>{hideElementsCss}</style>
			<div css={firstParagraphOverlay} />
			<h1 css={headingStyles}>{title}</h1>
			{hasContent(subtitle) && <p css={bodyBold}>{subtitle}</p>}
			{hasContent(body) && <p css={bodyText}>{body}</p>}
			<div css={actionButtons}>
				<LinkButton
					data-testid="sign-in-gate-main_register"
					data-ignore="global-link-styling"
					cssOverrides={registerButton}
					priority="primary"
					size="small"
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
				>
					{firstCtaName}
				</LinkButton>
				{isDismissible && (
					<Button
						data-testid="sign-in-gate-main_dismiss"
						data-ignore="global-link-styling"
						cssOverrides={laterButton}
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
							void logTreatmentInteractionCall('DISMISSED', '');
						}}
					>
						{secondCtaName}
					</Button>
				)}
			</div>

			<p css={[bodySeparator, bodyBold, signInHeader]}>
				Have a subscription? Made a contribution? Already registered?
			</p>

			<Link
				data-testid="sign-in-gate-main_signin"
				data-ignore="global-link-styling"
				cssOverrides={signInLink}
				href={signInUrl}
				onClick={() => {
					trackLink(
						ophanComponentId,
						'sign-in-link',
						renderingTarget,
						abTest,
					);
					void logTreatmentInteractionCall('CLICKED', 'SIGN-IN-LINK');
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
						void logTreatmentInteractionCall(
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
					onClick={() => {
						trackLink(
							ophanComponentId,
							'why-link',
							renderingTarget,
							abTest,
						);
						void logTreatmentInteractionCall('CLICKED', 'WHY-LINK');
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
						void logTreatmentInteractionCall(
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
