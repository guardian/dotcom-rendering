/* eslint-disable jsx-a11y/anchor-is-valid -- It’s AMP! */
import { css } from '@emotion/react';
import {
	body,
	border,
	brandBackground,
	headline,
	palette,
	textSans,
} from '@guardian/source-foundations';
import {
	MoustacheSection,
	MoustacheTemplate,
	moustacheVariable,
	MoustacheVariable,
} from './Moustache.amp';

export const epicChoiceCardCss = `
	.epicChoiceCard {
		color: ${palette.neutral[46]};
		cursor: pointer;
		border-radius: 4px;
		box-shadow: inset 0 0 0 2px ${border.primary};
		box-sizing: border-box;
		min-height: 44px;
		margin: 0 0 8px 0;
		border: none;
		outline: none;
		background-color: transparent;
		font-weight: 700;
		font-size: 1.0625rem;
		font-family: GuardianTextSans, Guardian Text Sans Web, Helvetica Neue,
			Helvetica, Arial, Lucida Grande, sans-serif;
		text-align: center;
	}
	.epicChoiceCard:hover {
		box-shadow: inset 0 0 0 4px ${palette.brand[500]};
		color: ${palette.brand[400]};
	}
	.epicChoiceCardSelected {
		box-shadow: inset 0 0 0 4px ${palette.brand[500]};
		background-color: #e3f6ff;
		color: ${palette.brand[400]};
	}
`;

const choiceCardGroupColumn = css`
	display: flex;
	width: 100%;
	flex-direction: column;
	box-sizing: border-box;
`;
const choiceCardGroupRow = css`
	display: grid;
	justify-content: space-between;
	width: 100%;
	column-gap: 8px;
	row-gap: 8px;
	box-sizing: border-box;
	grid-template-columns: repeat(3, 1fr);
`;
const choiceCardContainer = css`
	position: relative;
	margin-top: 8px;
`;
const epicStyle = css`
	border-top: 0.0625rem solid ${palette.brandAlt[400]};
	background-color: ${palette.neutral[97]};
	clear: left;
	margin-top: 1.5rem;
	margin-bottom: 1rem;
	padding: 0.25rem 0.3125rem 1rem;
`;
const epicHeaderStyle = css`
	font-size: 1.25rem;
	line-height: 1.4375rem;
	${headline.xxsmall()};
	text-rendering: optimizeLegibility;
	font-kerning: normal;
	font-variant-ligatures: common-ligatures;
	font-weight: 700;
	margin-bottom: 0.75rem;
	-webkit-font-smoothing: antialiased;
`;
const epicParagraphStyle = css`
	font-size: 1.1rem;
	display: block;
	margin-block-start: 0.5rem;
	margin-block-end: 0.5rem;
	${body.medium()};
	text-rendering: optimizeLegibility;
	font-kerning: normal;
	font-variant-ligatures: common-ligatures;
	-webkit-font-smoothing: antialiased;
	vertical-align: 0%;
	line-height: 1.5;
	&::selection {
		background-color: ${palette.brandAlt[400]};
	}
	&:last-of-type {
		display: inline;
	}
`;
const highlightedTextStyle = css`
	font-size: 1.1rem;
	background-color: ${palette.brandAlt[400]};
	padding: 0.125rem;
	margin-left: 5px;
	color: ${palette.neutral[7]};
	${headline.xxxsmall({ fontWeight: 'bold' })};
	text-rendering: optimizeLegibility;
	font-kerning: normal;
	font-variant-ligatures: common-ligatures;
	-webkit-font-smoothing: antialiased;
	vertical-align: 0%;
	line-height: 1.5;
	display: inline;
`;
const genericButtonStyle = css`
	outline: none;
	display: inline-flex;
	justify-content: space-between;
	align-items: center;
	${textSans.medium()};
	text-rendering: optimizeLegibility;
	font-kerning: normal;
	font-variant-ligatures: common-ligatures;
	-webkit-font-smoothing: antialiased;
	text-decoration: none;
	font-weight: 700;
	font-size: 1.1rem;
	height: 44px;
	min-height: 44px;
	padding: 0 20px 2px;
	border-radius: 1.3125rem;
	box-sizing: border-box;
	cursor: pointer;
	vertical-align: base;
	line-height: 1.5;
	transition: background-color 0.3s;
	text-align: centre;
`;
const transparentButtonStyle = css`
	${genericButtonStyle}
	margin: 4px;
	background-color: transparent;
	color: ${palette.neutral[7]};
	border: 1px solid ${palette.neutral[7]};
	&:hover {
		background-color: ${palette.neutral[86]};
	}
`;
const yellowButtonStyle = css`
	${genericButtonStyle}
	margin: 4px;
	background-color: ${palette.brandAlt[400]};
	color: ${palette.neutral[7]};
	border: 1px solid ${palette.brandAlt[400]};
	&:hover {
		background-color: ${palette.brandAlt[300]};
	}
`;
const blueButtonStyle = css`
	${genericButtonStyle}
	background-color: ${palette.brand[400]};
	color: ${palette.neutral[100]};
	border: 1px solid ${palette.brand[400]};
	margin-bottom: 6px;
	&:hover {
		background-color: ${brandBackground.ctaSecondaryHover};
	}
`;
const genericArrowStyle = css`
	margin-left: 0.5rem;
	position: relative;
	width: 1.3125rem;
	height: auto;
	display: inline;
	vertical-align: sub;
`;
const darkArrowStyle = css`
	${genericArrowStyle}
	fill: ${palette.neutral[7]};
`;
const lightArrowStyle = css`
	${genericArrowStyle}
	fill: ${palette.neutral[100]};
`;
const quadLineStyle = css`
	background-image: repeating-linear-gradient(
		to bottom,
		${palette.neutral[86]},
		${palette.neutral[86]} 1px,
		transparent 1px,
		transparent 4px
	);
	background-repeat: repeat-x;
	background-position: top;
	background-size: 1px 13px;
	padding-top: 18px;
	margin-top: 12px;
`;
const acceptedPaymentMethodsWrapperStyle = css`
	margin-top: 0.5rem;
	margin-left: 0.5rem;
	display: block;
`;
const tickerWrapperStyle = css`
	margin-bottom: 20px;
`;
const leftStyle = css`
	text-align: left;
	display: flex;
	flex-wrap: nowrap;
	flex-direction: column;
	justify-content: flex-end;
`;
const rightStyle = css`
	text-align: right;
	display: flex;
	flex-wrap: nowrap;
	flex-direction: column;
	justify-content: flex-end;
`;
const tickerInfoStyle = css`
	display: flex;
	flex-wrap: nowrap;
	flex-direction: row;
	justify-content: space-between;
`;
const tickerProgressStyle = css`
	position: absolute;
	margin: 0;
	padding: 0;
	left: 0;
	background-color: ${palette.error[400]};
	height: 100%;
	width: 100%;
	transform-origin: left;
`;
/* stylelint-disable */
const tickerBackgroundStyle = css`
	overflow: hidden;
	position: relative;
	margin: 5px 0;
	height: 10px;
	width: 100%;
	background-color: #dda7a1;
	border: none;
`;
/* stylelint-enable */
const topLeftStyle = css`
	${textSans.small({ fontWeight: 'bold' })};
`;
const topRightStyle = css`
	${textSans.small({ fontWeight: 'bold' })};
`;
const labelStyle = css`
	${textSans.small()};
`;
const goalExceededMarkerStyle = css`
	width: 1px;
	height: 100%;
	border-left: 2px solid ${palette.neutral[7]};
	position: absolute;
	top: 0;
	z-index: 2;
`;
const buttonsStyle = css`
	display: flex;
	margin-top: 2rem;
	flex-wrap: wrap;
`;
const closeButtonStyle = css`
	border: 0;
	outline: 0;
	padding: 0;
	background: transparent;
	width: 30px;
	height: 30px;
	cursor: pointer;
`;
const reminderFormTopStyle = css`
	display: inline-flex;
	flex-direction: row;
	justify-content: space-between;
	width: 100%;
`;
const inputLabelStyle = css`
	color: ${palette.neutral[7]};
	${textSans.medium({ fontWeight: 'bold' })};
	margin-bottom: 4px;
`;
const invalidInputLabelStyle = css`
	${textSans.medium()};
	color: ${palette.error[400]};
	display: flex;
`;
const invalidInputSvgStyle = css`
	width: 30px;
	height: 30px;
	fill: ${palette.error[400]};
`;
const emailInputStyle = css`
	outline: none;
	width: 100%;
	border-radius: 0;
	border: 2px solid ${palette.neutral[60]};
	padding: 0 8px;
	line-height: 1.35;
	box-sizing: border-box;
	height: 44px;
	${textSans.medium()};
	color: ${palette.neutral[7]};
	margin-bottom: 10px;
`;
const reminderTermsStyle = css`
	${textSans.small({ fontStyle: 'italic' })};
	line-height: 1.5;

	a {
		text-decoration: underline;
		color: ${palette.neutral[7]};
	}
`;
const successMessageStyle = css`
	${body.medium()};

	a {
		text-decoration: underline;
		color: ${palette.neutral[7]};
	}
`;
const reminderErrorStyle = css`
	${textSans.small({ fontStyle: 'italic' })};
	color: ${palette.error[400]};
	font-weight: 600;
	margin-bottom: 10px;
`;
const reminderWrapperStyle = css`
	#reminderForm.user-invalid #email {
		border: 4px solid ${palette.error[400]};
	}
`;

type Props = {
	webURL: string;
};

export const Epic = ({ webURL }: Props) => {
	const supportDotcomComponentsUrl =
		process.env.GU_STAGE === 'PROD'
			? 'https://contributions.guardianapis.com'
			: process.env.SDC_URL ??
			  'https://contributions.code.dev-guardianapis.com';

	const setReminderUrl = `${supportDotcomComponentsUrl}/amp/set_reminder`;
	const epicUrl = `${supportDotcomComponentsUrl}/amp/epic?ampVariantAssignments=VARIANTS&webUrl=${webURL}`;

	return (
		<div>
			<amp-state id="epicState" src={epicUrl} />

			<amp-list
				layout="fixed-height"
				// This means that if the user refreshes at the end of the article while the epic is in view then the epic
				// will not display. This is such an edge case that we can live with it, and in general it will fill the
				// space.
				height="1px"
				src="amp-state:epicState"
				credentials="include"
				id="epic-container"
				single-item="true"
				items="."
			>
				<MoustacheTemplate>
					<div css={epicStyle}>
						<MoustacheSection name="ticker">
							<div css={tickerWrapperStyle}>
								<div css={tickerInfoStyle}>
									<div css={leftStyle}>
										<p css={topLeftStyle}>
											{moustacheVariable('topLeft')}
										</p>
										<p css={labelStyle}>
											{moustacheVariable('bottomLeft')}
										</p>
									</div>
									<div css={rightStyle}>
										<p css={topRightStyle}>
											{moustacheVariable('topRight')}
										</p>
										<p css={labelStyle}>
											{moustacheVariable('bottomRight')}
										</p>
									</div>
								</div>

								<div>
									<div css={tickerBackgroundStyle}>
										<MoustacheSection name="goalExceededMarkerPercentage">
											<div
												id="goal-exceeded-marker"
												css={goalExceededMarkerStyle}
												style={{
													left: `${moustacheVariable(
														'goalExceededMarkerPercentage',
													)}%`,
												}}
											/>
										</MoustacheSection>

										<div
											id="ticker-progress"
											css={tickerProgressStyle}
											style={{
												width: `${moustacheVariable(
													'percentage',
												)}%`,
											}}
										/>
									</div>
								</div>
							</div>
						</MoustacheSection>
						<h2 css={epicHeaderStyle}>
							<MoustacheVariable name="heading" />
						</h2>
						<MoustacheSection name="paragraphs">
							<p css={epicParagraphStyle}>
								<MoustacheVariable name="." />
							</p>
						</MoustacheSection>
						<span css={highlightedTextStyle}>
							<MoustacheVariable name="highlightedText" />
						</span>
						<br />

						<MoustacheSection name="choiceCards">
							<div css={choiceCardContainer}>
								<br />
								<div css={choiceCardGroupRow}>
									<button
										data-amp-bind-class="epicState.choiceCards.choiceCardSelection.frequency == 'ONE_OFF' ? epicState.choiceCards.classNames.choiceCardSelected : epicState.choiceCards.classNames.choiceCard"
										on="tap:AMP.setState({ epicState: { choiceCards: { choiceCardSelection: { frequency: 'ONE_OFF', amount: epicState.choiceCards.amounts['ONE_OFF'][1] } } } })"
									>
										<span>One-time</span>
									</button>
									<button
										data-amp-bind-class="epicState.choiceCards.choiceCardSelection.frequency == 'MONTHLY' ? epicState.choiceCards.classNames.choiceCardSelected : epicState.choiceCards.classNames.choiceCard"
										on="tap:AMP.setState({ epicState: { choiceCards: { choiceCardSelection: { frequency: 'MONTHLY', amount: epicState.choiceCards.amounts['MONTHLY'][1] } } } })"
									>
										<span>Monthly</span>
									</button>
									<button
										data-amp-bind-class="epicState.choiceCards.choiceCardSelection.frequency == 'ANNUAL' ? epicState.choiceCards.classNames.choiceCardSelected : epicState.choiceCards.classNames.choiceCard"
										on="tap:AMP.setState({ epicState: { choiceCards: { choiceCardSelection: { frequency: 'ANNUAL', amount: epicState.choiceCards.amounts['ANNUAL'][1] } } } })"
									>
										<span>Annual</span>
									</button>
								</div>
								<br />
								<div css={choiceCardGroupColumn}>
									<button
										data-amp-bind-class="epicState.choiceCards.choiceCardSelection.amount == epicState.choiceCards.amounts[epicState.choiceCards.choiceCardSelection.frequency][0] ? epicState.choiceCards.classNames.choiceCardSelected : epicState.choiceCards.classNames.choiceCard"
										on="tap:AMP.setState({ epicState: { choiceCards: { choiceCardSelection: { amount: epicState.choiceCards.amounts[epicState.choiceCards.choiceCardSelection.frequency][0] } } } })"
									>
										<span data-amp-bind-text="epicState.choiceCards.currencySymbol + epicState.choiceCards.amounts[epicState.choiceCards.choiceCardSelection.frequency][0] + epicState.choiceCards.choiceCardLabelSuffix[epicState.choiceCards.choiceCardSelection.frequency]" />
									</button>
									<button
										data-amp-bind-class="epicState.choiceCards.choiceCardSelection.amount == epicState.choiceCards.amounts[epicState.choiceCards.choiceCardSelection.frequency][1] ? epicState.choiceCards.classNames.choiceCardSelected : epicState.choiceCards.classNames.choiceCard"
										on="tap:AMP.setState({ epicState: { choiceCards: { choiceCardSelection: { amount: epicState.choiceCards.amounts[epicState.choiceCards.choiceCardSelection.frequency][1] } } } })"
									>
										<span data-amp-bind-text="epicState.choiceCards.currencySymbol + epicState.choiceCards.amounts[epicState.choiceCards.choiceCardSelection.frequency][1] + epicState.choiceCards.choiceCardLabelSuffix[epicState.choiceCards.choiceCardSelection.frequency]" />
									</button>
									<button
										data-amp-bind-class="epicState.choiceCards.choiceCardSelection.amount == 'other' ? epicState.choiceCards.classNames.choiceCardSelected : epicState.choiceCards.classNames.choiceCard"
										on="tap:AMP.setState({ epicState: { choiceCards: { choiceCardSelection: { amount: 'other' } } } })"
									>
										<span>Other</span>
									</button>
								</div>
							</div>
						</MoustacheSection>

						<div
							css="buttonsWrapper"
							data-amp-bind-hidden="epicState.reminder.hideButtons"
						>
							<div css={buttonsStyle}>
								<div>
									<MoustacheSection name="cta">
										{}
										<a
											id="primaryCta"
											data-amp-bind-href="epicState.choiceCards ? epicState.ctaUrl + '&selected-contribution-type=' + epicState.choiceCards.choiceCardSelection.frequency + '&selected-amount=' + epicState.choiceCards.choiceCardSelection.amount : epicState.ctaUrl"
											target="_blank"
											css={yellowButtonStyle}
										>
											<MoustacheVariable name="text" />
											<svg
												css={darkArrowStyle}
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 20 17.89"
												preserveAspectRatio="xMinYMid"
												aria-hidden="true"
												focusable="false"
											>
												<path d="M20 9.35l-9.08 8.54-.86-.81 6.54-7.31H0V8.12h16.6L10.06.81l.86-.81L20 8.51v.84z" />
											</svg>
										</a>
									</MoustacheSection>
								</div>
								<div data-amp-bind-hidden="epicState.reminder.hideReminderCta">
									<button
										css={transparentButtonStyle}
										on="tap:AMP.setState({epicState:{reminder:{hideReminderWrapper: false, hideButtons: true}}}),epic-container.changeToLayoutContainer()"
									>
										<span data-amp-bind-text="epicState.reminder.reminderCta" />
									</button>
								</div>
							</div>
							<div css={acceptedPaymentMethodsWrapperStyle}>
								<amp-img
									layout="fixed"
									height="25px"
									width="176px"
									src="https://assets.guim.co.uk/images/acquisitions/2db3a266287f452355b68d4240df8087/payment-methods.png"
									alt="Accepted payment methods: Visa, Mastercard, American Express and PayPal"
								/>
							</div>
						</div>

						<div
							css={reminderWrapperStyle}
							data-amp-bind-hidden="epicState.reminder.hideReminderWrapper"
						>
							<div css={quadLineStyle} />
							<div css={reminderFormTopStyle}>
								<div
									css={epicHeaderStyle}
									data-amp-bind-text="'Remind me in ' + epicState.reminder.reminderLabel"
								/>
								<button
									css={closeButtonStyle}
									on="tap:AMP.setState({epicState:{reminder:{hideReminderWrapper: true, hideButtons: false}}}),reminderForm.clear"
								>
									<svg
										viewBox="0 0 30 30"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											fillRule="evenodd"
											clipRule="evenodd"
											d="M15.325 17.025l7.225 6.625 1.075-1.075-6.6-7.25 6.6-7.25L22.55 7l-7.225 6.625-7.25-6.6L7 8.1l6.625 7.225L7 22.55l1.075 1.075 7.25-6.6z"
										/>
									</svg>
								</button>
							</div>
							<form
								id="reminderForm"
								data-amp-bind-hidden="epicState.reminder.hideReminderForm"
								method="post"
								action-xhr={setReminderUrl}
								target="_blank"
								custom-validation-reporting="interact-and-submit"
								encType="application/x-www-form-urlencoded"
								on="submit-success:AMP.setState({epicState:{reminder:{hideReminderCta: true, hideSuccessMessage: false, hideReminderForm: true, headerText: 'Thank you! Your reminder is set.'}}});submit-error:AMP.setState({epicState:{reminder:{hideFailureMessage:false}}})"
							>
								<div css={inputLabelStyle}>Email address</div>
								<div
									visible-when-invalid="typeMismatch"
									css={invalidInputLabelStyle}
									validation-for="email"
								>
									<svg
										css={invalidInputSvgStyle}
										viewBox="0 0 30 30"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											fillRule="evenodd"
											clipRule="evenodd"
											d="M14.41 5L4 22.057l.668.943h20.664l.668-.943L15.59 5h-1.18zm-.063 12.178h1.306l.621-6.917-.856-.728h-.835l-.857.728.62 6.917zM15 18.452c.7 0 1.274.573 1.274 1.274 0 .7-.573 1.274-1.274 1.274-.7 0-1.274-.573-1.274-1.274 0-.7.573-1.274 1.274-1.274z"
										/>
									</svg>
									Please enter a valid email address
								</div>
								<div
									visible-when-invalid="valueMissing"
									css={invalidInputLabelStyle}
									validation-for="email"
								>
									<svg
										viewBox="0 0 30 30"
										xmlns="http://www.w3.org/2000/svg"
										css={invalidInputSvgStyle}
									>
										<path
											fillRule="evenodd"
											clipRule="evenodd"
											d="M14.41 5L4 22.057l.668.943h20.664l.668-.943L15.59 5h-1.18zm-.063 12.178h1.306l.621-6.917-.856-.728h-.835l-.857.728.62 6.917zM15 18.452c.7 0 1.274.573 1.274 1.274 0 .7-.573 1.274-1.274 1.274-.7 0-1.274-.573-1.274-1.274 0-.7.573-1.274 1.274-1.274z"
										/>
									</svg>
									Please enter your email address
								</div>
								<input
									type="hidden"
									name="isPreContribution"
									value="true"
								/>
								<input
									type="hidden"
									name="reminderDate"
									data-amp-bind-value="epicState.reminder.reminderPeriod"
								/>
								<input
									css={emailInputStyle}
									id="email"
									name="email"
									type="email"
									required={true}
								/>
								<button
									css={blueButtonStyle}
									on="tap:reminderForm.submit"
								>
									Set a reminder
									<svg
										css={lightArrowStyle}
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 17.89"
										preserveAspectRatio="xMinYMid"
										aria-hidden="true"
										focusable="false"
									>
										<path d="M20 9.35l-9.08 8.54-.86-.81 6.54-7.31H0V8.12h16.6L10.06.81l.86-.81L20 8.51v.84z" />
									</svg>
								</button>
								<div
									css={reminderErrorStyle}
									data-amp-bind-hidden="epicState.reminder.hideFailureMessage"
								>
									Sorry we couldn&apos;t set a reminder for
									you this time. Please try again later.
								</div>
								<div css={reminderTermsStyle}>
									We will send you a maximum of two emails in{' '}
									<span data-amp-bind-text="epicState.reminder.reminderLabel" />
									. To find out what personal data we collect
									and how we use it, view our{' '}
									{/* eslint-disable-next-line react/jsx-no-target-blank -- we’re linking to Guardian */}
									<a
										target="_blank"
										href="https://www.theguardian.com/help/privacy-policy"
									>
										Privacy Policy
									</a>
									.
								</div>
							</form>
							<div
								css={successMessageStyle}
								data-amp-bind-hidden="epicState.reminder.hideSuccessMessage"
							>
								We will be in touch to remind you to contribute.
								Look out for a message in your inbox in{' '}
								<span data-amp-bind-text="epicState.reminder.reminderLabel" />
								. If you have any questions about contributing,
								please{' '}
								<a
									target="_blank"
									rel="noreferrer"
									href="mailto:contribution.support@theguardian.com"
								>
									contact us
								</a>
								.
							</div>
						</div>
					</div>
				</MoustacheTemplate>
			</amp-list>
		</div>
	);
};
