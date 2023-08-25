type HeightEventType = { source: { name: string } };

type Message = {
	type: string;
	value: string;
};

export const updateIframeHeight = (
	queryString: `iframe${string}`,
): Promise<void> => {
	const iframes = [
		...document.querySelectorAll<HTMLIFrameElement>(queryString),
	];

	if (iframes.length === 0) return Promise.resolve();

	window.addEventListener('message', (event) => {
		const iframe = iframes.find((i) => {
			try {
				return i.name === (event as HeightEventType).source.name;
			} catch (e) {
				return false;
			}
		});
		if (iframe) {
			try {
				// eslint-disable-next-line @typescript-eslint/no-unsafe-argument -- we’re in a try-catch
				const message = JSON.parse(event.data) as Message;
				switch (message.type) {
					case 'set-height':
						iframe.height = message.value;
						break;
					default:
				}
			} catch (e) {
				// do nothing
			}
		}
	});

	for (const iframe of iframes) {
		const src = (iframe.getAttribute('srcdoc') ?? '')
			.replace(/<gu-script>/g, '<script>')
			.replace(/<\/gu-script>/g, '<' + '/script>');
		iframe.setAttribute('srcdoc', src);
	}

	return Promise.resolve();
};
