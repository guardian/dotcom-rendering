import type appboy from '@braze/web-sdk-core';
import { SlotName } from './BrazeMessages';

const localStorageKeyBase = 'gu.brazeMessageCache';

type Message = appboy.InAppMessage;

interface Store {
	getItem: (key: string) => string | null;
	setItem: (key: string, value: string) => void;
	removeItem: (key: string) => void;
}

const keyFromSlotName = (slotName: SlotName): string =>
	`${localStorageKeyBase}.${slotName}`;

class LocalMessageCache {
	store: Store;

	constructor(store: Store) {
		this.store = store;
	}

	shift(slotName: SlotName): Message | undefined {
		const key = keyFromSlotName(slotName);
		const queue = this.readQueue(key);
		const topItem = queue.shift();

		if (topItem) {
			this.store.setItem(key, JSON.stringify(queue));
			return topItem;
		}
	}

	peek(slotName: SlotName): Message | undefined {
		const key = keyFromSlotName(slotName);
		const queue = this.readQueue(key);
		const topItem = queue.shift();

		if (topItem) {
			return topItem;
		}
	}

	unshift(slotName: SlotName, message: Message) {
		const key = keyFromSlotName(slotName);
		const queue = this.readQueue(key);

		queue.unshift(message);
		this.store.setItem(key, JSON.stringify(queue));
	}

	push(slotName: SlotName, message: Message) {
		const key = keyFromSlotName(slotName);
		const queue = this.readQueue(key);

		queue.push(message);
		this.store.setItem(key, JSON.stringify(queue));
	}

	clear() {
		['Banner', 'SlotName'].forEach((s) => this.store.removeItem(s));
	}

	private readQueue(key: string): Message[] {
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
