import type { Inline1Props } from '@guardian/support-dotcom-components/dist/shared/types';
import { useIsSignedIn } from '../../../lib/useAuthStatus';
import { useNewsletterSubscription } from '../../../lib/useNewsletterSubscription';
import { NewsletterSignupCard } from '../../NewsletterSignupCard';
import { NewsletterSignupForm } from '../../NewsletterSignupForm.island';
import type { ReactComponent } from '../lib/ReactComponent';

type NewsletterMessage = Extract<
	Inline1Props['variant']['message'],
	{ type: 'Inline1NewsletterMessage' }
>;

export const Newsletter: ReactComponent<Inline1Props> = ({ variant }) => {
	if (variant.message.type !== 'Inline1NewsletterMessage') {
		return;
	}

	return <NewsletterForm message={variant.message} />;
};

const NewsletterForm: ReactComponent<{ message: NewsletterMessage }> = ({
	message,
}) => {
	const newsletterId = message.newsletterId;
	const frequency = message.frequency;
	const newsletterName = message.heading; // SDC and SAC model to be changed to newsletter name
	const body = message.body;
	const imageUrl = message.imageUrl;
	const componentId = ``; // TBD
	const isSignedIn = useIsSignedIn();
	const isSubscribed = useNewsletterSubscription(
		Number(newsletterId),
		window.guardian.config.page.idApiUrl,
	);

	return (
		<NewsletterSignupCard
			name={newsletterName}
			frequency={frequency}
			description={body}
			illustrationSquare={imageUrl}
			isSignedIn={isSignedIn}
		>
			<NewsletterSignupForm
				newsletterId={newsletterId}
				newsletterName={newsletterName}
				frequency={frequency}
				isAlreadySubscribed={isSubscribed}
				componentId={componentId}
			/>
		</NewsletterSignupCard>
	);
};
