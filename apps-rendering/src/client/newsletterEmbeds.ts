import { isObject } from 'lib';

const allowedOrigins = ['https://www.theguardian.com'];
export default (): Promise<void> => {
	const allIframes: HTMLIFrameElement[] = [].slice.call(
		document.querySelectorAll('.email-sub__iframe'),
	);

	// Tell the iframes to resize once this script is loaded
	// Otherwise, earlier resize events might be missed
	// So we don't have to load this script as a priority on each load
	allIframes.forEach((iframe) => {
		iframe.contentWindow?.postMessage(
			'resize',
			'https://www.theguardian.com',
		);
	});

	window.addEventListener('message', (event) => {
		if (!allowedOrigins.includes(event.origin)) return;

		const iframes: HTMLIFrameElement[] = allIframes.filter((i) => {
			try {
				return i.contentWindow === event.source;
			} catch (e) {
				return false;
			}
		});
		if (iframes.length !== 0) {
			try {
				const message: unknown = JSON.parse(event.data);
				if (!isObject(message) || typeof message.type !== 'string')
					return;

				switch (message.type) {
					case 'set-height': {
						iframes.forEach((iframe) => {
							if (typeof message.value === 'number') {
								iframe.height = `${message.value}`;
							} else if (typeof message.value === 'string') {
								const value = parseInt(message.value, 10);
								if (Number.isInteger(value)) {
									iframe.height = `${value}`;
								}
							}
						});

						break;
					}
					default:
				}
				// eslint-disable-next-line no-empty -- No action required
			} catch (e) {}
		}
	});

	return Promise.resolve();
};
