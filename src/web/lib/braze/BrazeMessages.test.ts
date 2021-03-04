import type appboy from '@braze/web-sdk-core';
import { createNanoEvents, Emitter } from 'nanoevents';
import { BrazeMessages } from './BrazeMessages';

const logInAppMessageImpressionSpy = jest.fn();

class FakeAppBoy {
	emitter: Emitter;

	constructor() {
		this.emitter = createNanoEvents();
	}

	subscribeToInAppMessage(
		fn: (message: appboy.InAppMessage | appboy.ControlMessage) => void,
	) {
		this.emitter.on('inAppMessage', fn);
		return 'FAKE_SUBSCRIPTION_ID';
	}

	emit(payload: any) {
		this.emitter.emit('inAppMessage', payload);
	}

	// eslint-disable-next-line class-methods-use-this
	logInAppMessageImpression(message: appboy.InAppMessage): void {
		logInAppMessageImpressionSpy(message);
	}
}

beforeEach(() => {
	logInAppMessageImpressionSpy.mockClear();
});

describe('BrazeMessages', () => {
	describe('getMessageForBanner & getMessageForEndOfArticle', () => {
		it('returns a promise which resolves with message data for the correct slot', async () => {
			const fakeAppBoy = new FakeAppBoy();
			const brazeMessages = new BrazeMessages(
				(fakeAppBoy as unknown) as typeof appboy,
			);

			const bannerPromise = brazeMessages.getMessageForBanner();
			const endOfArticlePromise = brazeMessages.getMessageForEndOfArticle();

			const bannerMessage = {
				extras: { slotName: 'Banner', title: 'Example' },
			};
			fakeAppBoy.emit(bannerMessage);

			const endOfArticleMessage = {
				extras: {
					slotName: 'EndOfArticle',
					title: 'Example',
				},
			};
			fakeAppBoy.emit(endOfArticleMessage);

			const data = await Promise.all([
				bannerPromise,
				endOfArticlePromise,
			]);
			expect(data[0].extras).toEqual(bannerMessage.extras);
			expect(data[1].extras).toEqual(endOfArticleMessage.extras);
		});

		it('supports multiple calls to the same slot, returning separate promises', async () => {
			const fakeAppBoy = new FakeAppBoy();
			const brazeMessages = new BrazeMessages(
				(fakeAppBoy as unknown) as typeof appboy,
			);

			const bannerPromise = brazeMessages.getMessageForBanner();
			const anotherBannerPromise = brazeMessages.getMessageForBanner();

			const message = {
				extras: { slotName: 'Banner', title: 'Example' },
			};
			fakeAppBoy.emit(message);

			const data = await Promise.all([
				bannerPromise,
				anotherBannerPromise,
			]);
			expect(data[0].extras).toEqual(message.extras);
			expect(data[1].extras).toEqual(message.extras);
		});

		it('returns a message which is capable of logging an impression', async () => {
			const fakeAppBoy = new FakeAppBoy();
			const brazeMessages = new BrazeMessages(
				(fakeAppBoy as unknown) as typeof appboy,
			);

			const bannerPromise = brazeMessages.getMessageForBanner();

			const message = {
				extras: { slotName: 'Banner', title: 'Example' },
			};
			fakeAppBoy.emit(message);

			const bannerMessage = await bannerPromise;
			bannerMessage.logImpression();

			expect(logInAppMessageImpressionSpy).toHaveBeenCalledWith(message);
		});
	});
});
