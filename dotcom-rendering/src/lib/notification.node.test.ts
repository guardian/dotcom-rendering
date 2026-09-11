import assert from 'node:assert/strict';
import { describe as nodeDescribe, it as nodeIt } from 'node:test';
import { addNotificationsToDropdownLinks } from './notification';

void nodeDescribe('addNotificationsToDropdownLinks', () => {
	void nodeIt('augments dropdown links with notifications', () => {
		const links = [
			{
				id: 'account_overview',
				url: `https://example.com/account_overview`,
				title: 'Account overview',
				dataLinkName: 'nav2 : topbar : account overview',
			},
			{
				id: 'edit_profile',
				url: `https://example.com/edit_profile`,
				title: 'Profile',
				dataLinkName: 'nav2 : topbar : edit profile',
			},
		];
		const notifications = [
			{
				id: 'example-id',
				message: 'Some notification message',
				target: 'account_overview',
				ophanLabel: 'notification-label',
			},
		];

		const linksWithNotifications = addNotificationsToDropdownLinks(
			links,
			notifications,
		);

		assert.deepEqual(linksWithNotifications, [
			{
				id: 'account_overview',
				url: `https://example.com/account_overview`,
				title: 'Account overview',
				dataLinkName: 'nav2 : topbar : account overview',
				notifications: [
					{
						id: 'example-id',
						message: 'Some notification message',
						target: 'account_overview',
						ophanLabel: 'notification-label',
					},
				],
			},
			{
				id: 'edit_profile',
				url: `https://example.com/edit_profile`,
				title: 'Profile',
				dataLinkName: 'nav2 : topbar : edit profile',
			},
		]);
	});

	void nodeIt('adds multiple notification messages to a link', () => {
		const links = [
			{
				id: 'account_overview',
				url: `https://example.com/account_overview`,
				title: 'Account overview',
				dataLinkName: 'nav2 : topbar : account overview',
			},
		];
		const notifications = [
			{
				id: 'example-id-1',
				message: 'Some notification message',
				target: 'account_overview',
				ophanLabel: 'notification-label-1',
			},
			{
				id: 'example-id-2',
				message: 'Another notification message',
				target: 'account_overview',
				ophanLabel: 'notification-label-2',
			},
		];

		const linksWithNotifications = addNotificationsToDropdownLinks(
			links,
			notifications,
		);

		assert.deepEqual(linksWithNotifications, [
			{
				id: 'account_overview',
				url: `https://example.com/account_overview`,
				title: 'Account overview',
				dataLinkName: 'nav2 : topbar : account overview',
				notifications: [
					{
						id: 'example-id-1',
						message: 'Some notification message',
						target: 'account_overview',
						ophanLabel: 'notification-label-1',
					},
					{
						id: 'example-id-2',
						message: 'Another notification message',
						target: 'account_overview',
						ophanLabel: 'notification-label-2',
					},
				],
			},
		]);
	});

	void nodeIt(
		'adds new notifications if target already has notifications',
		() => {
			const links = [
				{
					id: 'account_overview',
					url: `https://example.com/account_overview`,
					title: 'Account overview',
					dataLinkName: 'nav2 : topbar : account overview',
					notifications: [
						{
							id: 'existing',
							message: 'Existing notification message',
							target: 'account_overview',
							ophanLabel: 'notification-label-1',
						},
					],
				},
			];
			const notifications = [
				{
					id: 'new',
					message: 'New notification message',
					target: 'account_overview',
					ophanLabel: 'notification-label-2',
				},
			];

			const linksWithNotifications = addNotificationsToDropdownLinks(
				links,
				notifications,
			);

			assert.deepEqual(linksWithNotifications, [
				{
					id: 'account_overview',
					url: `https://example.com/account_overview`,
					title: 'Account overview',
					dataLinkName: 'nav2 : topbar : account overview',
					notifications: [
						{
							id: 'existing',
							message: 'Existing notification message',
							target: 'account_overview',
							ophanLabel: 'notification-label-1',
						},
						{
							id: 'new',
							message: 'New notification message',
							target: 'account_overview',
							ophanLabel: 'notification-label-2',
						},
					],
				},
			]);
		},
	);
});
