import { NewsletterFrequency } from './NewsletterFrequency';

export default {
	component: NewsletterFrequency,
	title: 'Components/Newsletters/NewsletterFrequency',
};

export const Default = () => {
	return <NewsletterFrequency frequency="Weekly" />;
};

Default.story = { name: 'Default' };
