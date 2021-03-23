import { BrazeMessagesInterface } from './BrazeMessages';

export class NullBrazeMessages implements BrazeMessagesInterface {
	// eslint-disable-next-line class-methods-use-this
	getMessageForBanner() {
		return Promise.reject(new Error('No banner message'));
	}

	// eslint-disable-next-line class-methods-use-this
	getMessageForEndOfArticle() {
		return Promise.reject(new Error('No end of article message'));
	}
}
