/* eslint-disable class-methods-use-this */
/* eslint-disable max-classes-per-file */

import type appboy from '@braze/web-sdk-core';
import { storage } from '@guardian/libs';
import { SlotName, SlotNames } from './types';

const localStorageKeyBase = 'gu.brazeMessageCache';
export const millisecondsBeforeExpiry = 1000 * 60 * 60 * 24; // 24 hours: 60 seconds * 60 minutes

type Message = appboy.InAppMessage;

type MessageWithId = {
	id: string;
	message: Message;
};

type CachedMessage = {
	message: {
		id: string;
		message: Record<string, any>; // From the serialized JSON
	};
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

const readQueue = (slotName: SlotName): CachedMessage[] => {
	const key = keyFromSlotName(slotName);
	const queue = storage.local.get(key);

	if (Array.isArray(queue)) {
		return queue;
	}

	return [];
};

const hydrateMessage = (
	messageData: Record<string, any>,
	appboyInstance: typeof appboy,
): appboy.InAppMessage => {
	/* eslint-disable @typescript-eslint/no-unsafe-member-access */
	const hydratedMessage = new appboyInstance.HtmlMessage(
		messageData.message as string,
		messageData.extras,
		messageData.campaignId,
		messageData.cardId,
		messageData.triggerId,
		messageData.dismissType,
		messageData.duration,
		messageData.animateIn,
		messageData.animateOut,
		messageData.frameColor,
		messageData.htmlId,
		messageData.css,
		messageData.messageFields,
	);
	/* eslint-enable @typescript-eslint/no-unsafe-member-access */

	return hydratedMessage;
};

const isValid = (m: CachedMessage): boolean => {
	return (
		m?.expires &&
		Number.isFinite(m?.expires) &&
		m?.message?.id &&
		m?.message?.message?.triggerId &&
		m?.message?.message?.extras
	);
};

const getQueue = (slotName: SlotName): CachedMessage[] => {
	const queue = readQueue(slotName);
	const validQueue = queue.filter((i) => isValid(i));
	const unexpiredQueue = validQueue.filter((i) => hasNotExpired(i));

	if (queue.length !== unexpiredQueue.length) {
		setQueue(slotName, unexpiredQueue);
	}

	return unexpiredQueue;
};

interface MessageCache {
	peek: (
		slotName: SlotName,
		appboyInstance: typeof appboy,
	) => MessageWithId | undefined;
	remove: (slotName: SlotName, id: string) => boolean;
	push: (slotName: SlotName, message: MessageWithId) => boolean;
	clear: () => void;
}

class LocalMessageCache {
	static peek(
		slotName: SlotName,
		appboyInstance: typeof appboy,
	): MessageWithId | undefined {
		const queue = getQueue(slotName);
		const topItem = queue[0];

		if (topItem) {
			return {
				id: topItem.message.id,
				message: hydrateMessage(
					topItem.message.message,
					appboyInstance,
				),
			};
		}
	}

	static remove(slotName: SlotName, id: string): boolean {
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

type InMemoryCachedMessage = {
	message: MessageWithId;
	expires: number; // Expiry date in Unix time
};

const inMemoryQueue: Record<SlotName, InMemoryCachedMessage[]> = {
	EndOfArticle: [],
	Banner: [],
};

// Until we're ready to turn caching on we can use this as a swap in replacement
// for LocalMessageCache.
class InMemoryCache {
	static peek(slotName: SlotName): MessageWithId | undefined {
		const unexpiredMessages = inMemoryQueue[slotName].filter((i) =>
			hasNotExpired(i),
		);
		return unexpiredMessages[0]?.message;
	}

	static remove(slotName: SlotName, id: string): boolean {
		const idx = inMemoryQueue[slotName].findIndex(
			(i) => i.message.id === id,
		);

		if (idx >= 0) {
			const removedItem = inMemoryQueue[slotName].splice(idx, 1);

			if (removedItem) {
				return true;
			}
		}

		return false;
	}

	static push(slotName: SlotName, message: MessageWithId): boolean {
		if (inMemoryQueue[slotName].length < MAX_QUEUE_SIZE) {
			const expires = Date.now() + millisecondsBeforeExpiry;

			const messageToCache = {
				message,
				expires,
			};

			inMemoryQueue[slotName].push(messageToCache);

			return true;
		}

		return false;
	}

	static clear() {
		// eslint-disable-next-line guard-for-in
		for (const slotName in SlotNames) {
			inMemoryQueue[slotName as SlotName] = [];
		}
	}
}

export {
	LocalMessageCache,
	CachedMessage,
	InMemoryCache,
	MessageCache,
	setQueue,
	hydrateMessage,
};
