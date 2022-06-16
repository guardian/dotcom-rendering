import createCache from '@emotion/cache';
import { CacheProvider, css } from '@emotion/react';
import createEmotionServer from '@emotion/server/create-instance';
import { neutral, space, text, textSans } from '@guardian/source-foundations';
import { Button, Link, TextInput } from '@guardian/source-react-components';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Island } from './Island';
import { SecureSignupIframe } from './SecureSignupIframe.importable';

type Props = { newsletterId: string };

const InputWrapper = ({ children }: { children: React.ReactNode }) => {
	return (
		<div
			css={css`
				margin-right: ${space[3]}px;
				flex-grow: 1;
			`}
		>
			{children}
		</div>
	);
};

const PrivacyTerms = () => {
	return (
		<div
			css={css`
				margin-top: ${space[2]}px;
				${textSans.xxsmall()}
				color: ${text.supporting};
				a {
					${textSans.xxsmall()}
					text-decoration: none;
					:hover {
						text-decoration: underline;
					}
				}
			`}
		>
			<span
				css={css`
					color: black;
					font-weight: bold;
				`}
			>
				Privacy Notice:{' '}
			</span>
			Newsletters may contain info about charities, online ads, and
			content funded by outside parties. For more information see our{' '}
			<Link
				href="https://www.theguardian.com/help/privacy-policy"
				rel="noopener noreferrer"
			>
				privacy policy
			</Link>
		</div>
	);
};

const RecaptchaTerms = () => (
	<div
		css={css`
			margin-top: ${space[1]}px;
			${textSans.xxsmall()}
			color: ${text.supporting};
			a {
				${textSans.xxsmall()}
				text-decoration: none;
				:hover {
					text-decoration: underline;
				}
			}
		`}
	>
		This site is protected by reCAPTCHA and the Google{' '}
		<Link
			href="https://policies.google.com/privacy"
			rel="noopener noreferrer"
		>
			privacy policy
		</Link>{' '}
		and{' '}
		<Link
			href="https://policies.google.com/terms"
			rel="noopener noreferrer"
		>
			terms of service
		</Link>{' '}
		apply
	</div>
);

const StackBelowDesktop = ({ children }: { children: React.ReactNode }) => (
	<div
		css={css`
			display: flex;
			flex-direction: column;
			@media (min-width: 600px) {
				flex-direction: row;
			}
		`}
	>
		{children}
	</div>
);

const generateForm = (
	newsletterId: string,
): { html: string; styles: string } => {
	const cache = createCache({ key: 'email-signup-iframe' });
	// eslint-disable-next-line @typescript-eslint/unbound-method
	const { extractCriticalToChunks, constructStyleTagsFromChunks } =
		createEmotionServer(cache);
	const html = renderToString(
		<CacheProvider value={cache}>
			<form
				id={`secure-signup-${newsletterId}`}
				action="/email"
				method="post"
				css={css`
					margin-top: ${space[2]}px;
					max-width: 500px;
					@media (min-width: 600px) {
						max-width: 80%;
					}
				`}
			>
				<StackBelowDesktop>
					<InputWrapper>
						<TextInput
							name="email"
							label="Enter your email address"
							type="email"
						/>
					</InputWrapper>
					<Button
						cssOverrides={css`
							background-color: ${neutral[0]};
							:hover {
								background-color: ${neutral[20]};
							}
							width: fit-content;
							margin-top: ${space[2]}px;
							@media (min-width: 600px) {
								margin-top: 0;
								align-self: flex-end;
							}
						`}
						type="submit"
						className="g-recaptcha"
						data-sitekey="your_site_key"
						data-callback="onSubmit"
					>
						Sign up
					</Button>
				</StackBelowDesktop>
				<input type="hidden" name="ref" />
				<input type="hidden" name="refViewId" />
				<div className="grecaptcha_container" />
			</form>
		</CacheProvider>,
	);
	const chunks = extractCriticalToChunks(html);
	const styles = constructStyleTagsFromChunks(chunks);

	return { html, styles };
};

type IframeWindow = Window & {
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

const iframeScript = () => {
	const iframeWindow = window as unknown as IframeWindow;

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
		const siteKey = window.parent.guardian.config.page
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
};

export const SecureSignup = ({ newsletterId }: Props) => {
	const { html, styles } = generateForm(newsletterId);

	return (
		<>
			<Island>
				<SecureSignupIframe
					html={html}
					styles={styles}
					iframeScriptString={iframeScript.toString()}
				/>
			</Island>
			<PrivacyTerms />
			<RecaptchaTerms />
		</>
	);
};
