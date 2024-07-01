import { css } from '@emotion/react';
import {
	isPlatformMessageEvent,
	isShareIconMessageEvent,
	MessageKind,
	pingEditionsNative,
	Platform,
} from '@guardian/renditions';
import type { PlatformMessage, ShareIconMessage } from '@guardian/renditions';
import type { ReactElement } from 'react';
import { useEffect, useState } from 'react';

const usePlatform = (defaultPlatform: Platform): Platform => {
	const [platform, setPlatform] = useState(defaultPlatform);

	const handlePlatform = (event: CustomEventInit<PlatformMessage>): void => {
		if (isPlatformMessageEvent(event)) {
			setPlatform(event.detail.value);
		}
	};

	useEffect(() => {
		document.addEventListener('editionsPing', handlePlatform);

		return (): void =>
			document.removeEventListener('editionsPing', handlePlatform);
	}, []);

	return platform;
};

const useShareIcon = (defaultShareIcon: boolean): boolean => {
	const [showIcon, setShowIcon] = useState(defaultShareIcon);

	const handleShare = (event: CustomEventInit<ShareIconMessage>): void => {
		if (isShareIconMessageEvent(event)) {
			setShowIcon(!!event.detail?.value);
		}
	};

	useEffect(() => {
		document.addEventListener('editionsPing', handleShare);

		return (): void =>
			document.removeEventListener('editionsPing', handleShare);
	}, []);

	return showIcon;
};

const IOSShareIcon = (): ReactElement => (
	<svg viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
		<circle cx="15" cy="15" r="14.5" />
		<path d="M14.2727 8.83636V15.1818H15.7273V8.83636L18.3273 10.8182L18.9818 10.1818L15.2545 6.45455H14.7455L11.0364 10.1818L11.6727 10.8182L14.2727 8.83636ZM21.5455 13.7273V19.5455H8.45455V13.7273L7.72727 13H7V20.2545L7.70909 21H22.2545L23 20.2545V13H22.2727L21.5455 13.7273Z" />
	</svg>
);

const AndroidShareIcon = (): ReactElement => (
	<svg viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
		<circle cx="15" cy="15" r="14.5" />
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M20.2 18.4666C21.6516 18.4666 22.7999 19.6366 22.7999 21.0666C22.7999 22.5183 21.6516 23.6666 20.2 23.6666C18.77 23.6666 17.6216 22.5183 17.6216 21.0666C17.6216 20.9583 17.6216 20.8283 17.6433 20.7416L9.88665 16.8633C9.38832 17.34 8.78166 17.5783 8.08832 17.5783C6.615 17.5783 5.46667 16.43 5.46667 15C5.46667 13.5483 6.615 12.3783 8.08832 12.3783C8.75999 12.3783 9.38832 12.6816 9.88665 13.1366L17.6433 9.25833C17.6216 9.17166 17.6216 9.06333 17.6216 8.91166C17.6216 7.48167 18.77 6.33334 20.2 6.33334C21.6516 6.33334 22.7999 7.48167 22.7999 8.91166C22.7999 10.3633 21.6516 11.5333 20.2 11.5333C19.5066 11.5333 18.9216 11.2517 18.4233 10.8183L10.645 14.675C10.6666 14.74 10.6666 14.8483 10.6666 15C10.6666 15.1516 10.6666 15.26 10.645 15.325L18.4233 19.1816C18.9216 18.7483 19.5066 18.4666 20.2 18.4666ZM20.2 7.37333C19.355 7.37333 18.64 8.045 18.64 8.91166C18.64 9.77832 19.355 10.4933 20.2 10.4933C21.0666 10.4933 21.7816 9.77832 21.7816 8.91166C21.7816 8.045 21.0666 7.37333 20.2 7.37333ZM20.2 22.6266C21.0666 22.6266 21.7816 21.9116 21.7816 21.0666C21.7816 20.2 21.0666 19.5066 20.2 19.5066C19.355 19.5066 18.64 20.2 18.64 21.0666C18.64 21.9116 19.355 22.6266 20.2 22.6266Z"
		/>
	</svg>
);

const hydratedButtonStyles = css`
	.share-button {
		background: none;
		border: none;
		padding: 0;
		height: 2.5rem;
		box-sizing: content-box;
	}
`;

const ShareIcon = () => {
	const platform = usePlatform(Platform.IOS);
	const showIcon = useShareIcon(true);

	useEffect(() => {
		pingEditionsNative({ kind: MessageKind.PlatformQuery });
	}, []);

	return showIcon ? (
		<div
			css={hydratedButtonStyles}
			className="js-share-button"
			role="button"
		>
			<button
				className="share-button"
				onClick={(): void =>
					pingEditionsNative({ kind: MessageKind.Share })
				}
			>
				{platform === Platform.IOS ? (
					<IOSShareIcon />
				) : (
					<AndroidShareIcon />
				)}
			</button>
		</div>
	) : null;
};

export default ShareIcon;
