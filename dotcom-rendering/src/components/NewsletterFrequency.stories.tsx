import { NewsletterFrequency } from './NewsletterFrequency.tsx';

export default {
	component: NewsletterFrequency,
	title: 'Components/NewsletterFrequency',
};

export const Default = () => {
	return <NewsletterFrequency frequency="Weekly" />;
};

Default.storyName = 'Default';
