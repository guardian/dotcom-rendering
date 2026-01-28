import { css } from '@emotion/react';
import { space } from '@guardian/source/foundations';
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
	const reminderFields = bannerData.selectors.reminderCta?.reminderFields;

	const { reminderStatus, createReminder } = useContributionsReminderSignup(
		reminderFields?.reminderPeriod ?? '',
		'WEB',
		'BANNER',
		'PRE',
		reminderFields?.reminderOption,
	);

	if (!bannerData.selectors.reminderCta) {
		return null;
	}

	const onReminderSetClick = (email: string) => {
		bannerData.reminderTracking.onReminderSetClick();
		createReminder(email);
	};

	return (
		<div css={styles.container}>
			<DesignableBannerReminderSignedOut
				reminderCta={bannerData.selectors.reminderCta}
				reminderStatus={reminderStatus}
				onReminderSetClick={onReminderSetClick}
				setReminderCtaSettings={
					bannerData.settings.secondaryCtaSettings
				}
			/>
		</div>
	);
};
