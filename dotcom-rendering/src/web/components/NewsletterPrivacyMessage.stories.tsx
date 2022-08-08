import { boolean, withKnobs } from '@storybook/addon-knobs';
import { NewsletterPrivacyMessage } from './NewsletterPrivacyMessage';

export default {
	component: NewsletterPrivacyMessage,
	title: 'Components/NewsletterPrivacyMessage',
	decorators: [withKnobs],
};

const legacy = (): boolean => boolean('legacy', true);

export const Default = () => {
	return <NewsletterPrivacyMessage legacy={legacy()} />;
};

Default.story = { name: 'Default' };
