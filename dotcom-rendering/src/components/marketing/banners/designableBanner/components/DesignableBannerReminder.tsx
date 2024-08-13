import React from 'react';
import { BannerEnrichedReminderCta } from '../../common/types';
import { CtaSettings } from '../settings';
import { DesignableBannerReminderSignedOut } from './DesignableBannerReminderSignedOut';
import { css } from '@emotion/react';
import { space } from '@guardian/source/foundations';
import { useContributionsReminderSignup } from '../../../hooks/useContributionsReminderSignup';

export interface DesignableBannerReminderProps {
	reminderCta: BannerEnrichedReminderCta;
	trackReminderSetClick: () => void;
	setReminderCtaSettings?: CtaSettings;
	mobileReminderRef: React.RefObject<HTMLDivElement> | null;
}

const styles = {
	container: css`
		grid-row: 4;
		grid-column: 1 / span 2;
		order: 5;
		margin-top: ${space[3]}px;
	`,
};

export function DesignableBannerReminder({
	reminderCta,
	trackReminderSetClick,
	setReminderCtaSettings,
	mobileReminderRef,
}: DesignableBannerReminderProps): JSX.Element {
	const { reminderStatus, createReminder } = useContributionsReminderSignup(
		reminderCta.reminderFields.reminderPeriod,
		'WEB',
		'BANNER',
		'PRE',
		reminderCta.reminderFields.reminderOption,
	);

	const onReminderSetClick = (email: string) => {
		trackReminderSetClick();
		createReminder(email);
	};

	return (
		<div ref={mobileReminderRef} css={styles.container}>
			<DesignableBannerReminderSignedOut
				reminderCta={reminderCta}
				reminderStatus={reminderStatus}
				onReminderSetClick={onReminderSetClick}
				setReminderCtaSettings={setReminderCtaSettings}
			/>
		</div>
	);
}
