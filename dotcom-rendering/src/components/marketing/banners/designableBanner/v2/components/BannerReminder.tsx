import { css } from '@emotion/react';
import { space } from '@guardian/source/foundations';
import { SecondaryCtaType } from '@guardian/support-dotcom-components';
import { useContributionsReminderSignup } from '../../../../hooks/useContributionsReminderSignup';
import { DesignableBannerReminderSignedOut } from '../../components/DesignableBannerReminderSignedOut';
import type { BannerData } from '../BannerProps';

const styles = {
	container: css`
		grid-row: 4;
		grid-column: 1 / span 2;
		order: 5;
		margin-top: ${space[3]}px;
	`,
};

export const BannerReminder = ({
	bannerData,
}: {
	bannerData: BannerData;
}): JSX.Element | null => {
	const mainOrMobileContent = bannerData.isTabletOrAbove
		? bannerData.content.mainContent
		: bannerData.content.mobileContent;

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
		bannerData.reminderTracking.onReminderSetClick();
		createReminder(email);
	};

	return (
		<div css={styles.container}>
			<DesignableBannerReminderSignedOut
				reminderCta={secondaryCta}
				reminderStatus={reminderStatus}
				onReminderSetClick={onReminderSetClick}
				setReminderCtaSettings={
					bannerData.settings.secondaryCtaSettings
				}
			/>
		</div>
	);
};
