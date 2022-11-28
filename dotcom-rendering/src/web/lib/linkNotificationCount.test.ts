import type { DropdownLinkType } from '../components/Dropdown';
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
						message: 'Notification here!',
						target: 'one',
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
						message: 'Another notification here!',
						target: 'two',
					},
					{
						message: 'And another one.',
						target: 'two',
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
