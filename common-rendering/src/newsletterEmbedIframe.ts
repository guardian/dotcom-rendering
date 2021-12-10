type NewsletterHeightEventType = { source: object };

export default (selector: string) => (): Promise<void> => {
	const allIframes: HTMLIFrameElement[] = [].slice.call(
		document.querySelectorAll(selector)
	);

	window.addEventListener("message", (event) => {
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
				const message: { [key: string]: string } = JSON.parse(
					event.data
				);
				switch (message.type) {
					case "set-height":
						iframes.forEach((iframe) => {
							iframe.height = message.value;
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
