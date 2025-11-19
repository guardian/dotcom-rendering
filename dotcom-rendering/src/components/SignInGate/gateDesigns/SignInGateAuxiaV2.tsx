import { css } from '@emotion/react';
import {
	from,
	headlineMedium20,
	headlineMedium28,
	headlineMedium34,
	headlineMedium42,
	palette,
	space,
	textSans14,
	textSans15,
	textSans17,
	textSansBold15,
} from '@guardian/source/foundations';
import { SvgCross, SvgGuardianLogo } from '@guardian/source/react-components';
import { useEffect } from 'react';
import { getZIndex } from '../../../lib/getZIndex';
import { has } from '../../../lib/has-string';
import { AuthProviderButtons } from '../../AuthProviderButtons/AuthProviderButtons';
import { useConfig } from '../../ConfigContext';
import { ExternalLink } from '../../ExternalLink/ExternalLink';
import { InformationBox } from '../../InformationBox/InformationBox';
import { GuardianTerms } from '../../Terms/Terms';
import { trackLink } from '../componentEventTracking';
import type { SignInGatePropsAuxia, TreatmentContentDecoded } from '../types';

const DividerWithOr = () => {
	return (
		<div css={dividerContainer}>
			<hr css={line} />
			<span css={orText}>or continue with</span>
			<hr css={line} />
		</div>
	);
};

export const SignInGateAuxiaV2 = ({
	dismissGate,
	queryParams,
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
	} = JSON.parse(userTreatment.treatmentContent) as TreatmentContentDecoded;

	const isDismissible = userTreatment.treatmentType.startsWith(
		'DISMISSABLE_SIGN_IN_GATE',
	);
	const dismissStatusLabel = isDismissible
		? 'dismissible'
		: 'non-dismissible';

	// Prevent body scroll when modal is open
	useEffect(() => {
		document.body.style.overflow = 'hidden';

		return () => {
			document.body.style.overflow = '';
		};
	}, []);

	// Handle ESC key to close modal
	useEffect(() => {
		const handleEscape = (event: KeyboardEvent) => {
			if (event.key === 'Escape' && isDismissible) {
				dismissGate();
				trackLink(
					ophanComponentId,
					'escape-key-dismiss',
					renderingTarget,
					abTest,
				);
				void logTreatmentInteractionCall('DISMISSED');
			}
		};

		document.addEventListener('keydown', handleEscape);
		return () => document.removeEventListener('keydown', handleEscape);
	}, [
		isDismissible,
		dismissGate,
		ophanComponentId,
		renderingTarget,
		abTest,
		logTreatmentInteractionCall,
	]);

	const handleBackdropClick = (
		event: React.MouseEvent | React.KeyboardEvent,
	) => {
		const isValid =
			((event.type === 'keyup' &&
				(event as React.KeyboardEvent).key === 'Escape') ||
				event.target === event.currentTarget) &&
			isDismissible;

		if (!isValid) {
			return;
		}

		dismissGate();
		trackLink(
			ophanComponentId,
			'backdrop-dismiss',
			renderingTarget,
			abTest,
		);
		void logTreatmentInteractionCall('DISMISSED');
	};

	return (
		// eslint-disable-next-line jsx-a11y/no-static-element-interactions -- div needs click and keyup handlers for modal backdrop dismiss functionality
		<div
			css={modalOverlay}
			className={dismissStatusLabel}
			onClick={handleBackdropClick}
			onKeyUp={handleBackdropClick}
			data-testid="sign-in-gate-modal-overlay"
		>
			<div css={modalContainer} data-testid="sign-in-gate-main">
				<div css={topContainer}>
					<div css={topBar}>
						<SvgGuardianLogo
							textColor={
								isDismissible
									? palette.brand[300]
									: palette.neutral[100]
							}
							width={96}
						/>

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
									void logTreatmentInteractionCall(
										'DISMISSED',
									);
								}}
							>
								<SvgCross size="xsmall" />
							</button>
						)}
					</div>

					<div css={headerSection}>
						<div css={headerCopy}>
							<h2 css={subHeadingStyles}>{title}</h2>
							{has(subtitle) && (
								<p css={descriptionText}>{subtitle}</p>
							)}
							{has(body) && <p css={descriptionText}>{body}</p>}
						</div>

						<img
							css={headerImage}
							src="https://media.guim.co.uk/04283a980cd4559eba0501ab25e41ff2f0bd8e20/33_1_277_284/277.png"
							alt="The Guardian logo"
						/>
					</div>
				</div>
				<div css={contentContainer}>
					<div css={actionsSection}>
						<div css={signInTopBar}>
							<h2 css={subHeadingStyles}>Sign in</h2>

							{isDismissible && (
								<button
									type="button"
									data-testid="sign-in-gate-main_dismiss"
									data-ignore="global-link-styling"
									css={signInDismissButtonStyles}
									onClick={() => {
										dismissGate();
										trackLink(
											ophanComponentId,
											'not-now',
											renderingTarget,
											abTest,
										);
										void logTreatmentInteractionCall(
											'DISMISSED',
										);
									}}
								>
									<SvgCross size="xsmall" />
								</button>
							)}
						</div>
						<div css={emailContainer}>
							<AuthProviderButtons
								queryParams={queryParams}
								providers={['email']}
								onClick={(provider) => {
									trackLink(
										ophanComponentId,
										`sign-in-${provider}-${dismissStatusLabel}`,
										renderingTarget,
										abTest,
										[userTreatment.treatmentType],
									);
									void logTreatmentInteractionCall(
										'CLICKED',
										'SIGN-IN-LINK',
									);
								}}
								signInGateVersion="v2"
							/>
						</div>

						<DividerWithOr />

						<div css={socialContainer}>
							<AuthProviderButtons
								queryParams={queryParams}
								providers={['social']}
								onClick={(provider) => {
									trackLink(
										ophanComponentId,
										`sign-in-${provider}-${dismissStatusLabel}`,
										renderingTarget,
										abTest,
										[userTreatment.treatmentType],
									);
									void logTreatmentInteractionCall(
										'CLICKED',
										'SIGN-IN-LINK',
									);
								}}
								signInGateVersion="v2"
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
				</div>
			</div>
		</div>
	);
};

// --- Modal Styling ---
const modalOverlay = css`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: rgba(0, 0, 0, 0.6);
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: ${getZIndex('sign-in-gate')};
	padding: ${space[4]}px;
`;

const modalContainer = css`
	background: white;
	border-radius: ${space[4]}px;
	display: flex;
	flex-direction: column;
	gap: ${space[4]}px;
	max-width: 900px;
	width: 100%;
	max-height: 90vh;
	overflow-y: auto;
	padding: ${space[3]}px;
	position: relative;
	box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);

	${from.phablet} {
		gap: ${space[2]}px;
		max-width: 460px;
		padding: 0;
	}

	${from.desktop} {
		flex-direction: row;
		gap: 0;
		height: 600px;
		max-width: 940px;
	}

	.non-dismissible & {
		gap: 0;
		padding: 0;
	}
`;

// --- New Layout Containers ---
const topContainer = css`
	display: flex;
	flex-direction: column;

	${from.phablet} {
		border-bottom: 0.5px solid ${palette.brand[400]};
		padding: ${space[4]}px ${space[4]}px 0 ${space[4]}px;
	}

	${from.desktop} {
		border-bottom: 0;
		border-right: 0.5px solid ${palette.brand[400]};
		flex-direction: column-reverse;
		justify-content: space-between;
		padding: ${space[6]}px ${space[4]}px ${space[4]}px ${space[8]}px;
		width: 470px;
	}

	.non-dismissible & {
		background: ${palette.brand[400]};
		padding: ${space[3]}px;

		${from.phablet} {
			border: 0;
			padding: ${space[4]}px;
		}

		${from.desktop} {
			border: 0;
			padding: ${space[6]}px ${space[4]}px ${space[4]}px ${space[8]}px;
			width: 470px;
		}
	}
`;

const contentContainer = css`
	display: flex;
	flex-direction: column;
	gap: ${space[5]}px;

	${from.phablet} {
		padding: ${space[4]}px;
	}

	${from.desktop} {
		flex-direction: row;
		gap: ${space[6]}px;
		padding: ${space[6]}px ${space[10]}px;
		width: 470px;
	}

	.non-dismissible & {
		padding: ${space[3]}px;

		${from.phablet} {
			padding: ${space[4]}px;
		}

		${from.desktop} {
			padding: ${space[6]}px ${space[10]}px;
			width: 470px;
		}
	}
`;

const headerSection = css`
	display: flex;
	flex-direction: row;

	${from.desktop} {
		flex-direction: column-reverse;
		gap: ${space[6]}px;
		padding-right: ${space[4]}px;
		max-height: 528px;
		max-width: 100%;
	}
`;

const headerCopy = css`
	display: flex;
	flex-direction: column;
	flex-grow: 1;
	gap: ${space[4]}px;
	${from.desktop} {
		gap: ${space[5]}px;
	}
`;

const headerImage = css`
	display: none;

	${from.phablet} {
		align-self: flex-end;
		display: block;
		max-width: 158px;
		width: 100%;
	}

	${from.desktop} {
		align-self: center;
		flex: 1 1 auto;
		min-height: 0;
		max-width: 276px;
		width: 100%;
		height: 100%;
		object-fit: contain;
	}

	.non-dismissible & {
		display: none;
	}
`;

const actionsSection = css`
	flex: 1;
`;

// --- Existing Styling ---
const topBar = css`
	display: flex;
	flex-direction: row-reverse;
	justify-content: space-between;
	padding: 0 0 ${space[6]}px;

	${from.desktop} {
		padding: 0;
	}
`;

const signInTopBar = css`
	display: none;

	${from.desktop} {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding: 0 0 ${space[4]}px;

		h2 {
			${headlineMedium34};
		}
	}

	.non-dismissible & {
		${from.desktop} {
			h2 {
				${headlineMedium34};
				color: ${palette.brand[400]};
			}
		}
	}
`;

const dismissButtonStyles = css`
	background: transparent;
	border: none;
	cursor: pointer;
	padding: 0;

	${from.desktop} {
		display: none;
	}
`;

const signInDismissButtonStyles = css`
	display: none;

	${from.desktop} {
		display: inline-flex;
		background: transparent;
		border: none;
		cursor: pointer;
		padding: 0;
	}
`;

const subHeadingStyles = css`
	${headlineMedium28};
	color: ${palette.brand[400]};
	white-space: pre-line;
	margin-top: 0; /* Remove default margin for better spacing */

	${from.phablet} {
		${headlineMedium34};
		padding: ${space[2]}px 0 ${space[5]}px;
	}

	${from.desktop} {
		${headlineMedium42};
		padding: 0;
	}

	.non-dismissible & {
		${headlineMedium20};
		color: ${palette.neutral[100]};

		${from.phablet} {
			${headlineMedium28};
			padding: ${space[1]}px 0 0;
		}

		${from.desktop} {
			${headlineMedium42};
			padding: 0;
		}
	}
`;

const descriptionText = css`
	${textSans14};
	white-space: pre-line;

	${from.phablet} {
		${textSans15};
		padding-bottom: ${space[4]}px;
	}

	${from.desktop} {
		${textSans17};
	}

	.non-dismissible & {
		color: ${palette.neutral[100]};

		${from.phablet} {
			padding: 0;
		}
	}
`;

const socialContainer = css`
	padding-bottom: ${space[3]}px;

	${from.desktop} {
		padding-bottom: ${space[5]}px;
	}
`;

const emailContainer = css`
	padding-bottom: ${space[4]}px;

	${from.phablet} {
		padding-bottom: ${space[3]}px;
	}

	${from.desktop} {
		padding-bottom: ${space[4]}px;
	}
`;

const termsBox = css`
	padding-bottom: ${space[3]}px;

	${from.phablet} {
		margin-bottom: ${space[3]}px;
		padding-bottom: ${space[4]}px;
		border-bottom: 1px solid ${palette.neutral[86]};
	}
`;

const createAccountText = css`
	${textSans15};
	color: ${palette.neutral[10]};
	margin-bottom: 0;

	a {
		${textSansBold15};
	}
`;

const dividerContainer = css`
	display: flex;
	align-items: center;
	justify-content: center;
	padding-bottom: ${space[4]}px;
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
