import type { ComponentProps } from 'react';
import { getNotificationsClient } from '../lib/bridgetApi';
import { NotificationsToggle as NotificationsToggleComponent } from './NotificationsToggle';

type Props = Omit<
	ComponentProps<typeof NotificationsToggleComponent>,
	'notificationsClient'
>;

export const NotificationsToggle = (props: Props) => (
	<NotificationsToggleComponent
		notificationsClient={getNotificationsClient()}
		{...props}
	/>
);
