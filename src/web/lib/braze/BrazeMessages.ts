/* eslint-disable max-classes-per-file */

import type appboy from '@braze/web-sdk-core';

type Extras = Record<string, string>;

interface BrazeMessagesInterface {
	getMessageForBanner: () => Promise<BrazeMessage>;
	getMessageForEndOfArticle: () => Promise<BrazeMessage>;
}

class BrazeMessage {
	appboy: typeof appboy;

	message: appboy.InAppMessage;

	constructor(message: appboy.InAppMessage, appboyInstance: typeof appboy) {
		this.message = message;
		this.appboy = appboyInstance;
	}

	logImpression() {
		this.appboy.logInAppMessageImpression(this.message);
	}

	logButtonClick(internalButtonId: number) {
		const button = new this.appboy.InAppMessageButton(
			`Button: ID ${internalButtonId}`,
			undefined,
			undefined,
			undefined,
			undefined,
			undefined,
			internalButtonId,
		);
		this.appboy.logInAppMessageButtonClick(button, this.message);
	}

	get extras(): Extras | undefined {
		return this.message.extras;
	}
}

class BrazeMessages implements BrazeMessagesInterface {
	appboy: typeof appboy;

	bannerMessage: Promise<BrazeMessage>;

	endOfArticleMessage: Promise<BrazeMessage>;

	constructor(appboyInstance: typeof appboy) {
		this.appboy = appboyInstance;
		this.bannerMessage = this.getMessageForSlot('Banner');
		this.endOfArticleMessage = this.getMessageForSlot('EndOfArticle');
	}

	private getMessageForSlot(targetSlotName: string): Promise<BrazeMessage> {
		return new Promise((resolve) => {
			const callback = (
				m: appboy.InAppMessage | appboy.ControlMessage,
			) => {
				// Cast this as we only ever expect it to be an InAppMessage
				const message = m as appboy.InAppMessage;
				const { extras } = message;

				if (
					extras &&
					extras.slotName &&
					extras.slotName === targetSlotName
				) {
					resolve(new BrazeMessage(message, this.appboy));
				}
			};

			this.appboy.subscribeToInAppMessage(callback);
		});
	}

	getMessageForBanner(): Promise<BrazeMessage> {
		return this.bannerMessage;
	}

	getMessageForEndOfArticle(): Promise<BrazeMessage> {
		return this.endOfArticleMessage;
	}
}

export { BrazeMessages, BrazeMessagesInterface, BrazeMessage };
