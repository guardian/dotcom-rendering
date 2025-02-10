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
	isMandatory = false,
	userTreatment,
	logTreatmentInteractionCall,
}: SignInGatePropsAuxia) => {
	const { renderingTarget } = useConfig();

	const treatmentContent = JSON.parse(
		userTreatment.treatmentContent,
	) as TreatmentContentDecoded;

	/*
	The treatmentContent object is expected to have the following structure:
	{
		"title": "Sign in for a personlised experience",
		"subtitle": ""
		"body": "By signing into your Guardian account you'll provide us with insights into your preferences that will result in a more personalised experience, including less frequent asks to support. You'll always be able to control your preferences in your own privacy settings.",
		"first_cta_name": "Sign in",
		"first_cta_link": "https://profile.theguardian.com/signin?",
		"second_cta_name": "I'll do it later",
	}
	*/

	const title = treatmentContent.title;
	const body = treatmentContent.body;
	const firstCtaName = treatmentContent.first_cta_name;
	const firstCtaLink = treatmentContent.first_cta_link;
	const secondCtaName = treatmentContent.second_cta_name;
	const subtitle = treatmentContent.subtitle;

	return (
		<div css={signInGateContainer} data-testid="sign-in-gate-main">
			<style>{hideElementsCss}</style>
			<div css={firstParagraphOverlay} />
			<h1 css={headingStyles}>{title}</h1>
			<p css={bodyBold}>{subtitle}</p>
			<p css={bodyText}>{body}</p>
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
							'register-link',
							renderingTarget,
							abTest,
						);
						logTreatmentInteractionCall(
							'CLICKED',
							'REGISTER-LINK',
						).catch((error) => {
							console.error(
								'Failed to log treatment interaction:',
								error,
							);
						});
					}}
				>
					{firstCtaName}
				</LinkButton>
				{!isMandatory && (
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
							logTreatmentInteractionCall('DISMISSED', '').catch(
								(error) => {
									console.error(
										'Failed to log treatment interaction:',
										error,
									);
								},
							);
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
					logTreatmentInteractionCall(
						'CLICKED',
						'SIGN-IN-LINK',
					).catch((error) => {
						console.error(
							'Failed to log treatment interaction:',
							error,
						);
					});
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
						logTreatmentInteractionCall(
							'CLICKED',
							'HOW-TO-LINK',
						).catch((error) => {
							console.error(
								'Failed to log treatment interaction:',
								error,
							);
						});
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
						logTreatmentInteractionCall(
							'CLICKED',
							'WHY-LINK',
						).catch((error) => {
							console.error(
								'Failed to log treatment interaction:',
								error,
							);
						});
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
						logTreatmentInteractionCall(
							'CLICKED',
							'HELP-LINK',
						).catch((error) => {
							console.error(
								'Failed to log treatment interaction:',
								error,
							);
						});
					}}
				>
					Get help with registering or signing in
				</Link>
			</div>
		</div>
	);
};
