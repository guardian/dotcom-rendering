type NewsletterHeightEventType = { source: MessageEventSource; origin: string };
type MessageType = {
	type: string;
	value: string;
};

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
		if (
			!allowedOrigins.includes(
				(event as NewsletterHeightEventType).origin,
			)
		)
			return;

		const iframes: HTMLIFrameElement[] = allIframes.filter((i) => {
			try {
				return (
					i.contentWindow ===
					(event as NewsletterHeightEventType).source
				);
			} catch (e) {
				return false;
			}
		});
		if (iframes.length !== 0) {
			try {
				const message: MessageType = JSON.parse(
					event.data,
				) as MessageType;
				switch (message.type) {
					case 'set-height': {
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
