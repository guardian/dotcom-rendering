import type { Inline1Props } from '@guardian/support-dotcom-components/dist/shared/types';
import { useIsSignedIn } from '../../../lib/useAuthStatus';
import { NewsletterSignupCardContainer } from '../../NewsletterSignupCardContainer';
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
	const heading = message.heading;
	const description = message.body;
	const frequency = message.frequency;
	const illustrationSquare = message.imageUrl;
	const newsletterId = message.newsletterId;
	const componentId = ''; // TBD
	const isSignedIn = useIsSignedIn();

	return (
		<NewsletterSignupCardContainer
			name={''} // We should get this from SDC?
			description={description}
			illustrationSquare={illustrationSquare}
			frequency={frequency}
			isSignedIn={isSignedIn}
			heading={heading}
		>
			<NewsletterSignupForm
				newsletterId={newsletterId}
				newsletterName={''} // We need this for the success message, should get from SDC?
				frequency={frequency}
				componentId={componentId}
			/>
		</NewsletterSignupCardContainer>
	);
};
