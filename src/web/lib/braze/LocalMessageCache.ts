import type appboy from '@braze/web-sdk-core';
import { storage } from '@guardian/libs';
import { SlotName, SlotNames } from './BrazeMessages';

const localStorageKeyBase = 'gu.brazeMessageCache';
export const millisecondsBeforeExpiry = 1000 * 60 * 60 * 24; // 24 hours: 60 seconds * 60 minutes

type Message = appboy.InAppMessage;

type MessageWithId = {
	id: string;
	message: Message;
};

type CachedMessage = {
	message: MessageWithId;
	expires: number; // Expiry date in Unix time
};

const MAX_QUEUE_SIZE = 2;

const keyFromSlotName = (slotName: SlotName): string =>
	`${localStorageKeyBase}.${slotName}`;

const hasNotExpired = (cachedMessage: CachedMessage) =>
	cachedMessage.expires > Date.now();

// setQueue is effectively private, but it's useful to expose it publicly
// so that we can use it in the tests
const setQueue = (slotName: SlotName, queue: CachedMessage[]) => {
	const key = keyFromSlotName(slotName);
	storage.local.set(key, queue);
};

const readQueue = (slotName: SlotName) => {
	const key = keyFromSlotName(slotName);
	const queue = storage.local.get(key);

	if (Array.isArray(queue)) {
		return queue;
	}

	return [];
};

const getQueue = (slotName: SlotName): CachedMessage[] => {
	const queue = readQueue(slotName);
	const unexpiredQueue = queue.filter((i) => hasNotExpired(i));

	if (queue.length !== unexpiredQueue.length) {
		setQueue(slotName, unexpiredQueue);
	}

	return unexpiredQueue;
};

class LocalMessageCache {
	static peek(slotName: SlotName): MessageWithId | undefined {
		const queue = getQueue(slotName);
		const topItem = queue.shift();

		if (topItem) {
			return topItem.message;
		}
	}

	static remove(slotName: SlotName, id: string): boolean | undefined {
		const queue = getQueue(slotName);
		const idx = queue.findIndex((i) => i.message.id === id);

		if (idx >= 0) {
			const removedItem = queue.splice(idx, 1);

			if (removedItem) {
				setQueue(slotName, queue);
				return true;
			}
		}

		return false;
	}

	static push(slotName: SlotName, message: MessageWithId): boolean {
		const queue = getQueue(slotName);

		if (queue.length < MAX_QUEUE_SIZE) {
			const expires = Date.now() + millisecondsBeforeExpiry;

			const messageToCache: CachedMessage = {
				message,
				expires,
			};

			queue.push(messageToCache);

			setQueue(slotName, queue);
			return true;
		}

		return false;
	}

	static clear() {
		// eslint-disable-next-line guard-for-in
		for (const slotName in SlotNames) {
			const key = keyFromSlotName(slotName as SlotName);
			storage.local.remove(key);
		}
	}
}

export { LocalMessageCache, CachedMessage, setQueue };
