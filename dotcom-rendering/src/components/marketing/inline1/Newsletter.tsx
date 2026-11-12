import type {
	Inline1Props,
	Tracking,
} from '@guardian/support-dotcom-components/dist/shared/types';
import { useEffect } from 'react';
import { useIsSignedIn } from '../../../lib/useAuthStatus';
import { useIsInView } from '../../../lib/useIsInView';
import { useNewsletterSubscription } from '../../../lib/useNewsletterSubscription';
import { NewsletterSignupCardContainer } from '../../NewsletterSignupCardContainer';
import { NewsletterSignupForm } from '../../NewsletterSignupForm.island';
import type { ReactComponent } from '../lib/ReactComponent';
import { recordInline1View } from './utils/viewCount';

type NewsletterMessage = Extract<
	Inline1Props['variant']['message'],
	{ type: 'Inline1NewsletterMessage' }
>;

type ValidNewsletterMessage = NewsletterMessage &
	Required<
		Pick<
			NewsletterMessage,
			'newsletterListId' | 'newsletterName' | 'frequency'
		>
	>;

const isValidNewsletterMessage = (message: NewsletterMessage) =>
	message.newsletterListId !== undefined &&
	message.newsletterName !== undefined &&
	message.frequency !== undefined;

export const Newsletter: ReactComponent<Inline1Props> = ({
	variant,
	tracking,
}) => {
	if (variant.message.type !== 'Inline1NewsletterMessage') {
		return;
	}
	if (isValidNewsletterMessage(variant.message)) {
		return (
			<NewsletterForm
				message={variant.message as ValidNewsletterMessage}
				tracking={tracking}
			/>
		);
	}

	return;
};

const NewsletterForm: ReactComponent<{
	message: ValidNewsletterMessage;
	tracking: Tracking;
}> = ({ message, tracking }) => {
	const newsletterName = message.newsletterName;
	const heading = message.heading;
	const description = message.body;
	const frequency = message.frequency;
	const illustrationSquare = message.imageUrl;
	const newsletterId = message.newsletterId;
	const componentId = ''; // TBD
	const isSignedIn = useIsSignedIn();
	const isSubscribed = useNewsletterSubscription(
		message.newsletterListId,
		window.guardian.config.page.idApiUrl,
	);

	const [hasBeenSeen, setNode] = useIsInView({
		debounce: true,
		threshold: 0,
	});
	useEffect(() => {
		if (hasBeenSeen === true) {
			recordInline1View(tracking.abTestName);
		}
	}, [hasBeenSeen, tracking.abTestName]);

	return (
		<div ref={setNode}>
			<NewsletterSignupCardContainer
				name={newsletterName}
				description={description}
				illustrationSquare={illustrationSquare}
				frequency={frequency}
				isSignedIn={isSignedIn}
				heading={heading}
			>
				<NewsletterSignupForm
					newsletterId={newsletterId}
					newsletterName={newsletterName}
					frequency={frequency}
					componentId={componentId}
					isAlreadySubscribed={isSubscribed}
				/>
			</NewsletterSignupCardContainer>
		</div>
	);
};
