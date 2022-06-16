import { useEffect, useRef, useState } from 'react';

export type CaptchaIframeWindow = Window & {
	grecaptcha?: {
		execute: { (): void };
		render: {
			(el: Element | null, config: Record<string, unknown>): void;
		};
	};
	openCaptcha: { (): void };
	onCaptchaError: { (): void };
	onCaptchaExpired: { (): void };
	loadOrOpenCaptcha: { (): void };
	onCaptchaCompleted: { (): void };
	sendResizeMessage: { (height?: number): void };
	onRecaptchaScriptLoaded: { (): void };
};

interface IframeRequest {
	request: string;
	height?: number;
}

function iframeScript(iframeWindow: CaptchaIframeWindow) {
	iframeWindow.openCaptcha = function openCaptcha() {
		iframeWindow.sendResizeMessage(500);
		// sendTrackingForCaptchaOpen();
		iframeWindow.grecaptcha?.execute();
	};

	iframeWindow.loadOrOpenCaptcha = function loadOrOpenCaptcha() {
		if (!iframeWindow.grecaptcha) {
			(function (d: Document) {
				const script = d.createElement('script');
				script.type = 'text/javascript';
				script.async = true;
				script.defer = true;
				script.src =
					'https://www.google.com/recaptcha/api.js?onload=onRecaptchaScriptLoaded&render=explicit';
				d.getElementsByTagName('head')[0].appendChild(script);
			})(document);
		} else {
			iframeWindow.openCaptcha();
		}
	};

	iframeWindow.sendResizeMessage = function sendResizeMessage(
		height?: number,
	) {
		const payload = {
			request: 'resize_iframe',
			height: height,
		};
		iframeWindow.postMessage(payload, '*');
	};

	iframeWindow.onRecaptchaScriptLoaded = function onRecaptchaScriptLoaded() {
		const captchaContainer = document.querySelector(
			'.grecaptcha_container',
		);
		const siteKey = iframeWindow.parent.guardian.config.page
			.googleRecaptchaSiteKey as string;

		iframeWindow.grecaptcha?.render(captchaContainer, {
			sitekey: siteKey,
			callback: iframeWindow.onCaptchaCompleted,
			'error-callback': iframeWindow.onCaptchaError,
			'expired-callback': iframeWindow.onCaptchaExpired,
			size: 'invisible',
		});
		iframeWindow.openCaptcha();
	};

	iframeWindow.onCaptchaCompleted = function onCaptchaCompleted() {
		iframeWindow.sendResizeMessage();
		// sendTrackingForFormSubmission();
		document.querySelector('form')?.submit();
	};

	iframeWindow.onCaptchaError = function onCaptchaError() {
		// sendTrackingForCaptchaError();
		console.warn('onCaptchaError');
		iframeWindow.sendResizeMessage();
	};

	iframeWindow.onCaptchaExpired = function onCaptchaExpired() {
		// sendTrackingForCaptchaExpire();
		iframeWindow.sendResizeMessage();
	};
}

function validateMessage(data: unknown): IframeRequest | null {
	if (!data || typeof data !== 'object') {
		return null;
	}

	const message = data as IframeRequest;
	if (typeof message.request !== 'string') {
		return null;
	}
	return message;
}

type Props = {
	styles: string;
	html: string;
};

export const SecureSignupIframe = ({ styles, html }: Props) => {
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

		const iframeWindow = iframe.contentWindow as CaptchaIframeWindow;
		const button = iframe.contentDocument.querySelector('button');
		const form = iframe.contentDocument.querySelector('form');

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
		const iframeScript = ${iframeScript.toString()};
		iframeScript(window);
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
