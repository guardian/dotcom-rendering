import { css } from '@emotion/react';
import type { OphanAction } from '@guardian/libs';
import { neutral, space, until } from '@guardian/source-foundations';
import {
	Button,
	InlineError,
	InlineSuccess,
	Link,
	SvgReload,
	SvgSpinner,
} from '@guardian/source-react-components';
import type { ReactEventHandler } from 'react';
import { useRef, useState } from 'react';
// Note - the package also exports a component as a named export "ReCAPTCHA",
// that version will compile and render but is non-functional.
// Use the default export instead.
import ReactGoogleRecaptcha from 'react-google-recaptcha';
import {
	getOphanRecordFunction,
	submitComponentEvent,
} from '../client/ophan/ophan';
import { isServer } from '../lib/isServer';

// The Google documentation specifies that if the 'recaptcha-badge' is hidden,
// their T+C's must be displayed instead. While this component hides the
// badge, its parent must include the T+C along side it.
// The T+C are not included in this componet directly to reduce layout shift
// from the island hydrating (placeholder height for the text can't
// be accurately predicated for every breakpoint).
// https://developers.google.com/recaptcha/docs/faq#id-like-to-hide-the-recaptcha-badge.-what-is-allowed

type Props = {
	name: string;
	styles: string;
	html: string;
	newsletterId: string;
	successDescription: string;
};

// The ts.dom interface for FontFaceSet does not contain the .add method
type FontFaceSetWithAdd = FontFaceSet & {
	add?: { (font: FontFace): void };
};

const ErrorMessageWithAdvice = ({ text }: { text?: string }) => (
	<InlineError>
		<span>
			{text} Please try again or contact{' '}
			<Link
				href="mailto:customer.help@theguardian.com"
				target="_blank"
				rel="noreferrer"
			>
				customer.help@theguardian.com
			</Link>
		</span>
	</InlineError>
);

const SuccessMessage = ({ text }: { text?: string }) => (
	<InlineSuccess>
		<span>
			<b>Subscription Confirmed.&nbsp;</b>
			<span>{text}</span>
		</span>
	</InlineSuccess>
);

const buildFormData = (
	emailAddress: string,
	newsletterId: string,
	token: string,
): FormData => {
	const pageRef = window.location.origin + window.location.pathname;
	const refViewId = window.guardian.ophan?.pageViewId ?? '';

	const formData = new FormData();
	formData.append('email', emailAddress);
	formData.append('csrfToken', ''); // TO DO - PR on form handlers in frontend/identity to see how/if this is needed
	formData.append('listName', newsletterId);
	formData.append('ref', pageRef);
	formData.append('refViewId', refViewId);
	formData.append('name', '');
	if (window.guardian.config.switches.emailSignupRecaptcha) {
		formData.append('g-recaptcha-response', token); // TO DO - PR on form handlers - is the token verified?
	}

	return formData;
};

const postFormData = async (
	endpoint: string,
	formData: FormData,
): Promise<Response> => {
	const requestBodyStrings: string[] = [];

	for (const [key, value] of formData.entries()) {
		requestBodyStrings.push(
			`${encodeURIComponent(key)}=${encodeURIComponent(
				value.toString(),
			)}`,
		);
	}

	return fetch(endpoint, {
		method: 'POST',
		body: requestBodyStrings.join('&'),
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/x-www-form-urlencoded',
		},
	});
};

type EventDescription =
	| 'click-button'
	| 'form-submission'
	| 'submission-confirmed'
	| 'submission-failed'
	| 'open-captcha'
	| 'captcha-load-error'
	| 'form-submit-error'
	| 'captcha-not-passed'
	| 'captcha-passed';

const sendTracking = (
	newsletterId: string,
	eventDescription: EventDescription,
): void => {
	const ophanRecord = getOphanRecordFunction();

	let action: OphanAction = 'CLICK';

	switch (eventDescription) {
		case 'form-submission':
		case 'captcha-not-passed':
		case 'captcha-passed':
			action = 'ANSWER';
			break;
		case 'submission-confirmed':
			action = 'SUBSCRIBE';
			break;
		case 'captcha-load-error':
		case 'form-submit-error':
		case 'submission-failed':
			action = 'CLOSE';
			break;
		case 'open-captcha':
			action = 'EXPAND';
			break;
		case 'click-button':
		default:
			action = 'CLICK';
			break;
	}

	// The data team use a custom date format for timestamps,
	// (yyy-MM-dd hh:mm:ss.ssssss UTC)
	// and will cast the integer value  to this
	// format at their end
	const value = JSON.stringify({
		eventDescription,
		newsletterId,
		timestamp: Date.now(),
	});

	submitComponentEvent(
		{
			action,
			value,
			component: {
				componentType: 'NEWSLETTER_SUBSCRIPTION',
				id: `DCR SecureSignupIframe ${newsletterId}`,
			},
		},
		ophanRecord,
	);
};

/**
 * A descendent of `EmailSignup` used to prevent users from entering their email
 * on the same page as the one we run third-party scripts on.
 *
 * ## Why does this need to be an Island?
 *
 * We can only inject ReCAPTCHA client-side, and need to respond to user input.
 *
 * ---
 *
 * [`EmailSignup` on Chromatic](https://www.chromatic.com/component?appId=63e251470cfbe61776b0ef19&csfId=components-emailsignup)
 */
export const SecureSignupIframe = ({
	name,
	styles,
	html,
	newsletterId,
	successDescription,
}: Props) => {
	const iframeRef = useRef<HTMLIFrameElement>(null);
	const recaptchaRef = useRef<ReactGoogleRecaptcha>(null);

	const [iframeHeight, setIFrameHeight] = useState<number>(0);
	const [isWaitingForResponse, setIsWaitingForResponse] =
		useState<boolean>(false);
	const [responseOk, setResponseOk] = useState<boolean | undefined>(
		undefined,
	);
	const [errorMessage, setErrorMessage] = useState<string | undefined>(
		undefined,
	);

	const hasResponse = typeof responseOk === 'boolean';

	const submitForm = async (token: string): Promise<void> => {
		const { current: iframe } = iframeRef;
		const input: HTMLInputElement | null =
			iframe?.contentDocument?.querySelector('input[type="email"]') ??
			null;
		const emailAddress: string = input?.value ?? '';

		sendTracking(newsletterId, 'form-submission');
		const response = await postFormData(
			window.guardian.config.page.ajaxUrl + '/email',
			buildFormData(emailAddress, newsletterId, token),
		);

		// The response body could be accessed with await response.text()
		// here and added to state but the response is not informative
		// enough to convey the actualreason for a failure to the user,
		// so a generic failure message is used.
		setIsWaitingForResponse(false);
		setResponseOk(response.ok);

		sendTracking(
			newsletterId,
			response.ok ? 'submission-confirmed' : 'submission-failed',
		);
	};

	const resetForm: ReactEventHandler<HTMLButtonElement> = () => {
		setErrorMessage(undefined);
		setResponseOk(undefined);
		recaptchaRef.current?.reset();
	};

	const handleCaptchaLoadError: ReactEventHandler<HTMLDivElement> = () => {
		sendTracking(newsletterId, 'captcha-load-error');
		setErrorMessage(`Sorry, the reCAPTCHA failed to load.`);
		recaptchaRef.current?.reset();
	};

	const handleCaptchaComplete = (token: string | null) => {
		if (!token) {
			sendTracking(newsletterId, 'captcha-not-passed');
			return;
		}
		sendTracking(newsletterId, 'captcha-passed');
		setIsWaitingForResponse(true);
		submitForm(token).catch((error) => {
			// eslint-disable-next-line no-console -- unexpected error
			console.error(error);
			sendTracking(newsletterId, 'form-submit-error');
			setErrorMessage(`Sorry, there was an error signing you up.`);
			setIsWaitingForResponse(false);
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
		setIFrameHeight(Math.max(0, requestedHeight, scrollHeight));
	};

	const resetIframeHeight = (): void => {
		resizeIframe();
	};

	const handleClickInIFrame = (): void => {
		sendTracking(newsletterId, 'click-button');
	};

	const handleSubmitInIFrame = (event: Event): void => {
		event.preventDefault();
		if (isWaitingForResponse) {
			return;
		}
		setErrorMessage(undefined);
		sendTracking(newsletterId, 'open-captcha');
		recaptchaRef.current?.execute();
	};

	const attachListenersToIframe = () => {
		const { current: iframe } = iframeRef;
		iframe?.contentWindow?.addEventListener('resize', resetIframeHeight);
		const form = iframe?.contentDocument?.querySelector('form');
		const button = iframe?.contentDocument?.querySelector('button');
		button?.addEventListener('click', handleClickInIFrame);
		form?.addEventListener('submit', handleSubmitInIFrame);
		resetIframeHeight();
	};

	const addFontsToIframe = (requiredFontNames: string[]) => {
		const { current: iframe } = iframeRef;

		// FontFace.add is not supported (IE), allow fallback to system fonts
		const iframeFontFaceSet = iframe?.contentDocument?.fonts as
			| undefined
			| FontFaceSetWithAdd;
		if (!iframeFontFaceSet?.add) {
			return;
		}

		// get all the fontFaces on the parent matching the list of font names
		const requiredFonts: FontFace[] = [];
		for (const fontFace of document.fonts) {
			if (requiredFontNames.includes(fontFace.family)) {
				requiredFonts.push(fontFace);
			}
		}

		// add the fonts to the iframe
		for (const font of requiredFonts) {
			try {
				iframeFontFaceSet.add(font);
			} catch (error) {
				// Safari throws an InvalidModificationError
				// https://developer.mozilla.org/en-US/docs/Web/API/FontFaceSet/add#exceptions
			}
		}
	};

	const onIFrameLoad = (): void => {
		attachListenersToIframe();
		addFontsToIframe(['GuardianTextSans']);
	};

	const captchaSiteKey = isServer
		? undefined
		: window.guardian.config.page.googleRecaptchaSiteKey;

	return (
		<>
			<iframe
				title={`Sign up to ${name}`}
				ref={iframeRef}
				css={css`
					width: 100%;
					min-height: 65px;
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
					<body style="margin: 0; overflow:hidden;">${html}</body>
				</html>`}
				onLoad={onIFrameLoad}
			/>

			{isWaitingForResponse && (
				<div>
					<SvgSpinner isAnnouncedByScreenReader={true} size="small" />
				</div>
			)}

			{!!errorMessage && <ErrorMessageWithAdvice text={errorMessage} />}

			{hasResponse &&
				(responseOk ? (
					<div>
						<SuccessMessage text={successDescription} />
					</div>
				) : (
					<div
						css={css`
							display: flex;
							align-items: flex-start;
							${until.tablet} {
								flex-wrap: wrap;
							}
							button {
								margin-left: ${space[1]}px;
								background-color: ${neutral[0]};
								:hover {
									background-color: ${neutral[20]};
								}
							}
						`}
					>
						<ErrorMessageWithAdvice text={`Sign up failed.`} />
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

			{!!captchaSiteKey && (
				<div
					css={css`
						.grecaptcha-badge {
							visibility: hidden;
						}
					`}
				>
					<ReactGoogleRecaptcha
						sitekey={captchaSiteKey}
						ref={recaptchaRef}
						onChange={handleCaptchaComplete}
						onError={handleCaptchaLoadError}
						size="invisible"
						// Note - the component supports an onExpired callback
						// (for when the user completed a challenge, but did
						// not submit the form before the token expired.
						// We don't need that here as completing the captcha
						// (onChange callback) triggers the submission
					/>
				</div>
			)}
		</>
	);
};
