import { log } from '@guardian/libs';
import { useCallback, useEffect, useState } from 'react';
import type { Output } from 'valibot';
import { literal, number, object, safeParse, variant } from 'valibot';

type Props = {
	id: string;
};

type InteractiveMessage = Output<typeof interactiveMessageSchema>;
const interactiveMessageSchema = variant('kind', [
	object({
		kind: literal('interactive:scroll'),
		scroll: number(),
	}),
	object({
		kind: literal('interactive:height'),
		height: number(),
	}),
]);

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
	const [height, setHeight] = useState(0);

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

		setHeight(container.clientHeight);

		const scrollListener = () => {
			const rect = container.getBoundingClientRect();
			if (rect.top > 0) return setScroll(0);
			if (rect.top < -rect.height) return setScroll(1);
			setScroll(-rect.top);
		};

		const messageListener = (event: MessageEvent<unknown>) => {
			if (event.source !== iframe.contentWindow) return;

			const result = safeParse(interactiveMessageSchema, event.data);

			if (!result.success) return;

			switch (result.output.kind) {
				case 'interactive:height': {
					setHeight(result.output.height);
					return;
				}
				case 'interactive:scroll': {
					log('dotcom', '📜 scrolly', { container });
					iframe.classList.add('scrolly');
					return;
				}
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

	useEffect(() => {
		if (!container) return;
		container.style.height = `${height}px`;
		postMessage({ kind: 'interactive:height', height });
	}, [postMessage, height, container]);

	return null;
};
