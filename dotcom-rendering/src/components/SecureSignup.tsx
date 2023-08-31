import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import createEmotionServer from '@emotion/server/create-instance';
import { renderToString } from 'react-dom/server';
import { Island } from './Island';
import { NewsletterPrivacyMessage } from './NewsletterPrivacyMessage';
import { NewsletterSignupForm } from './NewsletterSignupForm';
import { SecureSignupIframe } from './SecureSignupIframe.importable';

type Props = {
	newsletterId: string;
	name: string;
	successDescription: string;
	/** Override this with caution: you _must_ ensure this wording exists nearby if not included in this component */
	hidePrivacyMessage?: boolean;
};

// The Google documentation specifies that if the 'recaptcha-badge' is hidden,
// their T+C's must be displayed instead. <SecureSignupIframe> hides the
// badge, so <NewsletterPrivacyMessage> must be displayed with it.
// https://developers.google.com/recaptcha/docs/faq#id-like-to-hide-the-recaptcha-badge.-what-is-allowed
// It is possible to override this but ONLY in the case where the privacy message will be shown elsewhere
// on the page ie. the single newsletter signup screens

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
			<NewsletterSignupForm newsletterId={newsletterId} />
		</CacheProvider>,
	);
	const chunks = extractCriticalToChunks(html);
	const styles = constructStyleTagsFromChunks(chunks);

	return { html, styles };
};

export const SecureSignup = ({
	newsletterId,
	successDescription,
	hidePrivacyMessage = false,
	name,
}: Props) => {
	const { html, styles } = generateForm(newsletterId);
	return (
		<>
			<Island
				clientOnly={true}
				deferUntil={'idle'}
				placeholderHeight={65}
			>
				<SecureSignupIframe
					name={name}
					html={html}
					styles={styles}
					newsletterId={newsletterId}
					successDescription={successDescription}
				/>
			</Island>
			{!hidePrivacyMessage && <NewsletterPrivacyMessage />}
		</>
	);
};
