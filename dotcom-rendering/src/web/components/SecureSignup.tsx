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
				<input
					type="hidden"
					name="ref"
					value={`${
						typeof window === 'undefined'
							? ''
							: window.location.origin + window.location.pathname
					}`}
				/>
				<input
					type="hidden"
					name="refViewId"
					value={
						typeof window === 'undefined'
							? ''
							: window.guardian.ophan?.viewId
					}
				/>
			</form>
		</CacheProvider>,
	);
	const chunks = extractCriticalToChunks(html);
	const styles = constructStyleTagsFromChunks(chunks);

	return { html, styles };
};

const generateJs = (newsletterId: string): string => {
	return `
		console.log('This is the Iframe for ${newsletterId}');
	`;
};

export const SecureSignup = ({ newsletterId }: Props) => {
	const { html, styles } = generateForm(newsletterId);
	const js = generateJs(newsletterId);

	return (
		<>
			<Island>
				<SecureSignupIframe html={html} styles={styles} js={js} />
			</Island>
			<PrivacyTerms />
			<RecaptchaTerms />
		</>
	);
};
