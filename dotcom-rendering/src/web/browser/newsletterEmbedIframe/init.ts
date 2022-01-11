import '../webpackPublicPath';
import { startup } from '@root/src/web/browser/startup';

// No trailing slash!
const allowedOrigins = ['https://www.theguardian.com'];
const init = (): Promise<void> => {
	const allIframes: HTMLIFrameElement[] = [].slice.call(
		document.querySelectorAll('.email-sub__iframe'),
	);

	// Tell the iframes to resize once this script is loaded
	// Otherwise, earlier resize events might be missed
	// So we don't have to load this script as a priority on each load
	allIframes.forEach((iframe) => {
		if (iframe && iframe.contentWindow)
			iframe.contentWindow.postMessage(
				'resize',
				'https://www.theguardian.com',
			);
	});

	window.addEventListener('message', (event) => {
		if (!allowedOrigins.includes(event.origin)) return;

		const iframes: HTMLIFrameElement[] = allIframes.filter((i) => {
			try {
				if (i.contentWindow && event.source) {
					return i.contentWindow === event.source;
				}
			} catch (e) {
				return false;
			}
			return false;
		});
		if (iframes.length !== 0) {
			try {
				const message: { [key: string]: string } = JSON.parse(
					event.data,
				);
				switch (message.type) {
					case 'set-height':
						const value = parseInt(message.value, 10);
						if (!Number.isInteger(value)) return;

						iframes.forEach((iframe) => {
							iframe.height = `${value}`;
						});
						break;
					default:
				}
				// eslint-disable-next-line no-empty
			} catch (e) {}
		}
	});

	return Promise.resolve();
};

startup('newsletterEmbedIframe', null, init);
