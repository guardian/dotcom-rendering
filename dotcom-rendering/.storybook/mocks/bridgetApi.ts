import * as User from '@guardian/bridget/User';
import * as Acquisitions from '@guardian/bridget/Acquisitions';
/**
 * This is a mock logger to replace [bridgetApi.ts][]
 *
 * [bridgetApi.ts]: ../../src/lib/bridgetApi.ts
 */

export const getUserClient: () => Partial<User.Client<void>> = () => ({
	isPremium: async () => false,
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
