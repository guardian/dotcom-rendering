import { useEffect, useRef, useState } from 'react';

type Props = { styles: string; html: string; js: string; messageKey: string };

type WindowWithCaptchaFunctions = Window & {
	loadOrOpenCaptcha: { (): void };
};

interface IframeRequest {
	messageKey: string;
	request: string;
	height?: number;
}

function validateMessage(
	data: unknown,
	messageKey: string,
): IframeRequest | null {
	if (!data || typeof data !== 'object') {
		return null;
	}

	const message = data as IframeRequest;

	if (typeof message.request !== 'string') {
		return null;
	}
	if (
		typeof message.messageKey !== 'string' ||
		message.messageKey !== messageKey
	) {
		return null;
	}
	return message;
}

export const SecureSignupIframe = ({ styles, html, js, messageKey }: Props) => {
	const iframeRef = useRef<HTMLIFrameElement>(null);

	const [iframeHeight, setIFrameHeight] = useState<number | undefined>(
		undefined,
	);

	useEffect(() => {
		const { current: iframe } = iframeRef;
		if (!iframe || !iframe.contentDocument) {
			return;
		}
		const refField =
			iframe.contentDocument.querySelector('input[name="ref"]');
		const refViewIdField = iframe.contentDocument.querySelector(
			'input[name="refViewId"]',
		);
		refField?.setAttribute(
			'value',
			window.location.origin + window.location.pathname,
		);
		refViewIdField?.setAttribute(
			'value',
			window.guardian.ophan?.pageViewId ?? '',
		);
	});

	useEffect(() => {
		const { current: iframe } = iframeRef;
		if (!iframe || !iframe.contentDocument || !iframe.contentWindow) {
			return;
		}
		const iframeWindow = iframe.contentWindow as WindowWithCaptchaFunctions;
		const button = iframe.contentDocument.querySelector('button');
		const form = iframe.contentDocument.querySelector('form');

		const handleMessageFromIframe = (message: MessageEvent) => {
			const validatedMessage = validateMessage(message.data, messageKey);
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
	}, [messageKey]);

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
