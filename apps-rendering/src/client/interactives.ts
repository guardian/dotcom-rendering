import { isObject } from 'lib';
import { logger } from 'logger';

function handleMessage(interactive: HTMLIFrameElement, message: string): void {
	try {
		const parsed: unknown = JSON.parse(message);
		if (isObject(parsed) && parsed.type === 'set-height') {
			if (typeof parsed.value === 'string') {
				interactive.height = parsed.value;
			} else if (typeof parsed.value === 'number') {
				interactive.height = `${parsed.value}`;
			}
		}
	} catch (e) {
		logger.error('Unable to handle the message', e);
	}
}

const updateInteractives =
	(interactives: Element[]) =>
	({ data, source }: MessageEvent): void =>
		interactives.forEach((elem) => {
			if (
				elem instanceof HTMLIFrameElement &&
				source === elem.contentWindow
			) {
				handleMessage(elem, data);
			}
		});

function interactives(): void {
	const interactives = Array.from(
		document.querySelectorAll('.interactive iframe'),
	);
	window.addEventListener('message', updateInteractives(interactives), false);
}

export default interactives;
