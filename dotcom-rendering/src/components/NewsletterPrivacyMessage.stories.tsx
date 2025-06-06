import { NewsletterPrivacyMessage } from './NewsletterPrivacyMessage';

export default {
	component: NewsletterPrivacyMessage,
	title: 'Components/NewsletterPrivacyMessage',
};

export const Default = () => {
	return <NewsletterPrivacyMessage emailType="newsletter" />;
};

export const ForMarketting = () => {
	return <NewsletterPrivacyMessage emailType="marketingConsent" />;
};

Default.storyName = 'Default';
