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
	SvgCheckmark,
	SvgCross,
} from '@guardian/source-react-components';
import { Hide } from '../../Hide';
import type { ReactComponent } from '../lib/ReactComponent';
import { ensureHasPreposition, ReminderStatus } from '../lib/reminders';
import { Lines } from './Lines';

// --- Styles --- //

const rootStyles = css`
	position: relative;

	background-color: ${palette.neutral[97]};

	* {
		box-sizing: border-box;
	}

	p {
		margin-top: 0;
		margin-bottom: 0;
	}
`;

const lineWrapperStyles = css`
	margin: ${space[3]}px auto;
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

const errorTextStyles = css`
	${textSans.small({ fontWeight: 'bold' })};
	color: ${palette.error[400]};
	font-style: italic;
	/* stylelint-disable-next-line declaration-no-important */
	margin-top: ${space[2]}px !important;
	margin-bottom: 0;
`;

const closeButtonContainerStyles = css`
	display: none;
	position: absolute;
	top: 20px;
	right: 0;

	${from.tablet} {
		display: block;
	}
`;

const bodyCopyStyles = css`
	${body.medium()}

	${from.tablet} {
		margin-right: ${space[9]}px;
	}
`;

const infoCopyStyles = css`
	${textSans.small()};
	font-style: italic;
	/* stylelint-disable-next-line declaration-no-important */
	margin-top: ${space[2]}px !important;
`;

const ctaContainerStyles = css`
	display: flex;
	flex-direction: row;
	align-items: center;
	margin-top: ${space[4]}px;

	& > * + * {
		margin-left: ${space[6]}px;
	}
`;

// --- Types --- //

export interface ContributionsEpicReminderSignedInProps {
	reminderLabel: string;
	reminderStatus: ReminderStatus;
	onSetReminderClick: () => void;
	onCloseReminderClick: () => void;
}

// --- Components --- //

export const ContributionsEpicReminderSignedIn: ReactComponent<
	ContributionsEpicReminderSignedInProps
> = ({
	reminderLabel,
	reminderStatus,
	onSetReminderClick,
	onCloseReminderClick,
}: ContributionsEpicReminderSignedInProps) => {
	const reminderDateWithPreposition = ensureHasPreposition(reminderLabel);

	return (
		<div css={rootStyles}>
			<div css={closeButtonContainerStyles}>
				<Button
					onClick={onCloseReminderClick}
					icon={<SvgCross />}
					priority="subdued"
					size="small"
					hideLabel={true}
				>
					Close
				</Button>
			</div>

			<div css={lineWrapperStyles}>
				<Lines />
			</div>

			{reminderStatus === ReminderStatus.Completed ? (
				<>
					<h4 css={remindHeading}>
						Thank you! Your reminder is set.
					</h4>
					<p css={successTextStyles}>
						We will be in touch to invite you to contribute. Look
						out for a message in your inbox{' '}
						{reminderDateWithPreposition}. If you have any questions
						about contributing, please{' '}
						<a
							href="mailto:contribution.support@theguardian.com"
							css={linkStyles}
						>
							contact us
						</a>
						.
					</p>
				</>
			) : (
				<>
					<p css={bodyCopyStyles}>
						Show your support for the Guardian at a later date. To
						make this easier, set a reminder and we’ll email you{' '}
						{reminderDateWithPreposition}.
					</p>

					<div css={ctaContainerStyles}>
						<div>
							<Hide when="above" breakpoint="tablet">
								<Button
									onClick={onSetReminderClick}
									disabled={
										reminderStatus ===
										ReminderStatus.Submitting
									}
								>
									Set a reminder
								</Button>
							</Hide>

							<Hide when="below" breakpoint="tablet">
								<Button
									onClick={onSetReminderClick}
									icon={<SvgCheckmark />}
									iconSide="left"
									disabled={
										reminderStatus ===
										ReminderStatus.Submitting
									}
								>
									Set a reminder
								</Button>
							</Hide>
						</div>

						<Button
							onClick={onCloseReminderClick}
							priority="subdued"
						>
							Not now
						</Button>
					</div>

					{reminderStatus === ReminderStatus.Error && (
						<p css={errorTextStyles}>
							Sorry we couldn&apos;t set a reminder for you this
							time. Please try again later.
						</p>
					)}

					<p css={infoCopyStyles}>
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
				</>
			)}
		</div>
	);
};
