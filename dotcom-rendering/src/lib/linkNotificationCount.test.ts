import type { DropdownLinkType } from '../components/Dropdown.importable';
import { linkNotificationCount } from './linkNotificationCount';

describe('linksNotificationCount', () => {
	it('returns the sum of notifications across all links', () => {
		const links: DropdownLinkType[] = [
			{
				id: 'one',
				url: 'https://example.com/1',
				title: 'One',
				dataLinkName: 'One',
				notifications: [
					{
						id: 'example-id',
						message: 'Notification here!',
						target: 'one',
						ophanLabel: 'notification-label',
					},
				],
			},
			{
				id: 'two',
				url: 'https://example.com/2',
				title: 'Two',
				dataLinkName: 'Two',
				notifications: [
					{
						id: 'example-id-1',
						message: 'Another notification here!',
						target: 'two',
						ophanLabel: 'notification-label-1',
					},
					{
						id: 'example-id-2',
						message: 'And another one.',
						target: 'two',
						ophanLabel: 'notification-label-2',
					},
				],
			},
		];

		const notificationCount = linkNotificationCount(links);

		expect(notificationCount).toEqual(3);
	});

	it('returns 0 when there are no notifications', () => {
		const links = [
			{
				id: 'one',
				url: 'https://example.com/1',
				title: 'One',
				dataLinkName: 'One',
			},
			{
				id: 'two',
				url: 'https://example.com/2',
				title: 'Two',
				dataLinkName: 'Two',
			},
		];

		const notificationCount = linkNotificationCount(links);

		expect(notificationCount).toEqual(0);
	});
});
