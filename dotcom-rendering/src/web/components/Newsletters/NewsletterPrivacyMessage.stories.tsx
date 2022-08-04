import { withKnobs } from '@storybook/addon-knobs';
import { NewsletterPrivacyMessage } from './NewsletterPrivacyMessage';

export default {
	component: NewsletterPrivacyMessage,
	title: 'Components/Newsletters/NewsletterPrivacyMessage',
	decorators: [withKnobs],
};

export const Default = () => {
	return <NewsletterPrivacyMessage />;
};

Default.story = { name: 'Default' };
