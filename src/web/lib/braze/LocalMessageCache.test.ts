import type appboy from '@braze/web-sdk-core';
import { storage } from '@guardian/libs';
import {
	LocalMessageCache,
	CachedMessage,
	setQueue,
} from './LocalMessageCache';
import { SlotName } from './BrazeMessages';

const message1Json: string = `{"message":"","messageAlignment":"CENTER","duration":5000,"slideFrom":"BOTTOM","extras":{"heading":"Tom Epic Title 1","slotName":"EndOfArticle","step":"1","componentName":"Epic","highlightedText":"This text is important %%CURRENCY_SYMBOL%%1","buttonText":"Button","buttonUrl":"https://www.example.com","paragraph1":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."},"triggerId":"NjAzNjhmNDFkZTNmMTAxMjE4YmE5Y2E0XyRfY2MmZGkmbXY9NjAzNjhmNDFkZTNmMTAxMjE4YmE5YzZiJnBpPXdmcyZ3PTYwMzY4ZjQxZGUzZjEwMTIxOGJhOWM1OCZ3cD0xNjE0MjQxNTkyJnd2PTYwMzY4ZjQxZGUzZjEwMTIxOGJhOWM5ZA==","clickAction":"NONE","uri":null,"openTarget":"NONE","dismissType":"SWIPE","icon":null,"imageUrl":null,"imageStyle":"TOP","iconColor":4294967295,"iconBackgroundColor":4278219733,"backgroundColor":4294967295,"textColor":4281545523,"closeButtonColor":4288387995,"animateIn":true,"animateOut":true,"header":null,"headerAlignment":"CENTER","headerTextColor":4281545523,"frameColor":3224580915,"buttons":[],"cropType":"FIT_CENTER","Rd":true,"Ma":false,"Qd":false,"X":{"qb":{}},"Ub":{"qb":{}},"Lg":false,"Uf":"WEB_HTML"}`;
const message2Json: string = `{"message":"","messageAlignment":"CENTER","duration":5000,"slideFrom":"BOTTOM","extras":{"heading":"Tom Epic Title 2","slotName":"EndOfArticle","step":"1","componentName":"Epic","highlightedText":"This text is important %%CURRENCY_SYMBOL%%1","buttonText":"Button","buttonUrl":"https://www.example.com","paragraph1":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."},"triggerId":"NjAzNjhmNDFkZTNmMTAxMjE4YmE5Y2E0XyRfY2MmZGkmbXY9NjAzNjhmNDFkZTNmMTAxMjE4YmE5YzZiJnBpPXdmcyZ3PTYwMzY4ZjQxZGUzZjEwMTIxOGJhOWM1OCZ3cD0xNjE0MjQxNTkyJnd2PTYwMzY4ZjQxZGUzZjEwMTIxOGJhOWM5ZA==","clickAction":"NONE","uri":null,"openTarget":"NONE","dismissType":"SWIPE","icon":null,"imageUrl":null,"imageStyle":"TOP","iconColor":4294967295,"iconBackgroundColor":4278219733,"backgroundColor":4294967295,"textColor":4281545523,"closeButtonColor":4288387995,"animateIn":true,"animateOut":true,"header":null,"headerAlignment":"CENTER","headerTextColor":4281545523,"frameColor":3224580915,"buttons":[],"cropType":"FIT_CENTER","Rd":true,"Ma":false,"Qd":false,"X":{"qb":{}},"Ub":{"qb":{}},"Lg":false,"Uf":"WEB_HTML"}`;

type Message = appboy.InAppMessage;

beforeEach(() => {
	storage.local.clear();
});

const getQueueSizeFor = (slotName: SlotName): number => {
	const queue = storage.local.get(
		`gu.brazeMessageCache.${slotName}`,
	) as CachedMessage[];

	return queue.length;
};

const anHourAgo = () => {
	const hourInMilliseconds = 1000 * 60 * 60;
	return Date.now() - hourInMilliseconds;
};

const anHourFromNow = () => {
	const hourInMilliseconds = 1000 * 60 * 60;
	return Date.now() + hourInMilliseconds;
};

const buildUnexpiredMessage = (message: Message): CachedMessage => ({
	message,
	expires: anHourFromNow(),
});

const buildExpiredMessage = (message: Message): CachedMessage => ({
	message,
	expires: anHourAgo(),
});

describe('LocalMessageCache', () => {
	describe('peek', () => {
		it('returns the first item on the queue', () => {
			const message1 = JSON.parse(message1Json);
			const message2 = JSON.parse(message2Json);
			const queue = [
				buildUnexpiredMessage(message1),
				buildUnexpiredMessage(message2),
			];
			setQueue('EndOfArticle', queue);

			const m = LocalMessageCache.peek('EndOfArticle');

			expect(m).toEqual(message1);
		});

		it('does not remove items from the queue', () => {
			const message1 = JSON.parse(message1Json);
			const message2 = JSON.parse(message2Json);
			const queue = [
				buildUnexpiredMessage(message1),
				buildUnexpiredMessage(message2),
			];
			setQueue('EndOfArticle', queue);

			LocalMessageCache.peek('EndOfArticle');

			const newQueueLength = getQueueSizeFor('EndOfArticle');
			expect(newQueueLength).toEqual(queue.length);
		});

		it('returns undefined if the queue is empty', () => {
			setQueue('EndOfArticle', []);

			const m = LocalMessageCache.peek('EndOfArticle');

			expect(m).toBeUndefined();
		});

		it('returns the first unexpired message', () => {
			const message1 = JSON.parse(message1Json);
			const message2 = JSON.parse(message2Json);
			const queue = [
				buildExpiredMessage(message1),
				buildUnexpiredMessage(message2),
			];
			setQueue('EndOfArticle', queue);

			const m = LocalMessageCache.peek('EndOfArticle');

			expect(m).toEqual(message2);
		});

		it('removes expired items from the queue', () => {
			const message1 = JSON.parse(message1Json);
			const message2 = JSON.parse(message2Json);
			const queue = [
				buildExpiredMessage(message1),
				buildUnexpiredMessage(message2),
			];
			setQueue('EndOfArticle', queue);

			LocalMessageCache.peek('EndOfArticle');

			const queueSize = getQueueSizeFor('EndOfArticle');
			expect(queueSize).toEqual(1);
		});
	});

	describe('shift', () => {
		it('returns the first item on the queue', () => {
			const message1 = JSON.parse(message1Json);
			const message2 = JSON.parse(message2Json);
			const queue = [
				buildUnexpiredMessage(message1),
				buildUnexpiredMessage(message2),
			];
			setQueue('EndOfArticle', queue);

			const m = LocalMessageCache.shift('EndOfArticle');

			expect(m).toEqual(message1);
		});

		it('removes the item from start of the queue', () => {
			const message1 = JSON.parse(message1Json);
			const message2 = JSON.parse(message2Json);
			const queue = [
				buildUnexpiredMessage(message1),
				buildUnexpiredMessage(message2),
			];
			setQueue('EndOfArticle', queue);

			LocalMessageCache.shift('EndOfArticle');

			const newQueue = storage.local.get(
				'gu.brazeMessageCache.EndOfArticle',
			) as CachedMessage[];
			expect(newQueue.map((i) => i.message)).toEqual([message2]);
		});

		it('returns undefined if the queue is empty', () => {
			setQueue('EndOfArticle', []);
			const m = LocalMessageCache.shift('EndOfArticle');

			expect(m).toBeUndefined();
		});

		it('returns the first unexpired message', () => {
			const message1 = JSON.parse(message1Json);
			const message2 = JSON.parse(message2Json);
			const queue = [
				buildExpiredMessage(message1),
				buildUnexpiredMessage(message2),
			];
			setQueue('EndOfArticle', queue);

			const m = LocalMessageCache.shift('EndOfArticle');
			expect(m).toEqual(message2);
		});

		it('removes expired items from the queue', () => {
			const message1 = JSON.parse(message1Json);
			const message2 = JSON.parse(message2Json);
			const queue = [
				buildExpiredMessage(message1),
				buildUnexpiredMessage(message2),
			];
			setQueue('EndOfArticle', queue);

			LocalMessageCache.shift('EndOfArticle');

			const queueSize = getQueueSizeFor('EndOfArticle');
			expect(queueSize).toEqual(0);
		});
	});

	describe('push', () => {
		it('adds an item to the end of the queue', () => {
			const message1 = JSON.parse(message1Json);
			LocalMessageCache.push('EndOfArticle', message1);

			const message2 = JSON.parse(message2Json);
			LocalMessageCache.push('EndOfArticle', message2);

			const newQueue = storage.local.get(
				'gu.brazeMessageCache.EndOfArticle',
			) as CachedMessage[];
			expect(newQueue.map((i) => i.message)).toEqual([
				message1,
				message2,
			]);
		});

		it('lazily creates the queue if not already defined', () => {
			const message = JSON.parse(message1Json);

			LocalMessageCache.push('EndOfArticle', message);

			const newQueue = storage.local.get(
				'gu.brazeMessageCache.EndOfArticle',
			) as CachedMessage[];
			expect(newQueue.map((i) => i.message)).toEqual([message]);
		});
	});

	describe('clear', () => {
		it('wipes all queues', () => {
			const message1 = JSON.parse(message1Json);
			const queue1 = [buildUnexpiredMessage(message1)];
			const queue2 = [buildUnexpiredMessage(message1)];
			setQueue('EndOfArticle', queue1);
			setQueue('Banner', queue2);

			LocalMessageCache.clear();

			expect(LocalMessageCache.peek('EndOfArticle')).toBeUndefined();
			expect(LocalMessageCache.peek('Banner')).toBeUndefined();
		});
	});
});
