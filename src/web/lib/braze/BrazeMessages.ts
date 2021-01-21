type Callback = (message: OurMessage) => void;

type Extras = Record<string, any>;

interface Appboy {
	subscribeToInAppMessage: (callback: Callback) => string;
}

interface Message {
	extras?: Extras;
	triggerId?: string; // This keeps Typescript happy, because Message could be an InAppMessage or a ControlMessage
	duration?: any;
	dismissType?: any;
	animateIn?: any;
	animateOut?: any;
	closeMessage?: any;
	removeAllSubscriptions?: any;
	removeSubscription?: any;
	subscribeToClickedEvent?: any;
	subscribeToDismissedEvent?: any;
}

type OurMessage = OurInAppMessage | OurControlMessage;
interface OurInAppMessage {
	message?: string;
	extras: Record<string, any>;
	triggerId?: string;
	duration: any;
	dismissType: 'AUTO_DISMISS' | 'SWIPE';
	animateIn: boolean;
	animateOut: boolean;
	htmlId?: string;
	css?: string;
	closeMessage(): void;
	removeAllSubscriptions(): void;
	removeSubscription(subscriptionGuid: string): void;
	subscribeToClickedEvent(subscriber: () => void): string;
	subscribeToDismissedEvent(subscriber: () => void): string;
}

interface OurControlMessage {
	triggerId?: string;
	extras?: Record<string, any>;
}

class BrazeMessages {
	// emitter: Emitter;
	appboy: Appboy;

	constructor(appboy: Appboy) {
		this.appboy = appboy;
	}

	private getMessagesForSlot(
		targetSlotName: string,
	): Promise<OurInAppMessage> {
		return new Promise((resolve) => {
			const callback = (message: OurMessage) => {
				const { extras } = message;

				if (
					extras &&
					extras.slotName &&
					extras.slotName === targetSlotName
				) {
					resolve(message as OurInAppMessage);
				}
			};

			this.appboy.subscribeToInAppMessage(callback);
		});
	}

	getMessagesForBanner(): Promise<OurInAppMessage> {
		return this.getMessagesForSlot('Banner');
	}

	getMessagesForEndOfArticle(): Promise<OurInAppMessage> {
		return this.getMessagesForSlot('EndOfArticle');
	}
}

export { BrazeMessages, Message, Callback, OurInAppMessage };
