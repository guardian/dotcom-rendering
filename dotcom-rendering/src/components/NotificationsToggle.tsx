import { Topic } from '@guardian/bridget/Topic';
import { log } from '@guardian/libs';
import {
	SvgNotificationsOff,
	SvgNotificationsOn,
} from '@guardian/source/react-components';
import { useEffect, useState } from 'react';
import type { NotificationsClient } from '../lib/bridgetApi';
import { ToggleButton } from './ToggleButton';

type Props = {
	id: string;
	displayName: string;
	notificationType: 'content';
	notificationsClient: NotificationsClient;
};

export const NotificationsToggle = ({
	id,
	displayName,
	notificationType,
	notificationsClient,
}: Props) => {
	const [isFollowing, setIsFollowing] = useIsFollowing(
		id,
		displayName,
		notificationType,
		notificationsClient,
	);

	return (
		<ToggleButton
			colour="--follow-text"
			icon={
				isFollowing ? (
					<SvgNotificationsOn size="xsmall" />
				) : (
					<SvgNotificationsOff size="xsmall" />
				)
			}
			iconBackground={isFollowing ? '--follow-icon-fill' : undefined}
			iconBorder="--follow-icon-fill"
			iconFill={
				isFollowing ? '--follow-icon-background' : '--follow-icon-fill'
			}
			onClick={toggleNotifications(
				id,
				displayName,
				notificationType,
				notificationsClient,
				isFollowing,
				setIsFollowing,
			)}
		>
			Notifications {isFollowing ? 'on' : 'off'}
		</ToggleButton>
	);
};

/**
 * Retrieves information about whether the user is following a particular topic,
 * via Bridget, and stores it in a state variable for use in the rest of the
 * component. Also supplies a setter to update that state, similar to
 * `useState`.
 */
const useIsFollowing = (
	id: string,
	displayName: string,
	notificationType: Props['notificationType'],
	notificationsClient: Props['notificationsClient'],
): [
	boolean | undefined,
	React.Dispatch<React.SetStateAction<boolean | undefined>>,
] => {
	const [isFollowing, setIsFollowing] = useState<boolean | undefined>(
		undefined,
	);

	useEffect(() => {
		const topic = new Topic({
			id,
			displayName,
			type: notificationType,
		});

		void notificationsClient
			.isFollowing(topic)
			.then(setIsFollowing)
			.catch(handleError('isFollowing'));
	}, [id, displayName, notificationType, notificationsClient]);

	return [isFollowing, setIsFollowing];
};

const toggleNotifications = (
	id: string,
	displayName: string,
	notificationType: Props['notificationType'],
	notificationsClient: Props['notificationsClient'],
	isFollowing: boolean | undefined,
	setIsFollowing: (a: boolean) => void,
): (() => void) =>
	isFollowing === undefined
		? () => undefined
		: () => {
				const topic = new Topic({
					id,
					displayName,
					type: notificationType,
				});

				if (isFollowing) {
					void notificationsClient
						.unfollow(topic)
						.then((success) => {
							if (success) {
								setIsFollowing(false);
							}
						})
						.catch(handleError('unfollow'));
				} else {
					void notificationsClient
						.follow(topic)
						.then((success) => {
							if (success) {
								setIsFollowing(true);
							}
						})
						.catch(handleError('follow'));
				}
		  };

const handleError =
	(methodName: 'follow' | 'unfollow' | 'isFollowing') =>
	(error: any): void => {
		window.guardian.modules.sentry.reportError(
			error,
			`bridget-getNotificationsClient-${methodName}-error`,
		);
		log(
			'dotcom',
			`Bridget getNotificationsClient.${methodName} Error:`,
			error,
		);
	};
