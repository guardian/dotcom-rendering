import React from 'react';
import { css } from '@emotion/react';

import {
	MoustacheSection,
	MoustacheVariable,
	MoustacheTemplate,
	moustacheVariable,
} from '@root/src/amp/components/moustache';
import { headline, body, textSans } from '@guardian/src-foundations/typography';
import {
	brand,
	brandAlt,
	neutral,
	error,
	brandBackground,
} from '@guardian/src-foundations/palette';
import { JsonScript } from '@root/src/amp/components/JsonScript';

const epicStyle = css`
	border-top: 0.0625rem solid ${brandAlt[400]};
	background-color: ${neutral[97]};
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
		background-color: ${brandAlt[400]};
	}
	&:last-of-type {
		display: inline;
	}
`;
const highlightedTextStyle = css`
	font-size: 1.1rem;
	background-color: ${brandAlt[400]};
	padding: 0.125rem;
	margin-left: 5px;
	color: ${neutral[7]};
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
	color: ${neutral[7]};
	border: 1px solid ${neutral[7]};
	&:hover {
		background-color: ${neutral[86]};
	}
`;
const yellowButtonStyle = css`
	${genericButtonStyle}
	margin: 4px;
	background-color: ${brandAlt[400]};
	color: ${neutral[7]};
	border: 1px solid ${brandAlt[400]};
	&:hover {
		background-color: ${brandAlt[300]};
	}
`;
const blueButtonStyle = css`
	${genericButtonStyle}
	background-color: ${brand[400]};
	color: ${neutral[100]};
	border: 1px solid ${brand[400]};
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
	fill: ${neutral[7]};
`;
const lightArrowStyle = css`
	${genericArrowStyle}
	fill: ${neutral[100]};
`;
const quadLineStyle = css`
	background-image: repeating-linear-gradient(
		to bottom,
		${neutral[86]},
		${neutral[86]} 1px,
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
	background-color: ${brandAlt[400]};
	height: 100%;
	width: 100%;
	transform-origin: left;
`;
const tickerBackgroundStyle = css`
	overflow: hidden;
	position: relative;
	margin: 5px 0;
	height: 10px;
	width: 100%;
	background-color: ${neutral[86]};
	border: none;
`;
const topLeftStyle = css`
	${headline.xsmall({ fontWeight: 'bold' })}
`;
const topRightStyle = css`
	${headline.xxxsmall({ fontWeight: 'bold' })}
`;
const labelStyle = css`
	${body.small({ fontStyle: 'italic' })};
`;
const goalExceededMarkerStyle = css`
	width: 1px;
	height: 100%;
	border-left: 2px solid ${neutral[7]};
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
	color: ${neutral[7]};
	${textSans.medium({ fontWeight: 'bold' })};
	margin-bottom: 4px;
`;
const invalidInputLabelStyle = css`
	${textSans.medium()};
	color: ${error[400]};
	display: flex;
`;
const invalidInputSvgStyle = css`
	width: 30px;
	height: 30px;
	fill: ${error[400]};
`;
const emailInputStyle = css`
	outline: none;
	width: 100%;
	border-radius: 0;
	border: 2px solid ${neutral[60]};
	padding: 0 8px;
	line-height: 1.35;
	box-sizing: border-box;
	height: 44px;
	${textSans.medium()};
	color: ${neutral[7]};
	margin-bottom: 10px;
`;
const reminderTermsStyle = css`
	${textSans.small({ fontStyle: 'italic' })};
	line-height: 1.5;

	a {
		text-decoration: underline;
		color: ${neutral[7]};
	}
`;
const successMessageStyle = css`
	${body.medium()};

	a {
		text-decoration: underline;
		color: ${neutral[7]};
	}
`;
const reminderErrorStyle = css`
	${textSans.small({ fontStyle: 'italic' })};
	color: ${error[400]};
	font-weight: 600;
	margin-bottom: 10px;
`;
const reminderWrapperStyle = css`
	#reminderForm.user-invalid #email {
		border: 4px solid ${error[400]};
	}
`;

interface ABTest {
	name: string;
	variant: string;
}

const buildUrl = (
	contributionsUrl: string,
	articleUrl: string,
	campaignCode: string,
	componentId: string,
	abTest: ABTest,
): string => {
	const acquisitionData = {
		source: 'GOOGLE_AMP',
		componentType: 'ACQUISITIONS_EPIC',
		componentId,
		campaignCode,
		abTest,
		referrerUrl: articleUrl,
	};
	return `${contributionsUrl}?INTCMP=${campaignCode}&acquisitionData=${JSON.stringify(
		acquisitionData,
	)}`;
};

const getReminderDate = (date: Date = new Date()): Date => {
	const monthsAhead = date.getDate() < 20 ? 1 : 2;
	const reminderDate = new Date();
	reminderDate.setMonth(date.getMonth() + monthsAhead);

	return reminderDate;
};

export const Epic: React.FC<{ webURL: string }> = ({ webURL }) => {
	const reminderDate = getReminderDate();
	const reminderMonth = reminderDate.toLocaleString('default', {
		month: 'long',
	});
	const reminderYear = reminderDate.getFullYear();
	const reminderDateString = `${reminderDate.getFullYear()}-${(
		reminderDate.getMonth() + 1
	)
		.toString()
		.padStart(2, '0')}-01`;
	const epicStateJson = {
		hideButtons: false,
		hideReminderWrapper: true,
		hideSuccessMessage: true,
		hideFailureMessage: true,
		hideReminderCta: false,
		hideReminderForm: false,
		headerText: `Remind me in ${reminderMonth} ${reminderYear}`,
	};
	const supportDotcomComponentsUrl =
		process.env.GU_STAGE === 'PROD'
			? 'https://contributions.guardianapis.com'
			: 'https://contributions.code.dev-guardianapis.com';
	const setReminderUrl = `${supportDotcomComponentsUrl}/amp/set_reminder`;
	const epicUrl = `${supportDotcomComponentsUrl}/amp/epic?ampVariantAssignments=VARIANTS`;

	return (
		<div>
			<amp-state id="epicState">
				<JsonScript o={epicStateJson} />
			</amp-state>

			<amp-list
				layout="fixed-height"
				// This means that if the user refreshes at the end of the article while the epic is in view then the epic
				// will not display. This is such an edge case that we can live with it, and in general it will fill the
				// space.
				height="1px"
				src={epicUrl}
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
						<div
							css="buttonsWrapper"
							data-amp-bind-hidden="epicState.hideButtons"
						>
							<div css={buttonsStyle}>
								<div>
									<MoustacheSection name="cta">
										<a
											href={buildUrl(
												moustacheVariable('url'),
												webURL,
												moustacheVariable(
													'campaignCode',
												),
												moustacheVariable(
													'componentId',
												),
												{
													name: moustacheVariable(
														'testName',
													),
													variant: moustacheVariable(
														'variantName',
													),
												},
											)}
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
								<div data-amp-bind-hidden="epicState.hideReminderCta">
									<button
										css={transparentButtonStyle}
										on="tap:AMP.setState({epicState:{hideReminderWrapper: false, hideButtons: true}}),epic-container.changeToLayoutContainer()"
									>
										Remind me in {reminderMonth}
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
							data-amp-bind-hidden="epicState.hideReminderWrapper"
						>
							<div css={quadLineStyle} />
							<div css={reminderFormTopStyle}>
								<div
									css={epicHeaderStyle}
									data-amp-bind-text="epicState.headerText"
								/>
								<button
									css={closeButtonStyle}
									on="tap:AMP.setState({epicState:{hideReminderWrapper: true, hideButtons: false}}),reminderForm.clear"
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
								data-amp-bind-hidden="epicState.hideReminderForm"
								method="post"
								action-xhr={setReminderUrl}
								target="_blank"
								custom-validation-reporting="interact-and-submit"
								encType="application/x-www-form-urlencoded"
								on="submit-success:AMP.setState({epicState:{hideReminderCta: true, hideSuccessMessage: false, hideReminderForm: true, headerText: 'Thank you! Your reminder is set.'}});submit-error:AMP.setState({epicState:{hideFailureMessage:false}})"
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
									value={reminderDateString}
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
									data-amp-bind-hidden="epicState.hideFailureMessage"
								>
									Sorry we couldn&apos;t set a reminder for
									you this time. Please try again later.
								</div>
								<div css={reminderTermsStyle}>
									We will send you a maximum of two emails in{' '}
									{reminderMonth} {reminderYear}. To find out
									what personal data we collect and how we use
									it, view our{' '}
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
								data-amp-bind-hidden="epicState.hideSuccessMessage"
							>
								We will be in touch to remind you to contribute.
								Look out for a message in your inbox in{' '}
								{reminderMonth} {reminderYear}. If you have any
								questions about contributing, please{' '}
								<a
									target="_blank"
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
