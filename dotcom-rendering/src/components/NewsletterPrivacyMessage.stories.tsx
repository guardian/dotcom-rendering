import { NewsletterPrivacyMessage } from './NewsletterPrivacyMessage';

export default {
	component: NewsletterPrivacyMessage,
	title: 'Components/NewsletterPrivacyMessage',
};

export const Default = () => {
	return <NewsletterPrivacyMessage />;
};

Default.storyName = 'Default';

export const SignedIn = () => {
	return <NewsletterPrivacyMessage isSignedIn={true} />;
};

SignedIn.storyName = 'Signed in';
