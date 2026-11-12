import type {
	Inline1Props,
	Tracking,
} from '@guardian/support-dotcom-components/dist/shared/types';
import { useEffect } from 'react';
import { useIsSignedIn } from '../../../lib/useAuthStatus';
import { useIsInView } from '../../../lib/useIsInView';
import { NewsletterSignupCardContainer } from '../../NewsletterSignupCardContainer';
import { NewsletterSignupForm } from '../../NewsletterSignupForm.island';
import type { ReactComponent } from '../lib/ReactComponent';
import { recordInline1View } from './utils/viewCount';

type NewsletterMessage = Extract<
	Inline1Props['variant']['message'],
	{ type: 'Inline1NewsletterMessage' }
>;

export const Newsletter: ReactComponent<Inline1Props> = ({
	variant,
	tracking,
}) => {
	if (variant.message.type !== 'Inline1NewsletterMessage') {
		return;
	}

	return <NewsletterForm message={variant.message} tracking={tracking} />;
};

const NewsletterForm: ReactComponent<{
	message: NewsletterMessage;
	tracking: Tracking;
}> = ({ message, tracking }) => {
	const heading = message.heading;
	const description = message.body;
	const frequency = message.frequency;
	const illustrationSquare = message.imageUrl;
	const newsletterId = message.newsletterId;
	const componentId = ''; // TBD
	const isSignedIn = useIsSignedIn();

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
		</div>
	);
};
