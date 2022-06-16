import { useEffect, useRef, useState } from 'react';

type Props = { styles: string; html: string; js: string };

type WindowWithCaptchaFunctions = Window & {
	loadOrOpenCaptcha: { (): void };
};

interface IframeRequest {
	request: string;
	height?: number;
}

function validateMessage(data: unknown): IframeRequest | null {
	if (!data || typeof data !== 'object') {
		return null;
	}

	const message = data as IframeRequest;

	if (typeof message.request === 'string') {
		return message;
	}

	return null;
}

export const SecureSignupIframe = ({ styles, html, js }: Props) => {
	const iframeRef = useRef<HTMLIFrameElement>(null);

	const [iframeHeight, setIFrameHeight] = useState<number | undefined>(
		undefined,
	);

	useEffect(() => {
		const { current: iframe } = iframeRef;
		if (!iframe || !iframe.contentDocument || !iframe.contentWindow) {
			return;
		}
		const iframeDocument = iframe.contentDocument;
		const iframeWindow = iframe.contentWindow as WindowWithCaptchaFunctions;
		const button = iframeDocument.querySelector('button');
		const form = iframeDocument.querySelector('form');

		const handleMessageFromIframe = (message: MessageEvent) => {
			const validatedMessage = validateMessage(message.data);
			if (!validatedMessage) {
				return;
			}
			if (validatedMessage.request === 'resize_iframe') {
				setIFrameHeight(validatedMessage.height);
			}
		};
		const handleClickInIFrame = (event: Event) => {
			console.log('click', event);
		};
		const handleSubmitInIFrame = (event: Event) => {
			event.preventDefault();
			iframeWindow.loadOrOpenCaptcha();
		};

		iframeWindow.addEventListener('message', handleMessageFromIframe);
		button?.addEventListener('click', handleClickInIFrame);
		form?.addEventListener('submit', handleSubmitInIFrame);
	}, []);

	const srcDoc = `
	<html>
		<head>
			${styles}
		</head>
		<body style="margin: 0;">${html}</body>
		<script>
		${js}
		</script>
	</html>`;

	return (
		<>
			<iframe
				ref={iframeRef}
				srcDoc={srcDoc}
				style={{ height: iframeHeight }}
			/>
		</>
	);
};
