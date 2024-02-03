import { isObject, log } from '@guardian/libs';
import { useCallback, useEffect, useState } from 'react';

type InteractiveMessage =
	| {
			kind: 'interactive:scroll';
			scroll: number;
	  }
	| {
			kind: 'interactive:height';
			height: number;
	  };

type Props = {
	id: string;
};

/**
 * Send and receive messages from interactive Atoms.
 *
 * Currently supported messages:
 * - `interactive:scroll`
 * - `interactive:height`
 *
 * ## Why does this need to be an Island?
 *
 * It needs to send information to an adjoining `InteractiveAtom`
 */
export const InteractiveAtomMessenger = ({ id }: Props) => {
	const [container, setContainer] = useState<HTMLDivElement>();
	const [iframe, setIframe] = useState<HTMLIFrameElement>();
	const [scroll, setScroll] = useState(0);

	const postMessage = useCallback(
		(message: InteractiveMessage) => {
			iframe?.contentWindow?.postMessage(message, '*');
		},
		[iframe],
	);

	useEffect(() => {
		const found = document.querySelector<HTMLIFrameElement>(
			`iframe[id="${id}"]`,
		);
		if (!found) return;

		setIframe(found);
	}, [id]);

	useEffect(() => {
		if (!(iframe?.parentElement instanceof HTMLDivElement)) return;

		setContainer(iframe.parentElement);
	}, [iframe]);

	useEffect(() => {
		if (!iframe) return;
		if (!container) return;

		log('dotcom', '📜', { container });

		const scrollListener = () => {
			const { top, height } = container.getBoundingClientRect();
			if (top > 0) return setScroll(0);
			if (top < -height) return setScroll(1);
			setScroll(-top);
		};

		const messageListener = (event: MessageEvent<unknown>) => {
			log('dotcom', '📜 received message', event.source, event.data);

			if (
				event.source === iframe.contentWindow &&
				isObject(event.data) &&
				'kind' in event.data &&
				event.data.kind === 'interactive:height' &&
				'height' in event.data &&
				typeof event.data.height === 'number'
			) {
				container.style.height = `${event.data.height}px`;
			}
		};

		window.addEventListener('scroll', scrollListener);
		window.addEventListener('message', messageListener);

		return () => {
			window.removeEventListener('scroll', scrollListener);
			window.removeEventListener('message', messageListener);
		};
	}, [iframe, container]);

	useEffect(() => {
		postMessage({ kind: 'interactive:scroll', scroll });
	}, [postMessage, scroll]);

	return null;
};
