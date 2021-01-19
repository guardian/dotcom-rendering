import { createNanoEvents, Emitter } from 'nanoevents';

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
	emitter: Emitter;
	appboy: Appboy;

	constructor(appboy: Appboy) {
		this.appboy = appboy;
		this.emitter = createNanoEvents();

		const callback = (message: Message) => {
			const { extras } = message;

			if (extras && extras.slotName) {
				this.emitter.emit(extras.slotName, message);
			}
		};

		appboy.subscribeToInAppMessage(callback);
	}

	getMessagesFor(slotName: string): Promise<Message> {
		return new Promise((resolve) => {
			this.emitter.on(slotName, (data) => resolve(data));
		});
	}
}

export { BrazeMessages };
