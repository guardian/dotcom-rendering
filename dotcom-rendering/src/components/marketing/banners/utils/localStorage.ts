/**
 * @file
 * This file was migrated from:
 * https://github.com/guardian/support-dotcom-components/blob/0a2439b701586a7a2cc60dce10b4d96cf7a828db/packages/modules/src/modules/banners/localStorage.ts
 */
import { storage } from '@guardian/libs';
import type { BannerChannel } from '@guardian/support-dotcom-components/dist/shared/src/types';

type BannerLastClosedAt =
	| 'engagementBannerLastClosedAt'
	| 'subscriptionBannerLastClosedAt'
	| 'signInBannerLastClosedAt'
	| 'abandonedBasketLastClosedAt';

const setBannerClosedTimestamp = (name: BannerLastClosedAt): void =>
	storage.local.set(`gu.prefs.${name}`, new Date().toISOString());

const bannerChannelToLastClosedMap = {
	contributions: 'engagementBannerLastClosedAt',
	subscriptions: 'subscriptionBannerLastClosedAt',
	signIn: 'signInBannerLastClosedAt',
	abandonedBasket: 'abandonedBasketLastClosedAt',
} as const satisfies Record<BannerChannel, BannerLastClosedAt>;

export const setChannelClosedTimestamp = (channel: BannerChannel): void => {
	setBannerClosedTimestamp(bannerChannelToLastClosedMap[channel]);
};
