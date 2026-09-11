import assert from 'node:assert/strict';
import { describe as nodeDescribe, it as nodeIt } from 'node:test';
import type { DropdownLinkType } from '../components/Dropdown.island';
import { linkNotificationCount } from './linkNotificationCount';

void nodeDescribe('linksNotificationCount', () => {
	void nodeIt('returns the sum of notifications across all links', () => {
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

		assert.equal(linkNotificationCount(links), 3);
	});

	void nodeIt('returns 0 when there are no notifications', () => {
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

		assert.equal(linkNotificationCount(links), 0);
	});
});
