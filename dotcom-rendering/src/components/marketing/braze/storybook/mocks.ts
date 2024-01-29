import type {
	FetchEmail,
	NewsletterSubscribeCallback,
} from '../types/dcrTypes';

export const mockSubscribe: NewsletterSubscribeCallback = (newsletterId) => {
	console.log(`subscribeToNewsletter invoked - ${newsletterId}`);
	return new Promise((resolve) => {
		setTimeout(() => {
			console.log(`subscribeToNewsletter resolved - ${newsletterId}`);
			resolve();
		}, 1000);
	});
};

export const mockFetchEmail: FetchEmail = () => {
	console.log(`fetchEmail invoked`);
	return new Promise((resolve) => {
		setTimeout(() => {
			console.log(`fetchEmail resolved`);
			resolve('some.person@example.com');
		}, 1000);
	});
};

export const mockFetchEmailFail: FetchEmail = () => {
	console.log(`fetchEmail invoked`);
	return new Promise((resolve) => {
		setTimeout(() => {
			console.log(`fetchEmail rejected`);
			resolve(null);
		}, 1000);
	});
};

type MockButtonClick = (id: number) => void;
export const mockButtonClick: MockButtonClick = (internalButtonId) => {
	console.log(`Button with internal ID ${internalButtonId} clicked`);
};

type MockComponentEvent = (e: { [key: string]: unknown }) => void;
export const mockComponentEvent: MockComponentEvent = (componentEvent) => {
	console.log('submitComponentEvent called with: ', componentEvent);
};
