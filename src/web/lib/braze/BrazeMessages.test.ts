import appboy from '@braze/web-sdk-core';
import { createNanoEvents, Emitter } from 'nanoevents';
import { BrazeMessages } from './BrazeMessages';
import {
	LocalMessageCache,
	InMemoryCache,
	hydrateMessage,
} from './LocalMessageCache';

const logInAppMessageImpressionSpy = jest.fn();

const message1Json: string = `{"message":"","messageAlignment":"CENTER","duration":5000,"slideFrom":"BOTTOM","extras":{"heading":"Tom Epic Title 1","slotName":"EndOfArticle","step":"1","componentName":"Epic","highlightedText":"This text is important %%CURRENCY_SYMBOL%%1","buttonText":"Button","buttonUrl":"https://www.example.com","paragraph1":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."},"triggerId":"NjAzNjhmNDFkZTNmMTAxMjE4YmE5Y2E0XyRfY2MmZGkmbXY9NjAzNjhmNDFkZTNmMTAxMjE4YmE5YzZiJnBpPXdmcyZ3PTYwMzY4ZjQxZGUzZjEwMTIxOGJhOWM1OCZ3cD0xNjE0MjQxNTkyJnd2PTYwMzY4ZjQxZGUzZjEwMTIxOGJhOWM5ZA==","clickAction":"NONE","uri":null,"openTarget":"NONE","dismissType":"SWIPE","icon":null,"imageUrl":null,"imageStyle":"TOP","iconColor":4294967295,"iconBackgroundColor":4278219733,"backgroundColor":4294967295,"textColor":4281545523,"closeButtonColor":4288387995,"animateIn":true,"animateOut":true,"header":null,"headerAlignment":"CENTER","headerTextColor":4281545523,"frameColor":3224580915,"buttons":[],"cropType":"FIT_CENTER","Rd":true,"Ma":false,"Qd":false,"X":{"qb":{}},"Ub":{"qb":{}},"Lg":false,"Uf":"WEB_HTML"}`;
const message2Json: string = `{"message":"","messageAlignment":"CENTER","duration":5000,"slideFrom":"BOTTOM","extras":{"heading":"Tom Epic Title 2","slotName":"EndOfArticle","step":"1","componentName":"Epic","highlightedText":"This text is important %%CURRENCY_SYMBOL%%1","buttonText":"Button","buttonUrl":"https://www.example.com","paragraph1":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."},"triggerId":"NjAzNjhmNDFkZTNmMTAxMjE4YmE5Y2E0XyRfY2MmZGkmbXY9NjAzNjhmNDFkZTNmMTAxMjE4YmE5YzZiJnBpPXdmcyZ3PTYwMzY4ZjQxZGUzZjEwMTIxOGJhOWM1OCZ3cD0xNjE0MjQxNTkyJnd2PTYwMzY4ZjQxZGUzZjEwMTIxOGJhOWM5ZA==","clickAction":"NONE","uri":null,"openTarget":"NONE","dismissType":"SWIPE","icon":null,"imageUrl":null,"imageStyle":"TOP","iconColor":4294967295,"iconBackgroundColor":4278219733,"backgroundColor":4294967295,"textColor":4281545523,"closeButtonColor":4288387995,"animateIn":true,"animateOut":true,"header":null,"headerAlignment":"CENTER","headerTextColor":4281545523,"frameColor":3224580915,"buttons":[],"cropType":"FIT_CENTER","Rd":true,"Ma":false,"Qd":false,"X":{"qb":{}},"Ub":{"qb":{}},"Lg":false,"Uf":"WEB_HTML"}`;

class FakeAppBoy {
	emitter: Emitter;

	HtmlMessage: typeof appboy.HtmlMessage;

	constructor() {
		this.emitter = createNanoEvents();
		this.HtmlMessage = appboy.HtmlMessage;
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

const buildMessage = (data: any) => hydrateMessage(data, appboy);

describe('BrazeMessages', () => {
	describe(`When the cache is enabled`, () => {
		beforeEach(() => {
			LocalMessageCache.clear();
		});

		describe('getMessageForBanner & getMessageForEndOfArticle', () => {
			it('returns a promise which resolves with message data for the correct slot', async () => {
				const fakeAppBoy = new FakeAppBoy();
				const brazeMessages = new BrazeMessages(
					(fakeAppBoy as unknown) as typeof appboy,
					LocalMessageCache,
				);

				const bannerPromise = brazeMessages.getMessageForBanner();
				const endOfArticlePromise = brazeMessages.getMessageForEndOfArticle();

				const bannerMessage = buildMessage({
					...JSON.parse(message1Json),
					extras: { slotName: 'Banner', title: 'Example' },
				});
				fakeAppBoy.emit(bannerMessage);

				const endOfArticleMessage = buildMessage({
					...JSON.parse(message2Json),
					extras: {
						slotName: 'EndOfArticle',
						title: 'Example',
					},
				});
				fakeAppBoy.emit(endOfArticleMessage);

				const data = await Promise.all([
					bannerPromise,
					endOfArticlePromise,
				]);
				expect(data[0].extras).toEqual(bannerMessage.extras);
				expect(data[1].extras).toEqual(endOfArticleMessage.extras);
			});

			it('returns a message which is capable of logging an impression', async () => {
				const fakeAppBoy = new FakeAppBoy();
				const brazeMessages = new BrazeMessages(
					(fakeAppBoy as unknown) as typeof appboy,
					LocalMessageCache,
				);

				const bannerPromise = brazeMessages.getMessageForBanner();

				const message = buildMessage({
					...JSON.parse(message1Json),
					extras: { slotName: 'Banner', title: 'Example' },
				});
				fakeAppBoy.emit(message);

				const bannerMessage = await bannerPromise;
				bannerMessage.logImpression();

				expect(logInAppMessageImpressionSpy).toHaveBeenCalledWith(
					message,
				);
			});

			it('returns a message with an id', async () => {
				const fakeAppBoy = new FakeAppBoy();
				const brazeMessages = new BrazeMessages(
					(fakeAppBoy as unknown) as typeof appboy,
					LocalMessageCache,
				);

				const bannerPromise = brazeMessages.getMessageForBanner();

				const message = buildMessage({
					...JSON.parse(message1Json),
					extras: { slotName: 'Banner', title: 'Example' },
				});
				fakeAppBoy.emit(message);

				const bannerMessage = await bannerPromise;

				expect(bannerMessage.id).toMatch(/\w{11,13}-\d{13}/);
			});

			it('returns a cached message if one is available', async () => {
				const cachedMessage = buildMessage(JSON.parse(message1Json));
				LocalMessageCache.push('EndOfArticle', {
					message: cachedMessage,
					id: '1',
				});
				const freshMessage = buildMessage(JSON.parse(message2Json));
				const fakeAppBoy = new FakeAppBoy();
				const brazeMessages = new BrazeMessages(
					(fakeAppBoy as unknown) as typeof appboy,
					LocalMessageCache,
				);
				fakeAppBoy.emit(freshMessage);

				const gotMessage = await brazeMessages.getMessageForEndOfArticle();

				expect(gotMessage.message).toEqual(cachedMessage);
			});

			it('logging an impression results in the message being removed from the cache', async () => {
				const cachedMessage = buildMessage(JSON.parse(message1Json));
				LocalMessageCache.push('EndOfArticle', {
					message: cachedMessage,
					id: '1',
				});
				const freshMessage = buildMessage(JSON.parse(message2Json));
				const fakeAppBoy = new FakeAppBoy();
				const brazeMessages = new BrazeMessages(
					(fakeAppBoy as unknown) as typeof appboy,
					LocalMessageCache,
				);
				fakeAppBoy.emit(freshMessage);

				const firstMessage = await brazeMessages.getMessageForEndOfArticle();
				firstMessage.logImpression();

				const anotherMessage = await brazeMessages.getMessageForEndOfArticle();
				expect(anotherMessage.message).toEqual(freshMessage);
			});

			it('returns the same cached message multiple times if an impression is not logged', async () => {
				const cachedMessage = buildMessage(JSON.parse(message1Json));
				LocalMessageCache.push('EndOfArticle', {
					message: cachedMessage,
					id: '1',
				});
				const freshMessage = buildMessage(JSON.parse(message2Json));
				const fakeAppBoy = new FakeAppBoy();
				const brazeMessages = new BrazeMessages(
					(fakeAppBoy as unknown) as typeof appboy,
					LocalMessageCache,
				);
				fakeAppBoy.emit(freshMessage);

				const firstMessage = await brazeMessages.getMessageForEndOfArticle();
				const secondMessage = await brazeMessages.getMessageForEndOfArticle();

				expect(firstMessage).toEqual(secondMessage);
			});
		});
	});

	describe(`When the cache is not enabled`, () => {
		beforeEach(() => {
			InMemoryCache.clear();
		});
		describe('getMessageForBanner & getMessageForEndOfArticle', () => {
			it('returns a promise which resolves with message data for the correct slot', async () => {
				const fakeAppBoy = new FakeAppBoy();
				const brazeMessages = new BrazeMessages(
					(fakeAppBoy as unknown) as typeof appboy,
					InMemoryCache,
				);

				const bannerPromise = brazeMessages.getMessageForBanner();
				const endOfArticlePromise = brazeMessages.getMessageForEndOfArticle();

				const bannerMessage = buildMessage({
					extras: { slotName: 'Banner', title: 'Example' },
				});
				fakeAppBoy.emit(bannerMessage);

				const endOfArticleMessage = buildMessage({
					extras: {
						slotName: 'EndOfArticle',
						title: 'Example',
					},
				});
				fakeAppBoy.emit(endOfArticleMessage);

				const data = await Promise.all([
					bannerPromise,
					endOfArticlePromise,
				]);
				expect(data[0].extras).toEqual(bannerMessage.extras);
				expect(data[1].extras).toEqual(endOfArticleMessage.extras);
			});

			it('returns a message which is capable of logging an impression', async () => {
				const fakeAppBoy = new FakeAppBoy();
				const brazeMessages = new BrazeMessages(
					(fakeAppBoy as unknown) as typeof appboy,
					InMemoryCache,
				);

				const bannerPromise = brazeMessages.getMessageForBanner();

				const message = buildMessage({
					extras: { slotName: 'Banner', title: 'Example' },
				});
				fakeAppBoy.emit(message);

				const bannerMessage = await bannerPromise;
				bannerMessage.logImpression();

				expect(logInAppMessageImpressionSpy).toHaveBeenCalledWith(
					message,
				);
			});

			it('returns a message with an id', async () => {
				const fakeAppBoy = new FakeAppBoy();
				const brazeMessages = new BrazeMessages(
					(fakeAppBoy as unknown) as typeof appboy,
					InMemoryCache,
				);

				const bannerPromise = brazeMessages.getMessageForBanner();

				const message = buildMessage({
					extras: { slotName: 'Banner', title: 'Example' },
				});
				fakeAppBoy.emit(message);

				const bannerMessage = await bannerPromise;

				expect(bannerMessage.id).toMatch(/\w{11,13}-\d{13}/);
			});

			it('returns a cached message if one is available', async () => {
				const cachedMessage = buildMessage(JSON.parse(message1Json));
				InMemoryCache.push('EndOfArticle', {
					message: cachedMessage,
					id: '1',
				});
				const freshMessage = buildMessage(JSON.parse(message2Json));
				const fakeAppBoy = new FakeAppBoy();
				const brazeMessages = new BrazeMessages(
					(fakeAppBoy as unknown) as typeof appboy,
					InMemoryCache,
				);
				fakeAppBoy.emit(freshMessage);

				const gotMessage = await brazeMessages.getMessageForEndOfArticle();

				expect(gotMessage.message).toEqual(cachedMessage);
			});

			it('logging an impression results in the message being removed from the cache', async () => {
				const cachedMessage = buildMessage(JSON.parse(message1Json));
				InMemoryCache.push('EndOfArticle', {
					message: cachedMessage,
					id: '1',
				});
				const freshMessage = buildMessage(JSON.parse(message2Json));
				const fakeAppBoy = new FakeAppBoy();
				const brazeMessages = new BrazeMessages(
					(fakeAppBoy as unknown) as typeof appboy,
					InMemoryCache,
				);
				fakeAppBoy.emit(freshMessage);

				const firstMessage = await brazeMessages.getMessageForEndOfArticle();
				firstMessage.logImpression();

				const anotherMessage = await brazeMessages.getMessageForEndOfArticle();
				expect(anotherMessage.message).toEqual(freshMessage);
			});

			it('returns the same cached message multiple times if an impression is not logged', async () => {
				const cachedMessage = buildMessage(JSON.parse(message1Json));
				InMemoryCache.push('EndOfArticle', {
					message: cachedMessage,
					id: '1',
				});
				const freshMessage = buildMessage(JSON.parse(message2Json));
				const fakeAppBoy = new FakeAppBoy();
				const brazeMessages = new BrazeMessages(
					(fakeAppBoy as unknown) as typeof appboy,
					InMemoryCache,
				);
				fakeAppBoy.emit(freshMessage);

				const firstMessage = await brazeMessages.getMessageForEndOfArticle();
				const secondMessage = await brazeMessages.getMessageForEndOfArticle();

				expect(firstMessage).toEqual(secondMessage);
			});
		});
	});
});
