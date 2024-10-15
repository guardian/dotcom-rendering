/**
 * @file
 * This file was migrated from:
 * https://github.com/guardian/support-dotcom-components/blob/0a2439b701586a7a2cc60dce10b4d96cf7a828db/packages/modules/src/modules/banners/designableBanner/components/DesignableBannerReminderSignedOut.tsx
 */
import { css } from '@emotion/react';
import {
	error,
	from,
	neutral,
	space,
	textSans15,
	textSansBold15,
	textSansBold17,
} from '@guardian/source/foundations';
import { Button, TextInput } from '@guardian/source/react-components';
import { useContributionsReminderEmailForm } from '../../../hooks/useContributionsReminderEmailForm';
import { ensureHasPreposition, ReminderStatus } from '../../../lib/reminders';
import type { BannerEnrichedReminderCta } from '../../common/types';
import type { CtaSettings } from '../settings';
import { buttonStyles } from '../styles/buttonStyles';

// ---- Thank you component ---- //

const dfltTextColor = neutral[0];

interface ThankYouProps {
	reminderLabelWithPreposition: string;
	thankyouColor?: string;
	contactUsColor?: string;
}

export function ThankYou({
	reminderLabelWithPreposition,
	thankyouColor,
	contactUsColor,
}: ThankYouProps): JSX.Element {
	return (
		<div>
			<header>
				<h3
					css={styles.thankYouHeaderCopy(
						thankyouColor ?? dfltTextColor,
					)}
				>
					Thank you! Your reminder is set
				</h3>
			</header>

			<div css={styles.thankYouBodyCopy(thankyouColor ?? dfltTextColor)}>
				We will be in touch to invite you to contribute. Look out for a
				message in your inbox {reminderLabelWithPreposition}. If you
				have any questions about contributing, please{' '}
				<a
					href="mailto:contribution.support@theguardian.com"
					css={styles.contactLink(contactUsColor ?? dfltTextColor)}
				>
					contact us
				</a>
			</div>
		</div>
	);
}

// ---- Info component ---- //

interface InfoCopyProps {
	reminderLabelWithPreposition: string;
	privacyLinkColor?: string;
}

export function InfoCopy({
	reminderLabelWithPreposition,
	privacyLinkColor,
}: InfoCopyProps): JSX.Element {
	return (
		<div css={styles.infoCopy}>
			We will send you a maximum of two emails{' '}
			{reminderLabelWithPreposition}. To find out what personal data we
			collect and how we use it, view our{' '}
			<a
				css={styles.privacyLink(privacyLinkColor ?? dfltTextColor)}
				href="https://www.theguardian.com/help/privacy-policy"
				target="_blank"
				rel="noopener noreferrer"
			>
				Privacy policy
			</a>
		</div>
	);
}

// ---- Error component ---- //

export function ErrorCopy(): JSX.Element {
	return (
		<div css={styles.errorCopy}>
			Sorry we couldn&apos;t set a reminder for you this time. Please try
			again later.
		</div>
	);
}

// ---- Component ---- //

export interface DesignableBannerReminderSignedOutProps {
	reminderCta: BannerEnrichedReminderCta;
	reminderStatus: ReminderStatus;
	onReminderSetClick: (email: string) => void;
	setReminderCtaSettings?: CtaSettings;
}

export function DesignableBannerReminderSignedOut({
	reminderCta,
	reminderStatus,
	onReminderSetClick,
	setReminderCtaSettings,
}: DesignableBannerReminderSignedOutProps): JSX.Element {
	const reminderLabelWithPreposition = ensureHasPreposition(
		reminderCta.reminderFields.reminderLabel,
	);

	return (
		<>
			{reminderStatus === ReminderStatus.Completed ? (
				<ThankYou
					reminderLabelWithPreposition={reminderLabelWithPreposition}
				/>
			) : (
				<Signup
					reminderLabelWithPreposition={reminderLabelWithPreposition}
					reminderStatus={reminderStatus}
					onSubmit={onReminderSetClick}
					setReminderCtaSettings={setReminderCtaSettings}
				/>
			)}
		</>
	);
}

// ---- Helper components ---- //

interface SignupProps {
	reminderLabelWithPreposition: string;
	reminderStatus: ReminderStatus;
	onSubmit: (email: string) => void;
	setReminderCtaSettings?: CtaSettings;
}

function Signup({
	reminderLabelWithPreposition,
	reminderStatus,
	onSubmit,
	setReminderCtaSettings,
}: SignupProps) {
	const { email, inputError, updateEmail, handleSubmit } =
		useContributionsReminderEmailForm();

	return (
		<>
			<header>
				<h3 css={styles.headerCopy}>
					Remind me to support {reminderLabelWithPreposition} please
				</h3>
			</header>

			<form
				css={styles.form}
				onSubmit={handleSubmit(() => onSubmit(email))}
			>
				<TextInput
					label="Email address"
					hideLabel={true}
					onChange={updateEmail}
					error={inputError}
					value={email}
					width={30}
					placeholder="Enter your email"
				/>

				<div css={styles.ctaContainer}>
					<Button
						type="submit"
						iconSide="right"
						priority="primary"
						disabled={reminderStatus === ReminderStatus.Submitting}
						cssOverrides={css`
							${styles.button}
							${setReminderCtaSettings &&
							buttonStyles(setReminderCtaSettings)}
						`}
					>
						Set reminder
					</Button>
				</div>

				{reminderStatus === ReminderStatus.Error && (
					<div css={styles.errorCopyContainer}>
						<ErrorCopy />
					</div>
				)}
			</form>

			<div css={styles.infoCopyContainer}>
				<InfoCopy
					reminderLabelWithPreposition={reminderLabelWithPreposition}
				/>
			</div>
		</>
	);
}

// ---- Styles ---- //

const styles = {
	headerCopy: css`
		${textSansBold17};
		margin: 0;
	`,
	form: css`
		margin-top: ${space[2]}px;

		display: flex;
		flex-direction: column;

		${from.tablet} {
			flex-direction: row;
			align-items: flex-end;
		}

		> input {
			min-width: 100%;

			${from.tablet} {
				min-width: auto;
			}
		}
	`,
	ctaContainer: css`
		margin-top: ${space[3]}px;

		${from.tablet} {
			margin-top: 0;
			margin-left: ${space[3]}px;
		}
	`,
	errorCopyContainer: css`
		margin-top: ${space[1]}px;
	`,
	infoCopyContainer: css`
		margin-top: ${space[3]}px;
	`,
	button: css`
		width: 100%;
		justify-content: center;

		${from.tablet} {
			width: auto;
		}
	`,
	errorCopy: css`
		${textSansBold15};
		color: ${error[400]};
		font-style: italic;
	`,
	infoCopy: css`
		${textSans15}
		font-size: 12px;
	`,
	privacyLink: (foreColor: string) => css`
		font-weight: bold;
		color: ${foreColor};
	`,
	thankYouHeaderCopy: (foreColor: string) => css`
		${textSansBold15}
		margin: 0;
		margin-bottom: ${space[3]}px;
		color: ${foreColor};
	`,
	thankYouBodyCopy: (foreColor: string) => css`
		${textSans15}
		color: ${foreColor};
	`,
	contactLink: (foreColor: string) => css`
		font-weight: bold;
		color: ${foreColor};
	`,
};
