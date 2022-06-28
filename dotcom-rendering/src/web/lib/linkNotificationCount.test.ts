import type { DropdownLinkType } from '../components/Dropdown';
import { linkNotificationCount } from './linkNotificationCount';

describe('linksNotificationCount', () => {
	it('returns the sum of notifications across all links', () => {
		const links: DropdownLinkType[] = [
			{
				url: 'https://example.com/1',
				title: 'One',
				dataLinkName: 'One',
				notifications: ['Notification here!'],
			},
			{
				url: 'https://example.com/2',
				title: 'Two',
				dataLinkName: 'Two',
				notifications: [
					'Another notification here!',
					'And another one.',
				],
			},
		];

		const notificationCount = linkNotificationCount(links);

		expect(notificationCount).toEqual(3);
	});

	it('returns 0 when there are no notifications', () => {
		const links = [
			{
				url: 'https://example.com/1',
				title: 'One',
				dataLinkName: 'One',
			},
			{
				url: 'https://example.com/2',
				title: 'Two',
				dataLinkName: 'Two',
			},
		];

		const notificationCount = linkNotificationCount(links);

		expect(notificationCount).toEqual(0);
	});
});
