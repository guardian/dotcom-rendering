import { css } from '@emotion/react';
import { space } from '@guardian/source-foundations';
import { Hide } from '@guardian/source-react-components';
import { EditorialButton } from '@guardian/source-react-components-development-kitchen';
import { useCallback, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { isServer } from '../lib/isServer';

type ToastProps = {
	count: number;
	onClick: () => void;
	format: ArticleFormat;
};

/** This icon will be added to Source at a subsequent time */
const SvgReload = ({ size }: { size: 12 | 16 | 18 | 24 | 26 | 28 | 30 }) => {
	const tight = size <= 24;
	const padding = tight ? 0 : (size - 24) / 2;
	return (
		<svg
			viewBox={
				tight ? '0 0 24 24' : `-${padding} -${padding} ${size} ${size}`
			}
			width={size}
			height={size}
		>
			<path d="M11.588 1a10.928 10.928 0 0 0-9.046 4.786l.126.676.877.527.676-.176C5.85 4.508 8.506 2.98 11.588 2.98c4.936 0 8.995 4.059 8.995 9.045 0 4.961-4.059 8.995-8.995 8.995-2.832 0-5.262-1.252-6.94-3.257l3.632-.601v-1.253H1.866l-.476.476V23h1.227l.627-3.784C5.248 21.546 8.205 23 11.588 23c6.089 0 11.025-4.911 11.025-10.975A11.01 11.01 0 0 0 11.588 1Z" />
		</svg>
	);
};

/**
 * A button to scroll to the top when new content exists.
 *
 * This element is rendered using a Portal into the `toast-root` div. This
 * root div has position: sticky
 */
export const Toast = ({ count, onClick, format }: ToastProps) => {
	return (
		<div
			css={css`
				position: absolute;
				top: ${space[2]}px;
			`}
			data-cy="toast"
		>
			<Hide above="phablet">
				<EditorialButton
					size="xsmall" // <-- Mobile version is xsmall
					onClick={onClick}
					format={format}
					icon={<SvgReload size={30} />}
				>
					{' '}
					new updates available
				</EditorialButton>
			</Hide>
			<Hide below="phablet">
				<EditorialButton
					size="small" // <-- Desktop version is small
					onClick={onClick}
					format={format}
					icon={<SvgReload size={30} />}
				>
					new updates available
				</EditorialButton>
			</Hide>
		</div>
	);
};

type Props = {
	format: ArticleFormat;
	webURL: string;
	channel: string;
};

const toastRoot: Element | null = !isServer
	? window.document.getElementById('toast-root')
	: null;

export const LiveUpdateToast = ({ format, webURL, channel }: Props) => {
	const [showToast, setShowToast] = useState(false);
	console.log('WEBSOCKET', channel);

	useEffect(() => {
		console.log('WEBSOCKET::: inside use effect');
		const socket = new WebSocket(
			`wss://gu-fanout.edgecompute.app/${channel}`,
		);

		// WebSocket event listeners
		socket.onopen = (e) => {
			console.log('WebSocket connection established.', e);
		};

		socket.onmessage = (event) => {
			console.log('WEBSOCKET::: Received message:', event.data);
			setShowToast(true);
		};

		socket.onclose = (event) => {
			if (event.wasClean) {
				console.log(
					`WebSocket connection closed cleanly, code=${event.code}, reason=${event.reason}`,
				);
			} else {
				console.error('WebSocket connection died');
			}
		};

		return () => {
			// Cleanup when the component unmounts
			socket.close();
		};
	}, []);

	const handleToastClick = useCallback(() => {
		const placeToScrollTo = 'maincontent';
		setShowToast(false);

		document.getElementById(placeToScrollTo)?.scrollIntoView({
			behavior: 'smooth',
		});

		// window.history.replaceState({}, '', `#${placeToScrollTo}`);
		// } else {
		window.location.href = `${webURL}#${placeToScrollTo}`;
		// }
	}, [webURL]);

	if (toastRoot && showToast) {
		/**
		 * Why `createPortal`?
		 *
		 * We use a Portal because of a the way different browsers implement `position: sticky`.
		 * A [stickily positioned element][] depends on its [containing block][] to determine
		 * when to become stuck.
		 *
		 * In Safari the containing block is set to the immediate parent
		 * whereas Chrome, Firefox and other browser are more forgiving.
		 *
		 * By using a Portal we can insert the Toast as a sibling to the Island, which works around
		 * Safari's behaviour.
		 *
		 * [stickily positioned element]: https://developer.mozilla.org/en-US/docs/Web/CSS/position#types_of_positioning
		 * [containing block]: https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block
		 */
		return ReactDOM.createPortal(
			<Toast onClick={handleToastClick} count={0} format={format} />,
			toastRoot,
		);
	}

	return null;
};
