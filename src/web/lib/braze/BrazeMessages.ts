// import { createNanoEvents, Emitter } from 'nanoevents';

type Callback = (message: Message) => void;

type Extras = Record<string, string>;

interface Appboy {
	subscribeToInAppMessage: (callback: Callback) => string;
}

interface Message {
	extras?: Extras;
	triggerId?: string; // This keeps Typescript happy, because Message could be an InAppMessage or a ControlMessage
}

class BrazeMessages {
	// emitter: Emitter;
	appboy: Appboy;

	constructor(appboy: Appboy) {
		this.appboy = appboy;
	}

	getMessagesForBanner(): Promise<Message> {
		return new Promise((resolve) => {
			const callback = (message: Message) => {
				const { extras } = message;

				if (extras && extras.slotName && extras.slotName === 'Banner') {
					resolve(message);
				}
			};

			this.appboy.subscribeToInAppMessage(callback);
		});
	}

	getMessagesForEndOfArticle(): Promise<Message> {
		return new Promise((resolve) => {
			const callback = (message: Message) => {
				const { extras } = message;

				if (
					extras &&
					extras.slotName &&
					extras.slotName === 'EndOfArticle'
				) {
					resolve(message);
				}
			};

			this.appboy.subscribeToInAppMessage(callback);
		});
	}
}

export { BrazeMessages, Message, Callback };
