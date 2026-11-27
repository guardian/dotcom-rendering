import { log } from '@guardian/libs';
import { useEffect, useState } from 'react';
import { literal, number, object, safeParse, variant } from 'valibot';

type Props = {
	id: string;
};

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
 * Receives messages from interactive Atoms that want to behave as scrollies.
 *
 * - `interactive:scroll` – the atom opts in to scrolly mode. Its iframe gets
 *   the `scrolly` class, which pins it to the viewport (see `InteractiveAtom`).
 * - `interactive:height` – the atom's scroll length. The container is set to
 *   that height so there is room to scroll past the pinned iframe, and the
 *   height is echoed back so the atom knows we are listening.
 *
 * The atom tracks the page's scroll position itself (its srcdoc iframe is
 * same-origin), so we don't send it scroll positions.
 *
 * ## Why does this need to be an Island?
 *
 * It needs to update an adjoining `InteractiveAtom` in the browser
 */
export const InteractiveAtomMessenger = ({ id }: Props) => {
	const [iframe, setIframe] = useState<HTMLIFrameElement>();

	useEffect(() => {
		const found = document.querySelector<HTMLIFrameElement>(
			`iframe[id="${id}"]`,
		);
		if (found) setIframe(found);
	}, [id]);

	useEffect(() => {
		const container = iframe?.parentElement;
		if (!iframe || !container) return;

		const messageListener = (event: MessageEvent<unknown>) => {
			if (event.source !== iframe.contentWindow) return;

			const result = safeParse(interactiveMessageSchema, event.data);
			if (!result.success) return;

			switch (result.output.kind) {
				case 'interactive:scroll': {
					if (!iframe.classList.contains('scrolly')) {
						log('dotcom', '📜 scrolly', { container });
						iframe.classList.add('scrolly');
					}
					return;
				}
				case 'interactive:height': {
					const { height } = result.output;
					container.style.height =
						height > 0 ? `${height}px` : 'auto';
					// Echo back so the atom knows we are listening
					iframe.contentWindow?.postMessage(
						{ kind: 'interactive:height', height },
						'*',
					);
					return;
				}
			}
		};

		window.addEventListener('message', messageListener);
		return () => window.removeEventListener('message', messageListener);
	}, [iframe]);

	return null;
};
