import type { Inline1Props } from '@guardian/support-dotcom-components/dist/shared/types';
import { EmailSignUpWrapper } from '../../EmailSignUpWrapper.island';
import type { ReactComponent } from '../lib/ReactComponent';

export const Newsletter: ReactComponent<Inline1Props> = ({ variant }) => {
	if (variant.message.type !== 'Inline1NewsletterMessage') {
		return;
	}
	const emailSignUpProps = {
		index: 0, // TBD how to get, used for the skip link
		listId: 6031, // We need the newsletter numerical ID from the API
		identityName: variant.message.heading,
		idApiUrl: window.guardian.config.page.idApiUrl ?? '',
		name: variant.message.heading,
		description: variant.message.body,
		illustrationSquare: variant.message.imageUrl,
		frequency: variant.message.frequency,
		theme: '',
	};

	return <EmailSignUpWrapper {...emailSignUpProps} />;
};
