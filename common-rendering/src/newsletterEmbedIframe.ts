type NewsletterHeightEventType = { source: object; origin: string };

const allowedOrigins = ["https://www.theguardian.com"];
export default (selector: string) => (): Promise<void> => {
	const allIframes: HTMLIFrameElement[] = [].slice.call(
		document.querySelectorAll(selector)
	);

	// Tell the iframes to resize once this script is loaded
	// Otherwise, earlier resize events might be missed
	allIframes.forEach((iframe) => {
		iframe.contentWindow.postMessage("resize", "*");
	});

	window.addEventListener("message", (event) => {
		if (
			!allowedOrigins.includes(
				(event as NewsletterHeightEventType).origin
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
				const message: { [key: string]: string } = JSON.parse(
					event.data
				);
				switch (message.type) {
					case "set-height":
						const value = parseInt(message.value);
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
