import createCache from '@emotion/cache';
import { CacheProvider, css } from '@emotion/react';
import createEmotionServer from '@emotion/server/create-instance';
import { neutral, space, text, textSans } from '@guardian/source-foundations';
import {
	Button,
	Label,
	Link,
	TextInput,
} from '@guardian/source-react-components';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Island } from './Island';
import { SecureSignupIframe } from './SecureSignupIframe.importable';

type Props = { newsletterId: string };

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
				`}
			>
				<Label text="Enter your email address" />

				<div
					css={css`
						display: flex;
						flex-direction: row;
						align-items: flex-end;
					`}
				>
					<div
						css={css`
							margin-right: ${space[3]}px;
							flex-basis: 335px;
							flex-shrink: 1;
						`}
					>
						<TextInput
							hideLabel={true}
							name="email"
							label="Enter your email address"
							type="email"
						/>
					</div>
					<Button
						cssOverrides={css`
							justify-content: center;
							background-color: ${neutral[0]};
							:hover {
								background-color: ${neutral[20]};
							}
							flex-basis: 118px;
							flex-shrink: 0;
							margin-top: ${space[2]}px;
						`}
						type="submit"
						className="g-recaptcha"
						data-sitekey="your_site_key"
						data-callback="onSubmit"
					>
						Sign up
					</Button>
				</div>
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

export const SecureSignup = ({ newsletterId }: Props) => {
	const { html, styles } = generateForm(newsletterId);

	return (
		<>
			<Island>
				<SecureSignupIframe html={html} styles={styles} />
			</Island>
			<PrivacyTerms />
			<RecaptchaTerms />
		</>
	);
};
