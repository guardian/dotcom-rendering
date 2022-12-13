import { addNotificationsToDropdownLinks } from './notification';

describe('addNotificationsToDropdownLinks', () => {
	it('augments dropdown links with notifications', () => {
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
			},
		];

		const linksWithNotifications = addNotificationsToDropdownLinks(
			links,
			notifications,
		);

		expect(linksWithNotifications).toEqual([
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

	it('adds multiple notification messages to a link', () => {
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
			},
			{
				id: 'example-id-2',
				message: 'Another notification message',
				target: 'account_overview',
			},
		];

		const linksWithNotifications = addNotificationsToDropdownLinks(
			links,
			notifications,
		);

		expect(linksWithNotifications).toEqual([
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
					},
					{
						id: 'example-id-2',
						message: 'Another notification message',
						target: 'account_overview',
					},
				],
			},
		]);
	});

	it('adds new notifications if target already has notifications', () => {
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
					},
				],
			},
		];
		const notifications = [
			{
				id: 'new',
				message: 'New notification message',
				target: 'account_overview',
			},
		];

		const linksWithNotifications = addNotificationsToDropdownLinks(
			links,
			notifications,
		);

		expect(linksWithNotifications).toEqual([
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
					},
					{
						id: 'new',
						message: 'New notification message',
						target: 'account_overview',
					},
				],
			},
		]);
	});
});
