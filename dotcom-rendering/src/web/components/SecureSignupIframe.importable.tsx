import { css } from '@emotion/react';
import { useEffect, useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

type Props = {
	styles: string;
	html: string;
	newsletterId: string;
};

const buildFormData = (
	emailAddress: string,
	newsletterId: string,
	token: string,
): FormData => {
	const pageRef = window.location.origin + window.location.pathname;
	const refViewId = window.guardian.ophan?.pageViewId ?? '';

	const formData = new FormData();
	formData.append('email', emailAddress);
	formData.append('csrfToken', ''); //TO DO - do we need this? how do we get it?
	formData.append('listName', newsletterId);
	formData.append('ref', pageRef);
	formData.append('refViewId', refViewId);
	formData.append('dummy', ''); //  TO DO -  find out if field is required by form handler
	if (window.guardian.config.switches.emailSignupRecaptcha) {
		formData.append('g-recaptcha-response', token); //  TO DO -  find out if field is required/allowed by form handler
	}

	return formData;
};

const submitForm = async (
	endpoint: string,
	formData: FormData,
): Promise<Response> => {
	const requestBodyStrings: string[] = [];

	formData.forEach((value, key) => {
		requestBodyStrings.push(
			`${encodeURIComponent(key)}=${encodeURIComponent(
				value.toString(),
			)}`,
		);
	});

	return fetch(endpoint, {
		method: 'POST',
		body: requestBodyStrings.join('&'),
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/x-www-form-urlencoded',
		},
	});
};

export const SecureSignupIframe = ({ styles, html, newsletterId }: Props) => {
	const iframeRef = useRef<HTMLIFrameElement>(null);

	const [iframeHeight, setIFrameHeight] = useState<number>(0);
	const [showCaptcha, setShowCaptcha] = useState<boolean>(false);
	const [formDisabled, setFormDisabled] = useState<boolean>(false);
	const [captchaSiteKey, setCaptchaSiteKey] = useState<string>('');

	const handleCaptchaComplete = async (token: string | null) => {
		if (!token) {
			return; // failed challenge? expired?
		}
		const { current: iframe } = iframeRef;
		const input: HTMLInputElement | null =
			iframe?.contentDocument?.querySelector('input[type="email"]') ??
			null;
		const emailAddress: string = input?.value ?? '';

		const endpoint = window.guardian.config.page.ajaxUrl + '/email';
		const formData = buildFormData(emailAddress, newsletterId, token);
		const response = await submitForm(endpoint, formData);

		console.log(response);
		const text = await response.text();
		console.log(text);
	};

	const resizeIframe = (requestedHeight = 0): void => {
		const { current: iframe } = iframeRef;
		if (!iframe) {
			return;
		}
		// verifiying the body is present before accessing the scrollHeight is necessary
		// iframe.contentDocument?.body.scrollHeight can cause a TypeError
		// the typing assumes body is always present on a Document but the use of
		// srcDoc seems to allow the document to exist without the body.

		const body = iframe.contentDocument?.body;
		const scrollHeight = body ? body.scrollHeight : 0;
		setIFrameHeight(Math.max(0, requestedHeight, scrollHeight + 15));
	};

	const resetIframeHeight = (): void => {
		resizeIframe();
	};

	const disableForm = (enable = false): void => {
		const { current: iframe } = iframeRef;
		const button = iframe?.contentDocument?.querySelector('button');
		const form = iframe?.contentDocument?.querySelector('form');
		const input = iframe?.contentDocument?.querySelector(
			'input[type="email"]',
		);

		setFormDisabled(!enable);

		if (enable) {
			button?.removeAttribute('disabled');
			input?.removeAttribute('disabled');
			form?.removeAttribute('disabled');
		} else {
			button?.setAttribute('disabled', 'TRUE');
			input?.setAttribute('disabled', 'TRUE');
			form?.setAttribute('disabled', 'TRUE');
		}
	};

	// add resize event listener to iframe window
	useEffect(() => {
		const { current: iframe } = iframeRef;

		if (iframe?.contentWindow) {
			iframe.contentWindow.addEventListener('resize', resetIframeHeight);
		}

		return () => {
			if (iframe?.contentWindow) {
				iframe.contentWindow.removeEventListener(
					'resize',
					resetIframeHeight,
				);
			}
		};
	});

	// initial resize
	useEffect(() => {
		const { current: iframe } = iframeRef;
		if (!iframe || !iframe.contentDocument) {
			return;
		}
		resizeIframe();
	});

	// read siteKey
	useEffect(() => {
		setCaptchaSiteKey(
			window.guardian.config.page.googleRecaptchaSiteKey ?? '',
		);
	}, []);

	// add event listeners to the iframe components
	useEffect(() => {
		const { current: iframe } = iframeRef;

		const handleClickInIFrame = (event: Event) => {
			console.log('click', event);
		};
		const handleSubmitInIFrame = (event: Event) => {
			event.preventDefault();
			disableForm(false);
			setShowCaptcha(true);
		};

		if (iframe?.contentDocument && iframe.contentWindow) {
			iframe.contentDocument
				.querySelector('button')
				?.addEventListener('click', handleClickInIFrame);
			iframe.contentDocument
				.querySelector('form')
				?.addEventListener('submit', handleSubmitInIFrame);
		}

		return () => {
			if (iframe?.contentDocument && iframe.contentWindow) {
				iframe.contentDocument
					.querySelector('button')
					?.removeEventListener('click', handleClickInIFrame);
				iframe.contentDocument
					.querySelector('form')
					?.removeEventListener('submit', handleSubmitInIFrame);
			}
		};
	});

	const srcDoc = `
	<html>
		<head>
			${styles}
		</head>
		<body style="margin: 0;">${html}</body>
	</html>`;

	return (
		<>
			<iframe
				ref={iframeRef}
				srcDoc={srcDoc}
				css={css`
					width: 100%;
					min-height: 90px;
					overflow: hidden;
				`}
				style={{
					height: iframeHeight,
					filter: formDisabled ? 'brightness(.25)' : undefined, // to do - add disabled styling srcDoc css
				}}
			/>
			{showCaptcha && (
				<div>
					<ReCAPTCHA
						sitekey={captchaSiteKey}
						onChange={handleCaptchaComplete}
					/>
				</div>
			)}
		</>
	);
};
