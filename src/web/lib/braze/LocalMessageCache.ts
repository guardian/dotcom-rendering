import type appboy from '@braze/web-sdk-core';
import { SlotName, SlotNames } from './BrazeMessages';

const localStorageKeyBase = 'gu.brazeMessageCache';
export const millisecondsBeforeExpiry = 1000 * 60 * 60 * 24; // 24 hours: 60 seconds * 60 minutes

type Message = appboy.InAppMessage;
type CachedMessage = {
	message: Message;
	expires: number; // Expiry date in Unix time
};

const keyFromSlotName = (slotName: SlotName): string =>
	`${localStorageKeyBase}.${slotName}`;

const hasNotExpired = (cachedMessage: CachedMessage) =>
	cachedMessage.expires > Date.now();

class LocalMessageCache {
	store: Storage;

	constructor(store: Storage) {
		this.store = store;
	}

	shift(slotName: SlotName): Message | undefined {
		const key = keyFromSlotName(slotName);
		const queue = this.readQueue(key);
		const unexpiredQueue = queue.filter((i) => hasNotExpired(i));
		const topItem = unexpiredQueue.shift();

		if (topItem) {
			this.setQueue(slotName, unexpiredQueue);
			return topItem.message;
		}
	}

	peek(slotName: SlotName): Message | undefined {
		const key = keyFromSlotName(slotName);
		const queue = this.readQueue(key);
		const unexpiredQueue = queue.filter((i) => hasNotExpired(i));
		const topItem = unexpiredQueue.shift();

		if (topItem) {
			return topItem.message;
		}
	}

	push(slotName: SlotName, message: Message) {
		const key = keyFromSlotName(slotName);
		const queue = this.readQueue(key);
		const expires = Date.now() + millisecondsBeforeExpiry;

		const messageToCache: CachedMessage = {
			message,
			expires,
		};

		queue.push(messageToCache);

		this.setQueue(slotName, queue);
	}

	clear() {
		// eslint-disable-next-line guard-for-in
		for (const slotName in SlotNames) {
			const key = keyFromSlotName(slotName as SlotName);
			this.store.removeItem(key);
		}
	}

	// setQueue is effectively private, but it's useful to expose it publically
	// so that we can use it in the tests
	setQueue(slotName: SlotName, queue: CachedMessage[]) {
		const key = keyFromSlotName(slotName);
		this.store.setItem(key, JSON.stringify(queue));
	}

	private readQueue(key: string): CachedMessage[] {
		const q = this.store.getItem(key);

		if (q) {
			const queue = JSON.parse(q);

			if (Array.isArray(queue)) {
				return queue;
			}
		}

		return [];
	}
}

export { LocalMessageCache, CachedMessage };
