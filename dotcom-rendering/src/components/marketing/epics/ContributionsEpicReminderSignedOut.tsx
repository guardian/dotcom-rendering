import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import {
	body,
	from,
	headline,
	palette,
	space,
	textSans,
} from '@guardian/source-foundations';
import {
	Button,
	SvgArrowRightStraight,
	SvgCross,
	TextInput,
} from '@guardian/source-react-components';
import { StraightLines } from '@guardian/source-react-components-development-kitchen';
import { useContributionsReminderEmailForm } from '../hooks/useContributionsReminderEmailForm';
import type { ReactComponent } from '../lib/ReactComponent';
import { ensureHasPreposition, ReminderStatus } from '../lib/reminders';

// --- Styles --- //

const rootStyles = css`
	position: relative;

	* {
		box-sizing: border-box;
	}
`;

const closeButtonStyles = css`
	width: 30px;
	height: 30px;
	cursor: pointer;
	position: absolute;
	top: 20px;
	right: 0;
	background: none;
	border: none;
	padding: 0;
`;

const lineWrapperStyles = css`
	margin: ${space[3]}px auto;
`;

const containerStyles = css`
	padding: 0 ${space[1]}px;
`;

const remindHeading = css`
	${headline.xxsmall({ fontWeight: 'bold' })};
	margin: 0 ${space[5]}px ${space[2]}px 0;
`;

const successTextStyles = css`
	margin: 0 auto ${space[2]}px;
	${body.medium()};
`;

const linkStyles = css`
	color: ${palette.neutral[7]};
`;

const formWrapper = css`
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: flex-start;

	${from.tablet} {
		flex-direction: row;
		align-items: flex-end;
		justify-content: flex-start;
	}
`;

const inputWrapper = css`
	width: 100%;
	margin-bottom: ${space[2]}px;
	flex-grow: 1;

	${from.tablet} {
		width: auto;
		margin-right: ${space[2]}px;
		margin-bottom: 0;
	}
`;

const formTextStyles = css`
	${textSans.small()};
	font-style: italic;
	margin-top: ${space[1]}px;
`;

const errorTextStyles = css`
	${textSans.small({ fontWeight: 'bold' })};
	color: ${palette.error[400]};
	font-style: italic;
	margin-top: ${space[1]}px;
	margin-bottom: 0;
`;

const getCustomSubmitStyles = (
	isDisabled: boolean,
): SerializedStyles | undefined => {
	if (isDisabled) {
		// Unfortunately these overrides need !important as otherwise they'll lose
		// the specificity war against the default Source styles.
		return css`
			pointer-events: none;
			/* stylelint-disable-next-line declaration-no-important */
			color: ${palette.neutral[60]} !important;
			/* stylelint-disable-next-line declaration-no-important */
			background-color: ${palette.neutral[93]} !important;
			/* stylelint-disable-next-line declaration-no-important */
			border: 1px solid ${palette.neutral[86]} !important;
		`;
	}

	return undefined;
};

// --- Types --- //

export interface ContributionsEpicReminderSignedOutProps {
	reminderLabel: string;
	reminderStatus: ReminderStatus;
	onSetReminderClick: (email: string) => void;
	onCloseReminderClick: () => void;
}

// --- Components --- //

export const ContributionsEpicReminderSignedOut: ReactComponent<
	ContributionsEpicReminderSignedOutProps
> = ({
	reminderLabel,
	reminderStatus,
	onSetReminderClick,
	onCloseReminderClick,
}: ContributionsEpicReminderSignedOutProps) => {
	const { email, updateEmail, inputError, handleSubmit } =
		useContributionsReminderEmailForm();

	const reminderDateWithPreposition = ensureHasPreposition(reminderLabel);

	return (
		<div css={rootStyles}>
			<button
				css={closeButtonStyles}
				onClick={(): void => onCloseReminderClick()}
			>
				<SvgCross />
			</button>

			<div css={lineWrapperStyles}>
				<StraightLines />
			</div>

			<div css={containerStyles}>
				<form onSubmit={handleSubmit(() => onSetReminderClick(email))}>
					{reminderStatus !== ReminderStatus.Completed && (
						<>
							<h4 css={remindHeading}>
								Remind me {reminderDateWithPreposition}
							</h4>
							<div css={formWrapper}>
								<div css={inputWrapper}>
									<TextInput
										label="Email address"
										error={inputError}
										value={email}
										onChange={updateEmail}
									/>
								</div>
								<Button
									iconSide="right"
									icon={<SvgArrowRightStraight />}
									type="submit"
									disabled={
										reminderStatus ===
										ReminderStatus.Submitting
									}
									css={getCustomSubmitStyles(
										reminderStatus ===
											ReminderStatus.Submitting,
									)}
								>
									Set a reminder
								</Button>
							</div>
						</>
					)}

					{reminderStatus === ReminderStatus.Error && (
						<p css={errorTextStyles}>
							Sorry we couldn&apos;t set a reminder for you this
							time. Please try again later.
						</p>
					)}
				</form>

				{reminderStatus !== ReminderStatus.Completed && (
					<p css={formTextStyles}>
						We will send you a maximum of two emails{' '}
						{reminderDateWithPreposition}. To find out what personal
						data we collect and how we use it, view our{' '}
						<a
							css={linkStyles}
							href="https://www.theguardian.com/help/privacy-policy"
							target="_blank"
							rel="noopener noreferrer"
						>
							Privacy Policy
						</a>
						.
					</p>
				)}

				{reminderStatus === ReminderStatus.Completed && (
					<>
						<h4 css={remindHeading}>
							Thank you! Your reminder is set.
						</h4>
						<p css={successTextStyles}>
							We will be in touch to invite you to contribute.
							Look out for a message in your inbox{' '}
							{reminderDateWithPreposition}. If you have any
							questions about contributing, please{' '}
							<a
								href="mailto:contribution.support@theguardian.com"
								css={linkStyles}
							>
								contact us
							</a>
							.
						</p>
					</>
				)}
			</div>
		</div>
	);
};
