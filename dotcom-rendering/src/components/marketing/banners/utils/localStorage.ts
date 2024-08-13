import { storage } from '@guardian/libs';
import type { BannerChannel } from '@guardian/support-dotcom-components/dist/shared/src/types';

type BannerLastClosedAt =
	| 'engagementBannerLastClosedAt'
	| 'subscriptionBannerLastClosedAt'
	| 'signInBannerLastClosedAt'
	| 'abandonedBasketLastClosedAt';

const setBannerClosedTimestamp = (name: BannerLastClosedAt): void =>
	storage.local.set(
		`gu.prefs.${name}`,
		JSON.stringify({
			value: new Date().toISOString(),
		}),
	);

const bannerChannelToLastClosedMap = {
	contributions: 'engagementBannerLastClosedAt',
	subscriptions: 'subscriptionBannerLastClosedAt',
	signIn: 'signInBannerLastClosedAt',
	abandonedBasket: 'abandonedBasketLastClosedAt',
} as const satisfies Record<BannerChannel, BannerLastClosedAt>;

export const setChannelClosedTimestamp = (channel: BannerChannel): void => {
	setBannerClosedTimestamp(bannerChannelToLastClosedMap[channel]);
};
