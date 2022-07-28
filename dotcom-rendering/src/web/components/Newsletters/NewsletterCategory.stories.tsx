import { NewsletterCategory } from './NewsletterCategory';

export default {
	component: NewsletterCategory,
	title: 'Components/Newsletters/NewsletterCategory',
};

export const Default = () => {
	return <NewsletterCategory text="UK Focused" />;
};

Default.story = { name: 'Default' };
