import type { BrazeCard } from '@guardian/braze-components';
import type { DropdownLinkType } from '../components/Dropdown.importable';

export interface Notification {
	id: string;
	target: string;
	message: string;
	ophanLabel: string;
	logImpression?: () => void;
}

const hasTargetAndMessage = (
	card: BrazeCard,
): card is BrazeCard & { extras: Notification } =>
	Boolean(card.extras.message) &&
	Boolean(card.extras.target) &&
	Boolean(card.extras.ophanLabel);

export const mapBrazeCardsToNotifications = (
	cards: BrazeCard[],
): Notification[] => {
	return cards.filter(hasTargetAndMessage).map((card) => {
		return {
			id: card.id,
			target: card.extras.target,
			message: card.extras.message,
			ophanLabel: card.extras.ophanLabel,
			logImpression: () => {
				card.logImpression();
			},
		};
	});
};

const groupNotificationsByTarget = (
	notifications: Notification[],
): { [k: string]: Notification[] } => {
	return notifications.reduce<{ [k: string]: Notification[] }>(
		(groupings, notification) => {
			groupings[notification.target] = (
				groupings[notification.target] ?? []
			).concat(notification);

			return groupings;
		},
		{},
	);
};

export const addNotificationsToDropdownLinks = (
	links: DropdownLinkType[],
	notifications: Notification[],
): DropdownLinkType[] => {
	const notificationsByTarget = groupNotificationsByTarget(notifications);

	const linksWithNotifications = links.map((link) => {
		const newNotifications = (link.notifications ?? []).concat(
			notificationsByTarget[link.id] ?? [],
		);

		if (newNotifications.length === 0) {
			return link;
		}

		return {
			...link,
			notifications: newNotifications,
		};
	});

	return linksWithNotifications;
};
