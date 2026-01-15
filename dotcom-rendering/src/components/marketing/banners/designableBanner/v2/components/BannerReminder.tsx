import { css } from '@emotion/react';
import { space } from '@guardian/source/foundations';
import { SecondaryCtaType } from '@guardian/support-dotcom-components';
import { useContributionsReminderSignup } from '../../../../hooks/useContributionsReminderSignup';
import { DesignableBannerReminderSignedOut } from '../../components/DesignableBannerReminderSignedOut';
import { useBanner } from '../useBanner';

const styles = {
	container: css`
		grid-row: 4;
		grid-column: 1 / span 2;
		order: 5;
		margin-top: ${space[3]}px;
	`,
};

export const BannerReminder = (): JSX.Element | null => {
	const { content, reminderTracking, settings, isTabletOrAbove } =
		useBanner();

	const mainOrMobileContent = isTabletOrAbove
		? content.mainContent
		: content.mobileContent;

	const { secondaryCta } = mainOrMobileContent;

	const reminderFields =
		secondaryCta?.type === SecondaryCtaType.ContributionsReminder
			? secondaryCta.reminderFields
			: undefined;

	const { reminderStatus, createReminder } = useContributionsReminderSignup(
		reminderFields?.reminderPeriod ?? '',
		'WEB',
		'BANNER',
		'PRE',
		reminderFields?.reminderOption,
	);

	if (secondaryCta?.type !== SecondaryCtaType.ContributionsReminder) {
		return null;
	}

	const onReminderSetClick = (email: string) => {
		reminderTracking.onReminderSetClick();
		createReminder(email);
	};

	return (
		<div css={styles.container}>
			<DesignableBannerReminderSignedOut
				reminderCta={secondaryCta}
				reminderStatus={reminderStatus}
				onReminderSetClick={onReminderSetClick}
				setReminderCtaSettings={settings.secondaryCtaSettings}
			/>
		</div>
	);
};
