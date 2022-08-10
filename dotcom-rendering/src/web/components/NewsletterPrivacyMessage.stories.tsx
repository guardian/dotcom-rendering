import { withKnobs } from '@storybook/addon-knobs';
import { NewsletterPrivacyMessage } from './NewsletterPrivacyMessage';

export default {
	component: NewsletterPrivacyMessage,
	title: 'Components/NewsletterPrivacyMessage',
	decorators: [withKnobs],
};

export const Default = () => {
	return <NewsletterPrivacyMessage />;
};

Default.story = { name: 'Default' };
