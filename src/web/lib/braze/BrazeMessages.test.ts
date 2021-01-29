import { BrazeMessages } from './BrazeMessages';
import { FakeAppBoy } from './FakeAppBoy';

describe('BrazeMessages', () => {
	describe('getMessageForBanner & getMessageForEndOfArticle', () => {
		it('returns a promise which resolves with message data for the correct slot', async () => {
			const appboy = new FakeAppBoy();
			const brazeMessages = new BrazeMessages(appboy);

			const bannerPromise = brazeMessages.getMessageForBanner();
			const endOfArticlePromise = brazeMessages.getMessageForEndOfArticle();

			const bannerMessage = {
				extras: { slotName: 'Banner', title: 'Example' },
			};
			appboy.emit(bannerMessage);

			const endOfArticleMessage = {
				extras: {
					slotName: 'EndOfArticle',
					title: 'Example',
				},
			};
			appboy.emit(endOfArticleMessage);

			const data = await Promise.all([
				bannerPromise,
				endOfArticlePromise,
			]);
			expect(data[0]).toEqual(bannerMessage);
			expect(data[1]).toEqual(endOfArticleMessage);
		});

		it('supports multiple calls to the same slot, returning separate promises', async () => {
			const appboy = new FakeAppBoy();
			const brazeMessages = new BrazeMessages(appboy);

			const bannerPromise = brazeMessages.getMessageForBanner();
			const anotherBannerPromise = brazeMessages.getMessageForBanner();

			const message = {
				extras: { slotName: 'Banner', title: 'Example' },
			};
			appboy.emit(message);

			const data = await Promise.all([
				bannerPromise,
				anotherBannerPromise,
			]);
			expect(data[0]).toEqual(message);
			expect(data[1]).toEqual(message);
		});
	});
});
