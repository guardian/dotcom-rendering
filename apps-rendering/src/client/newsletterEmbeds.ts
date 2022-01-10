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
				const message = JSON.parse(event.data);
				if (!message) return;
				if (typeof message.type !== 'string') return;

				switch (message.type) {
					case 'set-height': {
						if (
							typeof message.value !== 'number' &&
							typeof message.value !== 'string'
						)
							return;

						const value = parseInt(message.value, 10);
						if (!Number.isInteger(value)) return;

						iframes.forEach((iframe) => {
							iframe.height = `${value}`;
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
