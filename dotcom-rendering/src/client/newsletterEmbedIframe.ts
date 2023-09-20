import { isObject } from '@guardian/libs';

/* No trailing slash! */
const guardianOrigin = 'https://www.theguardian.com';

export const newsletterEmbedIframe = (): Promise<void> => {
	const allIframes: HTMLIFrameElement[] = [
		...document.querySelectorAll<HTMLIFrameElement>(
			'iframe.email-sub__iframe',
		),
	];

	if (allIframes.length === 0) return Promise.resolve();

	// Tell the iframes to resize once this script is loaded
	// Otherwise, earlier resize events might be missed
	// So we don't have to load this script as a priority on each load
	for (const iframe of allIframes) {
		iframe.contentWindow?.postMessage('resize', guardianOrigin);
	}

	window.addEventListener('message', (event) => {
		if (event.origin !== guardianOrigin) return;

		const iframes: HTMLIFrameElement[] = allIframes.filter((i) => {
			try {
				if (i.contentWindow !== null && event.source !== null) {
					return i.contentWindow === event.source;
				}
			} catch (e) {
				return false;
			}
			return false;
		});
		if (iframes.length !== 0) {
			try {
				const message: unknown = JSON.parse(event.data);
				if (!isObject(message) || typeof message.type !== 'string') {
					return;
				}

				switch (message.type) {
					case 'set-height':
						for (const iframe of iframes) {
							if (typeof message.value === 'number') {
								iframe.height = `${message.value}`;
							} else if (typeof message.value === 'string') {
								const value = parseInt(message.value, 10);
								if (Number.isInteger(value)) {
									iframe.height = `${value}`;
								}
							}
						}
						break;
					default:
				}
			} catch (e) {
				// do nothing
			}
		}
	});

	return Promise.resolve();
};
