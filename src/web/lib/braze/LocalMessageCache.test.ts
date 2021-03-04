import type appboy from '@braze/web-sdk-core';
import { LocalMessageCache } from './LocalMessageCache';

const message1Json: string = `{"message":"","messageAlignment":"CENTER","duration":5000,"slideFrom":"BOTTOM","extras":{"heading":"Tom Epic Title 1","slotName":"EndOfArticle","step":"1","componentName":"Epic","highlightedText":"This text is important %%CURRENCY_SYMBOL%%1","buttonText":"Button","buttonUrl":"https://www.example.com","paragraph1":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."},"triggerId":"NjAzNjhmNDFkZTNmMTAxMjE4YmE5Y2E0XyRfY2MmZGkmbXY9NjAzNjhmNDFkZTNmMTAxMjE4YmE5YzZiJnBpPXdmcyZ3PTYwMzY4ZjQxZGUzZjEwMTIxOGJhOWM1OCZ3cD0xNjE0MjQxNTkyJnd2PTYwMzY4ZjQxZGUzZjEwMTIxOGJhOWM5ZA==","clickAction":"NONE","uri":null,"openTarget":"NONE","dismissType":"SWIPE","icon":null,"imageUrl":null,"imageStyle":"TOP","iconColor":4294967295,"iconBackgroundColor":4278219733,"backgroundColor":4294967295,"textColor":4281545523,"closeButtonColor":4288387995,"animateIn":true,"animateOut":true,"header":null,"headerAlignment":"CENTER","headerTextColor":4281545523,"frameColor":3224580915,"buttons":[],"cropType":"FIT_CENTER","Rd":true,"Ma":false,"Qd":false,"X":{"qb":{}},"Ub":{"qb":{}},"Lg":false,"Uf":"WEB_HTML"}`;
const message2Json: string = `{"message":"","messageAlignment":"CENTER","duration":5000,"slideFrom":"BOTTOM","extras":{"heading":"Tom Epic Title 2","slotName":"EndOfArticle","step":"1","componentName":"Epic","highlightedText":"This text is important %%CURRENCY_SYMBOL%%1","buttonText":"Button","buttonUrl":"https://www.example.com","paragraph1":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."},"triggerId":"NjAzNjhmNDFkZTNmMTAxMjE4YmE5Y2E0XyRfY2MmZGkmbXY9NjAzNjhmNDFkZTNmMTAxMjE4YmE5YzZiJnBpPXdmcyZ3PTYwMzY4ZjQxZGUzZjEwMTIxOGJhOWM1OCZ3cD0xNjE0MjQxNTkyJnd2PTYwMzY4ZjQxZGUzZjEwMTIxOGJhOWM5ZA==","clickAction":"NONE","uri":null,"openTarget":"NONE","dismissType":"SWIPE","icon":null,"imageUrl":null,"imageStyle":"TOP","iconColor":4294967295,"iconBackgroundColor":4278219733,"backgroundColor":4294967295,"textColor":4281545523,"closeButtonColor":4288387995,"animateIn":true,"animateOut":true,"header":null,"headerAlignment":"CENTER","headerTextColor":4281545523,"frameColor":3224580915,"buttons":[],"cropType":"FIT_CENTER","Rd":true,"Ma":false,"Qd":false,"X":{"qb":{}},"Ub":{"qb":{}},"Lg":false,"Uf":"WEB_HTML"}`;

class FakeStore {
	data: Record<string, string | null>;

	constructor() {
		this.data = {};
	}

	setItem(key: string, value: string) {
		this.data[key] = value;
	}

	getItem(key: string) {
		return this.data[key];
	}

	removeItem(key: string) {
		delete this.data[key];
	}
}

describe('LocalMessageCache', () => {
	describe('peek', () => {
		it('returns the first item on the queue', () => {
			const store = new FakeStore();
			const cache = new LocalMessageCache(store);
			const message1 = JSON.parse(message1Json);
			const message2 = JSON.parse(message2Json);
			const queue = [message1, message2];
			store.setItem(
				'gu.brazeMessageCache.EndOfArticle',
				JSON.stringify(queue),
			);

			const m = cache.peek('EndOfArticle');

			expect(m).toEqual(message1);
		});

		it('does not remove items from the queue', () => {
			const store = new FakeStore();
			const cache = new LocalMessageCache(store);
			const message1 = JSON.parse(message1Json);
			const message2 = JSON.parse(message2Json);
			const queue = [message1, message2];
			store.setItem(
				'gu.brazeMessageCache.EndOfArticle',
				JSON.stringify(queue),
			);

			cache.peek('EndOfArticle');

			const newQueue = JSON.parse(
				store.getItem('gu.brazeMessageCache.EndOfArticle') as string,
			) as any[];
			expect(newQueue.length).toEqual(queue.length);
		});

		it('returns undefined if the queue is empty', () => {
			const store = new FakeStore();
			const cache = new LocalMessageCache(store);
			const queue = JSON.stringify([]);
			store.setItem('gu.brazeMessageCache.EndOfArticle', queue);

			const m = cache.peek('EndOfArticle');

			expect(m).toBeUndefined();
		});
	});

	describe('shift', () => {
		it('returns the first item on the queue', () => {
			const store = new FakeStore();
			const cache = new LocalMessageCache(store);
			const message1 = JSON.parse(message1Json);
			const message2 = JSON.parse(message2Json);
			const queue = [message1, message2];
			store.setItem(
				'gu.brazeMessageCache.EndOfArticle',
				JSON.stringify(queue),
			);

			const m = cache.shift('EndOfArticle');

			expect(m).toEqual(message1);
		});

		it('removes the item from start of the queue', () => {
			const store = new FakeStore();
			const cache = new LocalMessageCache(store);
			const message1 = JSON.parse(message1Json);
			const message2 = JSON.parse(message2Json);
			const queue = [message1, message2];
			store.setItem(
				'gu.brazeMessageCache.EndOfArticle',
				JSON.stringify(queue),
			);

			cache.shift('EndOfArticle');

			const newQueue = JSON.parse(
				store.getItem('gu.brazeMessageCache.EndOfArticle') as string,
			) as appboy.InAppMessage[];
			expect(newQueue).toEqual([message2]);
		});

		it('returns undefined if the queue is empty', () => {
			const store = new FakeStore();
			const cache = new LocalMessageCache(store);
			const queue = JSON.stringify([]);
			store.setItem('gu.brazeMessageCache.EndOfArticle', queue);

			const m = cache.shift('EndOfArticle');

			expect(m).toBeUndefined();
		});
	});

	describe('push', () => {
		it('adds an item to the end of the queue', () => {
			const store = new FakeStore();
			const cache = new LocalMessageCache(store);
			const message1 = JSON.parse(message1Json);
			const queue = [message1];
			store.setItem(
				'gu.brazeMessageCache.EndOfArticle',
				JSON.stringify(queue),
			);

			const message2 = JSON.parse(message2Json);
			cache.push('EndOfArticle', message2);

			const newQueue = JSON.parse(
				store.getItem('gu.brazeMessageCache.EndOfArticle') as string,
			) as appboy.InAppMessage[];
			expect(newQueue).toEqual([message1, message2]);
		});

		it('lazily creates the queue if not already defined', () => {
			const store = new FakeStore();
			const cache = new LocalMessageCache(store);
			const message = JSON.parse(message1Json);

			cache.push('EndOfArticle', message);

			const newQueue = JSON.parse(
				store.getItem('gu.brazeMessageCache.EndOfArticle') as string,
			) as appboy.InAppMessage[];
			expect(newQueue).toEqual([message]);
		});
	});

	describe('clear', () => {
		it('wipes all queues', () => {
			const store = new FakeStore();
			const cache = new LocalMessageCache(store);
			const message1 = JSON.parse(message1Json);
			const queue = [message1];
			store.setItem(
				'gu.brazeMessageCache.EndOfArticle',
				JSON.stringify(queue),
			);
			store.setItem('gu.brazeMessageCache.Banner', JSON.stringify(queue));

			cache.clear();

			expect(cache.peek('EndOfArticle')).toBeUndefined();
			expect(cache.peek('Banner')).toBeUndefined();
		});
	});
});
