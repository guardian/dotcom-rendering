import * as User from '@guardian/bridget/User';
import * as Acquisitions from '@guardian/bridget/Acquisitions';
import * as Notifications from '@guardian/bridget/Notifications';
/**
 * This is a mock logger to replace [bridgetApi.ts][]
 *
 * [bridgetApi.ts]: ../../src/lib/bridgetApi.ts
 */

export const getUserClient: () => Partial<User.Client<void>> = () => ({
	isPremium: async () => false,
	doesCcpaApply: async () => false,
});

export const getAcquisitionsClient: () => Partial<
	Acquisitions.Client<void>
> = () => ({
	getEpics: async () => ({
		epic: {
			title: 'We do really good work',
			body: 'You can support us by becoming a subscriber.',
			firstButton: 'Support us',
		},
	}),
	epicSeen: async () => {},
});

export const getNotificationsClient: () => Partial<
	Notifications.Client<void>
> = () => ({
	isFollowing: async () => false,
});
