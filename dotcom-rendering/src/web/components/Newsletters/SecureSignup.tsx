import createCache from '@emotion/cache';
import { CacheProvider, css } from '@emotion/react';
import createEmotionServer from '@emotion/server/create-instance';
import { neutral, space } from '@guardian/source-foundations';
import { Button, Label, TextInput } from '@guardian/source-react-components';
import { renderToString } from 'react-dom/server';
import { Island } from '../Island';
import { NewsletterPrivacyMessage } from './NewsletterPrivacyMessage';
import { SecureSignupIframe } from './SecureSignupIframe.importable';

type Props = { newsletterId: string; successDescription: string };

// The Google documentation specifies that if the 'recaptcha-badge' is hidden,
// their T+C's must be displayed instead. <SecureSignupIframe> hides the
// badge, so <NewsletterPrivacyMessage> must be displayed with it.
// https://developers.google.com/recaptcha/docs/faq#id-like-to-hide-the-recaptcha-badge.-what-is-allowed

/**
 * This function renders the content to be used within the iframe,
 * and converts it to strings of HTML and CSS that can be passed
 * as props to a component within an Island. The steps are:
 *
 * 1. Creates an EmotionServer to handle Emotion operations at
 * run time.
 * 2. Server-side renders the content producing a string
 *  of 'raw' html with inline styling.
 * 3. Uses the EmotionServer to extract the inline styling from
 * the 'raw' html, (replacing it with class attribute) and generate a
 * stringified stylesheet to duplicate the inline styles.
 * 4. Returns the processed html and stylesheet as strings
 *
 * see https://github.com/guardian/dotcom-rendering/pull/5238
 */
const generateForm = (
	newsletterId: string,
): { html: string; styles: string } => {
	const cache = createCache({ key: 'email-signup-iframe' });

	// eslint-disable-next-line @typescript-eslint/unbound-method -- not a react method, 'this' binding not required?
	const { extractCriticalToChunks, constructStyleTagsFromChunks } =
		createEmotionServer(cache);

	const html = renderToString(
		<CacheProvider value={cache}>
			<form id={`secure-signup-${newsletterId}`}>
				<Label text="Enter your email address" />

				<div
					css={css`
						display: flex;
						flex-direction: row;
						align-items: flex-end;
						flex-wrap: wrap;
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
					>
						Sign up
					</Button>
				</div>
			</form>
		</CacheProvider>,
	);
	const chunks = extractCriticalToChunks(html);
	const styles = constructStyleTagsFromChunks(chunks);

	return { html, styles };
};

export const SecureSignup = ({ newsletterId, successDescription }: Props) => {
	const { html, styles } = generateForm(newsletterId);

	return (
		<>
			<Island
				clientOnly={true}
				deferUntil={'idle'}
				placeholderHeight={75}
			>
				<SecureSignupIframe
					html={html}
					styles={styles}
					newsletterId={newsletterId}
					successDescription={successDescription}
				/>
			</Island>
			<div
				css={css`
					margin-top: ${space[2]}px;
				`}
			>
				<NewsletterPrivacyMessage />
			</div>
		</>
	);
};
