import type {
	Inline1Props,
	Tracking,
} from '@guardian/support-dotcom-components/dist/shared/types';
import { useIsSignedIn } from '../../../lib/useAuthStatus';
import { useNewsletterSubscription } from '../../../lib/useNewsletterSubscription';
import { NewsletterSignupCard } from '../../NewsletterSignupCard';
import { NewsletterSignupForm } from '../../NewsletterSignupForm.island';
import type { ReactComponent } from '../lib/ReactComponent';
import { useInline1Tracking } from './utils/useInline1Tracking';

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
	submitComponentEvent,
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
				submitComponentEvent={submitComponentEvent}
			/>
		);
	}

	return;
};

const NewsletterForm: ReactComponent<{
	message: ValidNewsletterMessage;
	submitComponentEvent: Inline1Props['submitComponentEvent'];
	tracking: Tracking;
}> = ({ message, submitComponentEvent, tracking }) => {
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

	const { setNode, sendEvent } = useInline1Tracking({
		tracking,
		submitComponentEvent,
	});

	return (
		<div data-testid={message.type} ref={setNode}>
			<NewsletterSignupCard
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
					onSubmitButtonClick={() => sendEvent('CLICK', 'cta')}
				/>
			</NewsletterSignupCard>
		</div>
	);
};
