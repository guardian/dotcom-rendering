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

class LocalMessageCache {
	store: Storage;

	constructor(store: Storage) {
		this.store = store;
	}

	shift(slotName: SlotName): CachedMessage | undefined {
		const key = keyFromSlotName(slotName);
		const queue = this.readQueue(key);
		const topItem = queue.shift();

		if (topItem) {
			const expired = topItem.expires < Date.now();
			if (expired) {
				return;
			}
			this.store.setItem(key, JSON.stringify(queue));
			return topItem;
		}
	}

	peek(slotName: SlotName): CachedMessage | undefined {
		const key = keyFromSlotName(slotName);
		const queue = this.readQueue(key);
		const topItem = queue.shift();

		if (topItem) {
			const expired = topItem.expires < Date.now();
			if (expired) {
				this.shift(slotName); // Remove top item
				return this.peek(slotName); // Re-call this function to check next value
			}

			return topItem;
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

		this.store.setItem(key, JSON.stringify(queue));
	}

	clear() {
		// eslint-disable-next-line guard-for-in
		for (const slotName in SlotNames) {
			const key = keyFromSlotName(slotName as SlotName);
			this.store.removeItem(key);
		}
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

export { LocalMessageCache };
