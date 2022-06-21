import { css } from '@emotion/react';
import { neutral, space } from '@guardian/source-foundations';
import {
	Button,
	InlineError,
	InlineSuccess,
	SvgReload,
	SvgSpinner,
} from '@guardian/source-react-components';
import type { ReactEventHandler } from 'react';
import { useEffect, useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

type Props = {
	styles: string;
	html: string;
	newsletterId: string;
};

const failStateAdvice = 'Please try again or contact userhelp@theguardian.com.';

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

const postFormData = async (
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
	const recaptchaRef = useRef<ReCAPTCHA>(null);

	const [iframeHeight, setIFrameHeight] = useState<number>(0);
	const [isWaitingForResponse, setIsWaitingForResponse] =
		useState<boolean>(false);
	const [captchaSiteKey, setCaptchaSiteKey] = useState<string>('');
	const [responseText, setResponseText] = useState<string | undefined>(
		undefined,
	);
	const [responseOk, setResponseOk] = useState<boolean | undefined>(
		undefined,
	);
	const [captchaError, setCaptchaError] = useState<string | undefined>(
		undefined,
	);

	const hasResponse = typeof responseOk === 'boolean';

	const submitForm = async (token: string): Promise<void> => {
		const { current: iframe } = iframeRef;
		const input: HTMLInputElement | null =
			iframe?.contentDocument?.querySelector('input[type="email"]') ??
			null;
		const emailAddress: string = input?.value ?? '';

		const response = await postFormData(
			window.guardian.config.page.ajaxUrl + '/email',
			buildFormData(emailAddress, newsletterId, token),
		);
		const text = await response.text();
		setIsWaitingForResponse(false);
		setResponseText(text);
		setResponseOk(response.ok);
	};

	const resetForm: ReactEventHandler<HTMLButtonElement> = () => {
		setCaptchaError(undefined);
		setResponseOk(undefined);
		setResponseText(undefined);
		recaptchaRef.current?.reset();
	};

	const handleCaptchaError: ReactEventHandler<HTMLDivElement> = (event) => {
		console.warn('handleCaptchaError', event);
		setCaptchaError(
			`Sorry, the reCAPTCHA failed to load. ${failStateAdvice}`,
		);
		recaptchaRef.current?.reset();
	};

	const handleCaptchaComplete = (token: string | null) => {
		if (!token) {
			return;
		}

		setIsWaitingForResponse(true);
		submitForm(token).catch((error) => {
			console.error(error);
			setCaptchaError('submitForm ERROR');
		});
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

	const handleClickInIFrame = (event: MouseEvent): void => {
		console.log('click', event);
	};
	const handleSubmitInIFrame = (event: SubmitEvent): void => {
		event.preventDefault();
		if (isWaitingForResponse) {
			return;
		}
		setCaptchaError(undefined);
		recaptchaRef.current?.execute();
	};

	const attachListenersToIframe = () => {
		const { current: iframe } = iframeRef;
		iframe?.contentWindow?.addEventListener('resize', resetIframeHeight);
		const form = iframe?.contentDocument?.querySelector('form');
		const button = iframe?.contentDocument?.querySelector('button');
		button?.addEventListener('click', handleClickInIFrame);
		form?.addEventListener('submit', handleSubmitInIFrame);
	};

	// read siteKey
	useEffect(() => {
		setCaptchaSiteKey(
			window.guardian.config.page.googleRecaptchaSiteKey ?? '',
		);
	}, []);

	return (
		<>
			<iframe
				ref={iframeRef}
				css={css`
					width: 100%;
					min-height: 90px;
					overflow: hidden;
				`}
				style={{
					height: iframeHeight,
					display:
						hasResponse || isWaitingForResponse ? 'none' : 'block',
				}}
				srcDoc={`
				<html>
					<head>
						${styles}
					</head>
					<body style="margin: 0;">${html}</body>
				</html>`}
				onLoad={attachListenersToIframe}
			/>

			{isWaitingForResponse && (
				<div>
					<SvgSpinner isAnnouncedByScreenReader={true} size="small" />
				</div>
			)}

			{captchaError && <InlineError>{captchaError}</InlineError>}

			{hasResponse &&
				(responseOk ? (
					<div>
						<InlineSuccess>{responseText}</InlineSuccess>
					</div>
				) : (
					<div
						css={css`
							display: flex;
							align-items: flex-start;
							button {
								margin-left: ${space[1]}px;
								background-color: ${neutral[0]};
								:hover {
									background-color: ${neutral[20]};
								}
							}
						`}
					>
						<InlineError>
							Sign up failed: {responseText}. {failStateAdvice}
						</InlineError>
						<Button
							size="small"
							icon={<SvgReload />}
							iconSide={'right'}
							onClick={resetForm}
						>
							Try again
						</Button>
					</div>
				))}

			{captchaSiteKey && (
				<div
					css={css`
						.grecaptcha-badge {
							visibility: hidden;
						}
					`}
				>
					<ReCAPTCHA // TO DO - EXPIRED AND ERROR callbacks
						sitekey={captchaSiteKey}
						ref={recaptchaRef}
						onChange={handleCaptchaComplete}
						onError={handleCaptchaError}
						size="invisible"
					/>
				</div>
			)}
		</>
	);
};
