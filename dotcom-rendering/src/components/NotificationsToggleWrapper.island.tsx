import type { ComponentProps } from 'react';
import { getNotificationsClient } from '../lib/bridgetApi';
import { NotificationsToggle } from './NotificationsToggle';

type Props = Omit<
	ComponentProps<typeof NotificationsToggle>,
	'notificationsClient'
>;

export const NotificationsToggleWrapper = (props: Props) => (
	<NotificationsToggle
		notificationsClient={getNotificationsClient()}
		{...props}
	/>
);
