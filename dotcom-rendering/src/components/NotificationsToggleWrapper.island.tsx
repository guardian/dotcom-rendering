import { log } from '@guardian/libs';
import { textSans14 } from '@guardian/source/foundations';
import type { ComponentProps } from 'react';
import { useEffect, useState } from 'react';
import {
	getMatchNotificationsClient,
	getNotificationsClient,
} from '../lib/bridgetApi';
import { NotificationsToggle } from './NotificationsToggle';

type Props = Omit<
	ComponentProps<typeof NotificationsToggle>,
	'notificationsClient'
>;

export const NotificationsToggleWrapper = (props: Props) => {
	const [isAvailable, setIsAvailable] = useState<boolean | undefined>(
		undefined,
	);
	const [unavailableReason, setUnavailableReason] = useState<
		string | undefined
	>(undefined);

	useEffect(() => {
		void getMatchNotificationsClient()
			.isAvailable()
			.then((availability) => {
				setIsAvailable(availability.isAvailable);
				setUnavailableReason(availability.unavailableReason);
			})
			.catch((error: unknown) => {
				window.guardian.modules.sentry.reportError(
					error instanceof Error ? error : new Error(String(error)),
					'bridget-getMatchNotificationsClient-isAvailable-error',
				);
				log(
					'dotcom',
					'Bridget getMatchNotificationsClient.isAvailable Error:',
					error,
				);
				// Treat errors as available to avoid silently hiding the button
				setIsAvailable(true);
			});
	}, []);

	if (isAvailable === undefined) {
		return null;
	}

	if (!isAvailable) {
		return (
			<p css={textSans14}>
				{unavailableReason ??
					'You have already signed up for team notifications'}
			</p>
		);
	}

	return (
		<NotificationsToggle
			notificationsClient={getNotificationsClient()}
			{...props}
		/>
	);
};
