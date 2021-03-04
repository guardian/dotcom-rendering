import type appboy from '@braze/web-sdk-core';
import { SlotName } from './BrazeMessages';

const localStorageKeyBase = 'gu.brazeMessageCache';

type Message = appboy.InAppMessage;

const keyFromSlotName = (slotName: SlotName): string =>
	`${localStorageKeyBase}.${slotName}`;

class LocalMessageCache {
	store: Storage;

	constructor(store: Storage) {
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

	push(slotName: SlotName, message: Message) {
		const key = keyFromSlotName(slotName);
		const queue = this.readQueue(key);

		queue.push(message);
		this.store.setItem(key, JSON.stringify(queue));
	}

	clear() {
		const allSlots: SlotName[] = ['Banner', 'EndOfArticle'];
		allSlots.forEach((s) => {
			const key = keyFromSlotName(s);
			this.store.removeItem(key);
		});
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
